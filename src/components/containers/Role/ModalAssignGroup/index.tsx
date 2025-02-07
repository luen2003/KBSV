import { useEffect, useState } from "react";

import { useDebounce } from "@hooks/useDebounce";
import systemService, {
  type IUserInfo,
  type IRole,
  type IListUserByRoleRes
} from "@services/system.service";
import { Checkbox, Col, Input, List, Row } from "antd";
import { type CheckboxChangeEvent } from "antd/es/checkbox";
import { ArrowLeft2, ArrowRight2, SearchNormal1 } from "iconsax-react";
import { useTranslation } from "react-i18next";

import ModalAccessControlCommon from "../ModalAccessControlCommon";
import toast from "react-hot-toast";

interface IModalAssignGroup {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  role: IRole;
  isUpdate: boolean;
}

function ModalAssignGroup(props: IModalAssignGroup) {
  const { t } = useTranslation();
  const { isOpen, setIsOpen, role, isUpdate } = props;
  const [filterUserInList, setFilterUserInList] = useState<string>("");
  const [filterUserOutList, setFilterUserOutList] = useState<string>("");
  const [dataInit, setDataInit] = useState<IListUserByRoleRes["value"]>();
  const [userInList, setUserInList] = useState<IUserInfo[]>([]);
  const [userOutList, setUserOutList] = useState<IUserInfo[]>([]);
  const [userInListChecked, setUserInListChecked] = useState<number[]>([]);
  const [userOutListChecked, setUserOutListChecked] = useState<number[]>([]);
  const filterUserInListDebounce = useDebounce(filterUserInList, 500);
  const filterUserOutListDebounce = useDebounce(filterUserOutList, 500);

  const fetchListUser = async () => {
    const res = await systemService.getListUserByRole(role.id);
    if (res.status === "success" && res.data.code === 0) {
      setUserInList(res.data.value.inList);
      setUserOutList(res.data.value.outList);
      setDataInit(res.data.value);
    }
  };

  const moveData = (currentList: IUserInfo[], listChecked: number[]) => {
    const listUserChecked: IUserInfo[] = [];
    const listUserRemain: IUserInfo[] = [];
    currentList.forEach((item) => {
      const findEml = listChecked.find((i) => i === item.id);
      if (findEml) {
        listUserChecked.push(item);
      } else {
        listUserRemain.push(item);
      }
    });
    return {
      listUserChecked,
      listUserRemain
    };
  };

  const moveDataRightToLeft = () => {
    const { listUserChecked, listUserRemain } = moveData(
      userInList,
      userInListChecked
    );
    setUserInList(listUserRemain);
    setUserOutList([...userOutList, ...listUserChecked]);
    setUserInListChecked([]);
    setUserOutListChecked([]);
  };

  const moveDataLeftToRight = () => {
    const { listUserChecked, listUserRemain } = moveData(
      userOutList,
      userOutListChecked
    );
    setUserOutList(listUserRemain);
    setUserInList([...userInList, ...listUserChecked]);
    setUserInListChecked([]);
    setUserOutListChecked([]);
  };

  const handleFilterUser = (list: IUserInfo[], textFilter: string) => {
    const listTmp: IUserInfo[] = [];
    list.forEach((item) => {
      const nameSearch = item.id + " - " + item?.username.toLowerCase() + " - " + item?.fullName.toLowerCase();
      if (nameSearch.includes(textFilter.toLowerCase())) listTmp.push(item);
    });
    return listTmp;
  };

  const handleCheckedAllOutList = (e: CheckboxChangeEvent) => {
    if (e.target.checked) {
      const listChecked = userOutList.map((i) => i.id);
      console.log(listChecked, userOutListChecked);

      setUserOutListChecked(listChecked);
      return;
    }
    setUserOutListChecked([]);
  };

  const handleCheckedAllInList = (e: CheckboxChangeEvent) => {
    if (e.target.checked) {
      const listChecked = userInList.map((i) => i.id);
      setUserInListChecked(listChecked);
      return;
    }
    setUserInListChecked([]);
  };

  const handleConfirm = async () => {
    const res = await systemService.updateUserbyRole({
      role: role,
      user: userInList
    })
    if (res.status === "success" && res.data.code === 0) {
      toast.success(t("accessControl:toastAssignGroupSuccess"))
      setIsOpen(false)
      return
    }
    toast.error(t("accessControl:toastAssignGroupFailed"))
  }

  useEffect(() => {
    if (!filterUserInListDebounce && dataInit) {
      setUserInList(dataInit.inList);
    } else {
      const filterUserInList = handleFilterUser(
        userInList,
        filterUserInListDebounce
      );
      setUserInList(filterUserInList);
    }
  }, [filterUserInListDebounce]);

  useEffect(() => {
    if (!filterUserOutListDebounce && dataInit) {
      setUserOutList(dataInit.outList);
    } else {
      const filterUserOutList = handleFilterUser(
        userOutList,
        filterUserOutListDebounce
      );
      setUserOutList(filterUserOutList);
    }
  }, [filterUserOutListDebounce]);

  useEffect(() => {
    if (role?.id) {
      fetchListUser();
    }
  }, [role]);

  return (
    <ModalAccessControlCommon
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      width={1200}
      title={t("accessControl:assignAccessControlGroup")}
      handleConfirm={handleConfirm}
      isUpdate={isUpdate}
    >
      <Row className="p-4">
        <Col span={11} className="border">
          <div className="font-bold px-4 py-2 border border-b border-x-0 text-gray-012 bg-gray-018">
            {t("accessControl:listUser")}
          </div>
          <Input
            placeholder="Tìm kiếm NSD"
            value={filterUserOutList}
            onChange={(e) => setFilterUserOutList(e.target.value)}
            className="border-0 py-2 border-b rounded-none"
            prefix={<SearchNormal1 className="text-gray-016 me-1" size={16} />}
            disabled={!isUpdate}
          />
          <Checkbox.Group
            value={userOutListChecked}
            className="w-full h-[344px] max-h-[344px] overflow-y-auto"
            disabled={!isUpdate}
          >
            <List
              className="w-full"
              itemLayout="horizontal"
              dataSource={userOutList}
              renderItem={(item) => (
                <List.Item className="!px-4 !py-2">
                  <List.Item.Meta
                    avatar={
                      <Checkbox
                        onChange={(e) => {
                          if (e.target.checked) {
                            setUserOutListChecked((prev) => [
                              ...prev,
                              e.target.value
                            ])
                          } else {
                            const tmpList = [...userOutListChecked].filter(i => i !== e.target.value)
                            setUserOutListChecked(tmpList)
                          }
                        }
                        }
                        value={item.id}
                      />
                    }
                    title={<span>{item.id + " - " + item.username + " - " + item.fullName}</span>}
                  />
                </List.Item>
              )}
            />
          </Checkbox.Group>
          <Checkbox
            className="p-4 py-2 border-t w-full"
            onChange={handleCheckedAllOutList}
            checked={!!userOutList.length && userOutListChecked.length === userOutList.length}
            disabled={!isUpdate}
          >
            {t("accessControl:selectedAll")}
          </Checkbox>
        </Col>
        <Col span={2} className="flex flex-col justify-center items-center">
          <div onClick={moveDataLeftToRight}>
            <ArrowRight2 className="text-gray-017 cursor-pointer" size={30} />
          </div>
          <div className="mt-4" onClick={moveDataRightToLeft}>
            <ArrowLeft2 className="text-gray-017 cursor-pointer" size={30} />
          </div>
        </Col>
        <Col span={11} className="border">
          <div className="font-bold px-4 py-2 border border-b border-x-0 text-gray-012 bg-gray-018">
            {t("accessControl:listUserInGroup")}
          </div>
          <Input
            placeholder="Tìm kiếm NSD"
            value={filterUserInList}
            onChange={(e) => setFilterUserInList(e.target.value)}
            className="border-0 py-2 border-b rounded-none"
            prefix={<SearchNormal1 className="text-gray-016 me-1" size={16} />}
            disabled={!isUpdate}
          />
          <Checkbox.Group
            value={userInListChecked}
            className="w-full h-[344px] max-h-[344px] overflow-y-auto"
            disabled={!isUpdate}
          >
            <List
              className="w-full"
              itemLayout="horizontal"
              dataSource={userInList}
              renderItem={(item) => (
                <List.Item className="!px-4 !py-2">
                  <List.Item.Meta
                    avatar={
                      <Checkbox
                        onChange={(e) => {
                          if (e.target.checked) {
                            setUserInListChecked((prev) => [
                              ...prev,
                              e.target.value
                            ])
                          } else {
                            const tmpList = [...userInListChecked].filter(i => i !== e.target.value)
                            setUserInListChecked(tmpList)
                          }
                        }
                        }
                        value={item.id}
                        checked={userInListChecked.some((i) => i === item.id)}
                      />
                    }
                    title={<span>{item.id + " - " + item.username + " - " + item.fullName}</span>}
                  />
                </List.Item>
              )}
            />
          </Checkbox.Group>
          <Checkbox
            className="p-4 py-2 border-t w-full"
            onChange={handleCheckedAllInList}
            checked={!!userInList.length && userInListChecked.length === userInList.length}
            disabled={!isUpdate}
          >
            {t("accessControl:selectedAll")}
          </Checkbox>
        </Col>
      </Row>
    </ModalAccessControlCommon>
  );
}

export default ModalAssignGroup;
