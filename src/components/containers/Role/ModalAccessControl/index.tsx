/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { useEffect, useState } from "react";

import systemService, {
  type IMenuItemPermission,
  type IMenuItem,
  type IRole
} from "@services/system.service";
import { Checkbox, Col, Row, Spin } from "antd";
import DirectoryTree, {
  type DirectoryTreeProps
} from "antd/es/tree/DirectoryTree";
import { ArrowDown2 } from "iconsax-react";
import _ from "lodash";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";

import ModalAccessControlCommon from "../ModalAccessControlCommon";
interface IModalAccessControlProps {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  role: IRole;
  isUpdate: boolean;
}

const permissionList = {
  view: {
    id: 1,
    deleted: 0,
    props: null,
    name: "Xem",
    code: "VIEW"
  },
  create: {
    id: 2,
    deleted: 0,
    props: null,
    name: "Tạo mới",
    code: "CREATE"
  },
  update: {
    id: 3,
    deleted: 0,
    props: null,
    name: "Chỉnh sửa",
    code: "UPDATE"
  },
  delete: {
    id: 4,
    deleted: 0,
    props: null,
    name: "Xóa",
    code: "DELETE"
  },
  approve: {
    id: 5,
    deleted: 0,
    props: null,
    name: "Phê duyệt",
    code: "APPROVE"
  }
};

export type permissionType =
  | "VIEW"
  | "CREATE"
  | "UPDATE"
  | "DELETE"
  | "APPROVE";

const permissionListMap = new Map<permissionType, IMenuItemPermission>([
  ["VIEW", permissionList.view],
  ["CREATE", permissionList.create],
  ["UPDATE", permissionList.update],
  ["DELETE", permissionList.delete],
  ["APPROVE", permissionList.approve]
]);

interface IOption {
  label: string;
  value: string;
}

