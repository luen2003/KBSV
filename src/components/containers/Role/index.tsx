import { useRef, useState } from "react";

import { FilterDropdown, FilterInput, GridTable } from "@components/common/Table"
import { Button, Spin, Tag } from "antd";
import _ from "lodash";
import { useTranslation } from "react-i18next";

import "antd/dist/reset.css";
import { RoleDetail } from "./detail";
import { RoleStatus } from "@constants/Role.constant";
import { getRoleDataTable } from "@services/RoleService";
import { RoleCreate } from "./create";
import { RoleDelete } from "./delete";
import { RoleUpdate } from "./update";
import { Edit2, Eye, TextalignCenter } from "iconsax-react";
import { Plus, Trash2 } from "lucide-react";
import { useAppSelector } from "@hooks/useStore";
import { Btn } from "@components/common/Btn";
import { CODE_GROUPS_ROLE_ADMIN } from "@store/constants";

export const RoleIndex = () => {
  const permissions = useAppSelector(state => state.common.permissions);
  const { t } = useTranslation();
  const tableRef = useRef<any>(null);
  const [isOpenUpdateForm, setIsOpenUpdateForm] = useState(false);
  const [isOpenDetailForm, setIsOpenDetailForm] = useState(false);
  const [selectedRole, setRole] = useState<any>(null);
  const [isOpenCreateForm, setIsOpenCreateForm] = useState(false);
  const [isOpenDeleteForm, setIsOpenDeleteForm] = useState(false);
  const [selectedInternalTransferAccount, setInternalTransferAccount] = useState(0);
  const accountsInfo = useAppSelector((state) => state.common.accountsInfo) || {};

  const columns: any[] = [
    {
      title: t("role:id"),
      dataIndex: "id",
      key: "id",
      width: 170,
      align: 'center',
      filterable: true,
      sorter: true,
      render: (text: string, record: any) => _.get(record, "id"),
      renderFilter: ({ column, confirm, ref }: any) => (
        <FilterInput column={column} confirm={confirm} ref={ref} type={"number"}
        />
      ),
    },
    // {
    //   title: () => <div style={{ textAlign: 'center' }}>{t("role:authority")}</div>,
    //   dataIndex: "authority",
    //   key: "authority",
    //   sorter: true,
    //   filterable: true
    // },
    {
      title: () => <div style={{ textAlign: 'center' }}>{t("role:name")}</div>,
      dataIndex: "name",
      key: "name",
      width: 300,
      filterable: true,
      sorter: true,
      render: (text: string) => (
        <div style={{
          display: '-webkit-box',
          WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'normal',
          width: '100%',
        }}>
          {text}
        </div>
      )
    },
    {
      title: () => <div style={{ textAlign: 'center' }}>{t("role:description")}</div>,
      dataIndex: "description",
      key: "description",
      width: 400,
      filterable: true,
      sorter: true,
      render: (text: string) => (
        <div style={{
          display: '-webkit-box',
          WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'normal',
          width: '100%',
        }}>
          {text}
        </div>
      )
    },
    {
      title: () => <div style={{ textAlign: 'center' }}>{t("role:status")}</div>,
      dataIndex: "status",
      key: "status",
      width: 185,
      filterable: true,
      sorter: true,
      render: (val: boolean, record: any) => {
        const statusText = (key: string, color: string) => (
          <div>
            <span style={{ color: color, marginRight: '5px', fontSize: '20px' }}>•</span>
            {t(key)}
          </div>
        );
        switch (val) {
          case RoleStatus.ACTIVE: return statusText("roleStatus:active", 'green');
          case RoleStatus.IN_ACTIVE: return statusText("roleStatus:in_active", 'red');
        }
      },
      renderFilter: ({ column, confirm, ref }: any) => (
        <FilterDropdown column={column} confirm={confirm} ref={ref} options={[
          { value: RoleStatus.ACTIVE, label: <Tag color="green">{t("roleStatus:active")}</Tag> },
          { value: RoleStatus.IN_ACTIVE, label: <Tag color="red">{t("roleStatus:in_active")}</Tag> },
        ]}
        />
      ),
    },
    {
      dataIndex: 'action',
      key: "action",
      width: 130,
      render: (text: string, record: any) => {
        // Logic: Group Role-Admin can't be deleted and only updated by users in group
        const isRoleAdmin = CODE_GROUPS_ROLE_ADMIN.split(",").includes(record.authority);
        let usernameInCurrentGroup = record?.users?.map((item: any) => item.username) || [];
        const isUserInGroupAdmin = usernameInCurrentGroup.includes(accountsInfo?.username);
        return (<>
          <Button style={{ padding: 8 }} onClick={() => {
            setRole(record);
            setIsOpenDetailForm(true);
          }} type="text">
            <Eye size={20} className="text-color-grey" />
          </Button>

          {
            (permissions?.includes("UPDATE") && !isRoleAdmin) || (isRoleAdmin && isUserInGroupAdmin) ?
              <Button style={{ padding: 8 }} onClick={() => {
                setRole(record);
                setIsOpenUpdateForm(true);
              }} type="text">
                <Edit2 size={20} className="text-color-grey" />
              </Button> : <></>
          }

          {
            permissions?.includes("DELETE") && !isRoleAdmin ?
              <Button style={{ padding: 8 }} onClick={() => {
                setInternalTransferAccount(record.id);
                setIsOpenDeleteForm(true);
              }} type="text">
                <Trash2 size={20} strokeWidth={1.5} className="text-color-grey" />
              </Button> : <></>
          }

        </>
        )
      }
    }
  ]

  const fetchData = async (params: any) => {
    const data: any = await getRoleDataTable(params);
    return data;
  }

  const reloadTable = () => {
    if (tableRef) {
      return tableRef.current.reload();
    }
  }

  return (
    <div>
      {
        permissions?.includes("CREATE") ?
          <div>
            <Btn
              type="primary"
              className="text-gray-013 bg-color-blue mb-3 float-end"
              style={{ padding: '8px 12px 8px 12px', width: "111px" }}
              onClick={() => setIsOpenCreateForm(true)}
              icon={<Plus size={20} />}
            >
              Thêm mới
            </Btn>
          </div> : <></>
      }
      <RoleDetail
        isOpen={isOpenDetailForm}
        setOpen={setIsOpenDetailForm}
        id={isOpenDetailForm ? selectedRole?.id : null}
      />
      <RoleCreate
        isOpen={isOpenCreateForm}
        setOpen={setIsOpenCreateForm}
        reloadTable={reloadTable}
      />

      <RoleDelete
        isOpen={isOpenDeleteForm}
        setOpen={setIsOpenDeleteForm}
        id={isOpenDeleteForm ? selectedInternalTransferAccount : 0}
        reloadTable={reloadTable}
      />

      <RoleUpdate
        isOpen={isOpenUpdateForm}
        setOpen={setIsOpenUpdateForm}
        id={isOpenUpdateForm ? selectedRole?.id : null}
        reloadTable={reloadTable}
      />

      <div className="px-4 py-3  border border-b-gray-010">
        <GridTable
          ref={tableRef}
          columns={columns}
          fetchData={fetchData}
          addIndexCol={true}
          onRow={(record: any) => ({
            onDoubleClick: () => {
              setRole(null);
              setRole(record);
              setIsOpenDetailForm(true);
            }, // Mở modal detail khi click vào hàng
          })}
        />
      </div>
    </div>
  )
}