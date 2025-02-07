import { useEffect, useState } from "react";

import { useDebounce } from "@hooks/useDebounce";
import { Button, Checkbox, Col, Input, List, Modal, Row, Spin } from "antd";
import { type CheckboxChangeEvent } from "antd/es/checkbox";
import { ArrowLeft2, ArrowRight2, SearchNormal1 } from "iconsax-react";
import { useTranslation } from "react-i18next";
import toast from "react-hot-toast";
import { getRoleAndCheckPermissionByUser } from "@services/RoleService";
import { IRoleInfo, IUserInfo } from "@services/system.service";
import { assignRoleForUser } from "@services/user.service";

interface IModalAssignRole {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  user: IUserInfo;
  isUpdate: boolean;
}

export const ModalAssignRole = ({ isOpen, setIsOpen, user, isUpdate }: IModalAssignRole) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { t } = useTranslation();
  const [filterRoleInList, setFilterRoleInList] = useState<string>("");
  const [filterRoleOutList, setFilterRoleOutList] = useState<string>("");
  const [dataInit, setDataInit] = useState<IRoleInfo[]>();
  const [roleInList, setRoleInList] = useState<IRoleInfo[]>([]);
  const [roleOutList, setRoleOutList] = useState<IRoleInfo[]>([]);
  const [roleInListChecked, setRoleInListChecked] = useState<number[]>([]);
  const [roleOutListChecked, setRoleOutListChecked] = useState<number[]>([]);
  const filterRoleInListDebounce = useDebounce(filterRoleInList, 500);
  const filterRoleOutListDebounce = useDebounce(filterRoleOutList, 500);

  const fetchListRole = async () => {
    try {
      setIsLoading(true);
      const res = await getRoleAndCheckPermissionByUser(user?.id);
      if (res.code === 0 && res?.value) {
        let listRoles = res.value;
        setDataInit(listRoles);
        if (listRoles) {
          setRoleInList(listRoles.filter((item: any) => item.ownRole));
          setRoleOutList(listRoles.filter((item: any) => !item.ownRole));
        }
      }
    } catch (e) {

    } finally {
      setIsLoading(false);
    }
  };

  const moveData = (currentRole: IRoleInfo[], listChecked: number[]) => {
    const listRoleChecked: any[] = [];
    const listRoleRemain: any[] = [];
    currentRole.forEach((item) => {
      const findEml = listChecked.find((i) => i === item.id);
      if (findEml) {
        listRoleChecked.push(item);
      } else {
        listRoleRemain.push(item);
      }
    });
    return {
      listRoleChecked,
      listRoleRemain
    };
  };

  const moveDataRightToLeft = () => {
    const { listRoleChecked, listRoleRemain } = moveData(
      roleInList,
      roleInListChecked
    );
    setRoleInList(listRoleRemain);
    setRoleOutList([...roleOutList, ...listRoleChecked]);
    setRoleInListChecked([]);
    setRoleOutListChecked([]);
  };

  const moveDataLeftToRight = () => {
    const { listRoleChecked, listRoleRemain } = moveData(
      roleOutList,
      roleOutListChecked
    );
    setRoleOutList(listRoleRemain);
    setRoleInList([...roleInList, ...listRoleChecked]);
    setRoleInListChecked([]);
    setRoleOutListChecked([]);
  };

  const handleFilterRole = (list: any[], textFilter: string) => {
    const listTmp: any = [];
    list.forEach((item) => {
      const roleSearch = item.id + " - " + item.name.toLowerCase();
      if (roleSearch.includes(textFilter.toLowerCase())) listTmp.push(item);
    });
    return listTmp;
  };

  const handleCheckedAllOutList = (e: CheckboxChangeEvent) => {
    if (e.target.checked) {
      const listChecked = roleOutList.map((i) => i.id);
      console.log(listChecked, roleOutListChecked);

      setRoleOutListChecked(listChecked);
      return;
    }
    setRoleOutListChecked([]);
  };

  const handleCheckedAllInList = (e: CheckboxChangeEvent) => {
    if (e.target.checked) {
      const listChecked = roleInList.map((i) => i.id);
      setRoleInListChecked(listChecked);
      return;
    }
    setRoleInListChecked([]);
  };

  const handleConfirm = async () => {
    const res = await assignRoleForUser({
      userId: user.id,
      roleIds: roleInList.map((i) => i.id)
    })
    if (res.code === 0) {
      toast.success(t("formAssignRole:messageSuccess:assignRole"))
      setIsOpen(false)
      return
    }
    toast.error(t("formAssignRole:messageError:assignRole"))
  }

  useEffect(() => {
    if (!filterRoleInListDebounce && dataInit) {
      setRoleInList(dataInit);
    } else {
      const filterRoleInList = handleFilterRole(
        roleInList,
        filterRoleInListDebounce
      );
      setRoleInList(filterRoleInList);
    }
  }, [filterRoleInListDebounce]);

  useEffect(() => {
    if (!filterRoleOutListDebounce && dataInit) {
      setRoleOutList(dataInit);
    } else {
      const filterRoleOutList = handleFilterRole(
        roleOutList,
        filterRoleOutListDebounce
      );
      setRoleOutList(filterRoleOutList);
    }
  }, [filterRoleOutListDebounce]);

  useEffect(() => {
    if (user?.id) {
      fetchListRole();
    }
  }, [user]);

  if (isLoading) return <Spin />;

  return (
    <div>
      <Modal
        open={isOpen}
        width={1200}
        title={t("formAssignRole:title")}
        onCancel={() => {
          setIsOpen(false);
        }}
        footer={[]}
        styles={{
          header: {
            padding: "15px",
            borderBottom: "1px solid #EAECF0",
            margin: 0
          },
          content: {
            padding: 0,
          }
        }}
      >
        <Row className="p-4">
          <Col span={11} className="border">
            <div className="font-bold px-4 py-2 border border-b border-x-0 text-gray-012 bg-gray-018">
              {t("formAssignRole:group")}
            </div>
            <Input
              placeholder={t("formAssignRole:searchRole")}
              value={filterRoleOutList}
              onChange={(e) => setFilterRoleOutList(e.target.value)}
              className="border-0 py-2 border-b rounded-none"
              prefix={<SearchNormal1 className="text-gray-016 me-1" size={16} />}
              disabled={!isUpdate}
            />
            <Checkbox.Group
              value={roleOutListChecked}
              className="w-full h-[344px] max-h-[344px] overflow-y-auto"
              disabled={!isUpdate}
            >
              <List
                className="w-full"
                itemLayout="horizontal"
                dataSource={roleOutList}
                renderItem={(item) => (
                  <List.Item className="!px-4 !py-2">
                    <List.Item.Meta
                      avatar={
                        <Checkbox
                          onChange={(e) => {
                            if (e.target.checked) {
                              setRoleOutListChecked((prev) => [
                                ...prev,
                                e.target.value
                              ])
                            } else {
                              const tmpList = [...roleOutListChecked].filter(i => i !== e.target.value)
                              setRoleOutListChecked(tmpList)
                            }
                          }

                          }
                          value={item.id}
                        />
                      }
                      title={<span>{item.id + " - " + item.name}</span>}
                    />
                  </List.Item>
                )}
              />
            </Checkbox.Group>
            <Checkbox
              className="p-4 py-2 border-t w-full"
              onChange={handleCheckedAllOutList}
              checked={!!roleOutList.length && roleOutListChecked.length === roleOutList.length}
              disabled={!isUpdate}
            >
              {t("formAssignRole:selectedAll")}
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
              {t("formAssignRole:currentGroup")}
            </div>
            <Input
              placeholder={t("formAssignRole:searchRole")}
              value={filterRoleInList}
              onChange={(e) => setFilterRoleInList(e.target.value)}
              className="border-0 py-2 border-b rounded-none"
              prefix={<SearchNormal1 className="text-gray-016 me-1" size={16} />}
              disabled={!isUpdate}
            />
            <Checkbox.Group
              value={roleInListChecked}
              className="w-full h-[344px] max-h-[344px] overflow-y-auto"
              disabled={!isUpdate}
            >
              <List
                className="w-full"
                itemLayout="horizontal"
                dataSource={roleInList}
                renderItem={(item) => (
                  <List.Item className="!px-4 !py-2">
                    <List.Item.Meta
                      avatar={
                        <Checkbox
                          onChange={(e) => {
                            if (e.target.checked) {
                              setRoleInListChecked((prev) => [
                                ...prev,
                                e.target.value
                              ])
                            } else {
                              const tmpList = [...roleInListChecked].filter(i => i !== e.target.value)
                              setRoleInListChecked(tmpList)
                            }
                          }

                          }
                          value={item.id}
                          checked={roleInListChecked.some((i) => i === item.id)}
                        />
                      }
                      title={<span>{item.id + " - " + item.name}</span>}
                    />
                  </List.Item>
                )}
              />
            </Checkbox.Group>
            <Checkbox
              className="p-4 py-2 border-t w-full"
              onChange={handleCheckedAllInList}
              checked={!!roleInList.length && roleInListChecked.length === roleInList.length}
              disabled={!isUpdate}
            >
              {t("formAssignRole:selectedAll")}
            </Checkbox>
          </Col>
        </Row>
        <Row className="flex justify-end pb-5 px-3">
          <Button style={{ width: "150px" }} size="middle" onClick={() => setIsOpen(false)}>{t("button:close")}</Button>
          {
            isUpdate ? <Button style={{ width: "150px" }} size="middle" className="bg-color-blue ms-4 text-gray-001" onClick={handleConfirm}>
              {t("button:confirm")}
            </Button> : <></>
          }
        </Row>
      </Modal>
    </div>
  );
}