function ModalAccessControl(props: IModalAccessControlProps) {
  const { isOpen, setIsOpen, role, isUpdate } = props;
  const CheckboxGroup = Checkbox.Group;
  const { t } = useTranslation();
  const permissionTitleMap = new Map<string, string>([
    ["VIEW", "accessControl:view"],
    ["CREATE", "accessControl:create"],
    ["UPDATE", "accessControl:update"],
    ["DELETE", "accessControl:delete"],
    ["APPROVE", "accessControl:approve"]
  ]);

  const [treeData, setTreeData] = useState<any>([]);
  const [menuInfo, setMenuInfo] = useState<IMenuItem[]>([]);
  const [menuInfoByRole, setMenuInfoByRole] = useState<IMenuItem[] | null>();
  const [checkedList, setCheckedList] = useState<string[]>([]);
  const [menuItemSelected, setMenuItemSelected] = useState<IMenuItem>();
  const [options, setOptions] = useState<IOption[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isFirstTime, setIsFirstTime] = useState<boolean>(true)

  const getChildrenLevel1 = (title: string) => {
    return (
      <div className="w-[370px] border border-1 px-3 py-2 flex justify-between">
        <span className="!text-[#000000e0]">{title}</span>
        <span>
          <ArrowDown2 color="#000000e0" size={20} />
        </span>
      </div>
    );
  };

  const getLineCusClassName = (pos: string) => {
    const treeDataLength = treeData.length;
    if (pos === "0-0") return "line-custom-first";
    if (pos === `0-${treeDataLength - 1}`) return "line-custom-last";
    return "line-custom";
  };

  const getTreeData: any = (menuInfo: IMenuItem[]) => {
    return menuInfo.map((item, idx) => {
      if (item.children.length <= 0) {
        return {
          title: <span className="!text-[#000000e0]">{item.name}</span>,
          children: [],
          id: item.id
        };
      } else {
        return {
          title: getChildrenLevel1(item.name),
          children: getTreeData(item.children),
          id: item.id
        };
      }
    });
  };

  const findElm = (data: IMenuItem, id: number) => {
    if (data.id === id) {
      return data;
    }
    if (data.children && data.children.length > 0) {
      for (const child of data.children) {
        const foundElement: any = findElm(child, id);
        if (foundElement) {
          return foundElement;
        }
      }
    }
    return null;
  };

  const findMenuById = (id: null | number, menuInfo: IMenuItem[]) => {
    if (id) {
      for (let idx = 0; idx < menuInfo.length; idx++) {
        const element = menuInfo[idx];
        const result = findElm(element, id);
        if (result) {
          return result;
        }
      }
    }
  };

  const onSelect: DirectoryTreeProps["onSelect"] = (keys, info) => {
    const key = keys[0].toString();
    if (key.length <= 3) return;
    const node: any = info.node
    const menuItemSelected: IMenuItem = findMenuById(node?.id, menuInfo);
    if (menuItemSelected) {
      setMenuItemSelected(menuItemSelected);
      setIsFirstTime(false)
    }
  };

  const updatePermission = (menu: IMenuItem[], id: number, permissions: any) => {
    const elmNeedUpdate: IMenuItem = findMenuById(id, menu);
    if (elmNeedUpdate) {
      elmNeedUpdate.permissions = permissions;
    }
  };

  const onCheckboxChange = (list: string[]) => {
    setCheckedList(list);
    const id = menuItemSelected?.id;
    if (menuInfoByRole && id) {
      const menuClone = _.cloneDeep(menuInfoByRole);
      const permissionUpdate = list.map((item) =>
        permissionListMap.get(item as permissionType)
      );
      updatePermission(menuClone, id, permissionUpdate);
      setMenuInfoByRole(menuClone);
    }
  };

  const handleConfirm = async () => {
    if (menuInfoByRole) {
      const updateRes = await systemService.updatePermissionMenu({
        role,
        menu: menuInfoByRole
      });
      if (updateRes.status === "success" && updateRes.data.code === 0) {
        toast.success(t("accessControl:toastSuccess"));
        // setIsOpen(false);
        return;
      }
      toast.success(t("accessControl:toastFailed"));
    }
  };

  const fetchAllMenu = async () => {
    setIsLoading(true)
    const res = await systemService.getAllMenu();
    if (res.status === "success" && res.data.code === 0) {
      const menuInfo = res.data.value;
      setMenuInfo(menuInfo);
      const treeData = getTreeData(menuInfo);
      setTreeData(treeData);
    }
  };

  const fetchMenuByRole = async () => {
    const res = await systemService.getMenuByRole(role.authority);
    if (res.status === "success" && res.data.code === 0) {
      setMenuInfoByRole(res.data.value);
    }
  };

  useEffect(() => {
    fetchAllMenu();
  }, []);

  useEffect(() => {
    if (role?.authority) {
      fetchMenuByRole();
    }
  }, [role]);

  useEffect(() => {
    if (menuInfo.length > 0 && menuInfoByRole && isFirstTime) {
      const firstChildLevel1 = menuInfo[0];
      if (firstChildLevel1.children.length > 0) {
        setMenuItemSelected(firstChildLevel1.children[0]);
        setIsLoading(false)
      }
    }
  }, [menuInfoByRole, menuInfo]);

  useEffect(() => {
    const options = menuItemSelected?.permissions.map((item) => ({
      label: t(permissionTitleMap.get(item.code)),
      value: item.code
    }));
    if (options) {
      setOptions(options);
    }
    if (menuItemSelected?.id && menuInfoByRole) {
      const menuItemSelectedWithRole: IMenuItem = findMenuById(
        menuItemSelected.id,
        menuInfoByRole
      );
      if (menuItemSelectedWithRole) {
        const permissionByRole = menuItemSelectedWithRole.permissions.map(
          (item) => item.code
        );
        setCheckedList(permissionByRole);
      }
    }
  }, [menuItemSelected]);

  return (
    <ModalAccessControlCommon
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      width={1200}
      title={t("accessControl:title")}
      handleConfirm={handleConfirm}
      isUpdate={isUpdate}
    >
      {isLoading ? (
        <div className="flex justify-center items-center py-9">
          <Spin size="large" tip="Loading" />
        </div>
      ) : (
        <Row className="border-b mb-4">
          <Col
            span={15}
            className="border-r pt-4 max-h-[500px] h-[500px] overflow-x-auto"
          >
            <DirectoryTree
              className="text-base !text-[#000000e0] px-4 pb-11"
              showLine
              switcherIcon={(props) => {
                return (
                  <div className="h-1/2 mt-5">
                    <div
                      className={`w-4 border border-1 me-[-15px] ${getLineCusClassName(
                        props.pos as string
                      )}`}
                    ></div>
                  </div>
                );
              }}
              defaultExpandedKeys={["0-0-0"]}
              onSelect={onSelect}
              treeData={treeData}
              blockNode
              showIcon={false}
            />
          </Col>
          <Col span={9} className="pt-4">
            <div className="px-3 text-gray-015 text-base">
              {menuItemSelected?.name}
            </div>
            <CheckboxGroup
              className="flex flex-col !text-gray-012 p-4"
              options={options}
              value={checkedList}
                onChange={onCheckboxChange}
                disabled={!isUpdate}
            />
          </Col>
        </Row>

      )}
    </ModalAccessControlCommon>
  );
}

export default ModalAccessControl;
