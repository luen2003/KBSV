import { FilterDropdown, FilterInput, GridTable } from "@components/common/Table";
import { Button, Col, Row, Spin, Tag } from "antd";
import { useRef, useState } from "react";
import { useTranslation } from "react-i18next"
import { UserDetail } from "./detail";
import { UserUpdate } from "./update";
import { getUserDataTable } from "@services/user.service";
import { Edit2, Eye } from "iconsax-react";
import { useAppSelector } from "@hooks/useStore";
import { UserEnabled } from "@constants/User.constant";

export const UserIndex = () => {
    const permissions = useAppSelector(state => state.common.permissions);
    const { t } = useTranslation();
    const [isOpenUpdateForm, setIsOpenUpdateForm] = useState(false);
    const [isOpenDetailForm, setIsOpenDetailForm] = useState(false);
    const [data, setData] = useState<any>(null);

    const columns: any[] = [
        {
            title: t("user:id"),
            dataIndex: "id",
            key: "id",
            sorter: true,
            filterable: true,
            width: '150px',
            align: 'center',
            renderFilter: ({ column, confirm, ref }: any) => (
                <FilterInput column={column} confirm={confirm} ref={ref} type={"number"}
                />
            ),
        },
        {
            title: () => <div style={{ textAlign: 'center' }}>{t("user:username")}</div>,
            dataIndex: "username",
            key: "username",
            sorter: true,
            filterable: true,
            width: '170px',
        },
        {
            title: () => <div style={{ textAlign: 'center' }}>{t("user:fullName")}</div>,
            dataIndex: "fullName",
            key: "fullName",
            width: '230px',
            sorter: true,
            filterable: true,
        },
        {
            title: () => <div style={{ textAlign: 'center' }}>{t("user:departmentName")}</div>,
            dataIndex: "departmentName",
            key: "departmentName",
            width: '180px',
            sorter: true,
            filterable: true,
        },
        {
            title: () => <div style={{ textAlign: 'center' }}>{t("user:email")}</div>,
            dataIndex: "email",
            key: "email",
            width: '170px',
            sorter: true,
            filterable: true,
        },
        {
            title: () => <div style={{ textAlign: 'center' }}>{t("user:enabled:title")}</div>,
            dataIndex: "enabled",
            key: "enabled",
            width: '160px',
            sorter: true,
            filterable: true,
            render: (val: boolean, record: any) => {
                const statusText = (key: string, color: string) => (
                    <div>
                        <span style={{ color: color, marginRight: '5px', fontSize: '20px' }}>•</span>
                        {t(key)}
                    </div>
                );
                switch (val) {
                    case UserEnabled.ACTIVE: return statusText("user:enabled:value:active", 'green');
                    case UserEnabled.INACTIVE: return statusText("user:enabled:value:inActive", 'red');
                }
            },
            renderFilter: ({ column, confirm, ref }: any) => (
                <FilterDropdown column={column} confirm={confirm} ref={ref} options={[
                    { value: UserEnabled.ACTIVE, label: <Tag color="green">{t("user:enabled:value:active")}</Tag> },
                    { value: UserEnabled.INACTIVE, label: <Tag color="red">{t("user:enabled:value:inActive")}</Tag> },
                ]}
                />
            ),
        },
        {
            title: "",
            dataIndex: 'action',
            key: "action",
            fixed: "left",
            width: '90px',
            render: (text: string, record: any) => {
                return (<>
                    <Button style={{ padding: 8 }} onClick={() => {
                        setData(null);
                        setData(record);
                        setIsOpenDetailForm(true);
                    }} type="text">
                        <Eye
                            size="20"
                            className="text-color-grey"
                        />
                    </Button>
                    {permissions?.includes("UPDATE") ?
                        <Button style={{ padding: 4 }} onClick={() => {
                            setData(null);
                            setData(record);
                            setIsOpenUpdateForm(true);
                        }} type="text">
                            <Edit2
                                size="20"
                                className="text-color-grey"
                            />
                        </Button> : <></>}
                </>

                )
            }
        },
    ]
    const tableRef = useRef<any>(null);
    const fetchData = async (params: any) => {
        const data: any = await getUserDataTable(params);
        return data;
    }
    const reloadTable = () => {
        if (tableRef) {
            return tableRef.current.reload();
        }
    }

    return (<div>
        <UserDetail
            isOpen={isOpenDetailForm}
            setOpen={setIsOpenDetailForm}
            id={isOpenDetailForm ? data?.id : null}
        />
        <UserUpdate
            isOpen={isOpenUpdateForm}
            setOpen={setIsOpenUpdateForm}
            id={isOpenUpdateForm ? data?.id : null}
            reloadTable={reloadTable}
        />
        <div className="px-4 py-4 border border-b-gray-010">
            <GridTable
                ref={tableRef}
                columns={columns}
                fetchData={fetchData}
                addIndexCol={true}
                onRow={(record: any) => ({
                    onDoubleClick: () => {
                        setData(null);
                        setData(record);
                        setIsOpenDetailForm(true);
                    },
                })}
            />
        </div>
    </div>)
}