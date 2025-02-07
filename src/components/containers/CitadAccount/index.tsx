import { FilterDatePicker, FilterDropdown, FilterInput, GridTable } from "@components/common/Table"
import { useEffect, useRef, useState } from "react";
import { Button, Tag, Spin } from "antd";
import _, { set } from "lodash";
import { useTranslation } from "react-i18next";
import { CitadAccountDetail } from "./detail";
import "antd/dist/reset.css";
import { CitadAccountStatus } from "@constants/CitadAccountStatus";
import { getCitadAccountDataTable, getCitadAccountMaster } from "@services/CitadAccountService";
import { CitadAccountDelete } from "./delete";
import { CitadAccountCreate } from "./create";
import { Eye } from "iconsax-react";
import { Plus, Trash2 } from "lucide-react";
import { useAppSelector } from "@hooks/useStore";
import { TableParam2BackendQuery } from "@components/common/Table/interface/TableParam2BackendQuery";
import { getBankMaster } from "@services/BankService";


export const CitadAccountIndex = () => {
    const permissions = useAppSelector(state => state.common.permissions);
    const { t } = useTranslation();
    const tableRef: any = useRef(null);
    const [banks, setBanks] = useState<any[]>([]);
    const [CitadAccounts, setCitadAccounts] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isOpenCreateForm, setIsOpenCreateForm] = useState(false);
    const [isOpenDeleteForm, setIsOpenDeleteForm] = useState(false);
    const [isOpenDetailForm, setIsOpenDetailForm] = useState(false);
    const [selectedCitadAccount, setCitadAccount] = useState<any>(null);

    const initMasterData = async () => {
        setIsLoading(true);
        try {
            const CitadAccountsMaster: any = await getCitadAccountMaster();
            setCitadAccounts(CitadAccountsMaster.value);
            const banksMaster: any = await getBankMaster();
            setBanks(banksMaster.value);
        } catch (e) {
            console.log(e);
        }
        setIsLoading(false);
    }

    useEffect(() => {
        initMasterData();
    }, []);

    const columns: any[] = [
        {
            title: t("citadAccount:action"),
            dataIndex: 'action',
            key: "action",
            fixed: "left",
            width: '78px',
            render: (text: string, record: any) => {
                return (<>
                    <Button style={{ padding: 4 }} onClick={() => {
                        setCitadAccount(record);
                        setIsOpenDetailForm(true);
                    }} type="text">
                        <Eye
                            size="20"
                            className="text-color-grey"
                        />
                    </Button>
                    {
                        permissions?.includes("DELETE") ?
                            record.status == CitadAccountStatus.COMPLETED && (
                                <Button style={{ padding: 4 }} onClick={() => {
                                    setCitadAccount(record);
                                    setIsOpenDeleteForm(true);
                                }} type="text">
                                    <Trash2
                                        size="20"
                                        className="text-color-grey"
                                        strokeWidth={1.5}
                                    />
                                </Button>
                            ) : <></>
                    }
                </>
                )
            }
        },
        {
            title: t("citadAccount:status"),
            dataIndex: "status",
            key: "status",
            sorter: true,
            filterable: true,
            fixed: true,
            width: '150px',
            render: (text: string, record: any) => {
                switch (text) {
                    case CitadAccountStatus.COMPLETED: return t("citadAccount:approveStatus:completed");
                    case CitadAccountStatus.WAITING_APPROVAL_CREATE: return t("citadAccount:approveStatus:waitingApprovalCreate");
                    case CitadAccountStatus.WAITING_APPROVAL_DELETE: return t("citadAccount:approveStatus:waitingApprovalDelete");
                    case CitadAccountStatus.DELETED: return t("citadAccount:approveStatus:deleted");
                    case CitadAccountStatus.REJECT: return t("citadAccount:approveStatus:rejected");
                }
            },
            renderFilter: ({ column, confirm, ref }: any) => (
                <FilterDropdown column={column} confirm={confirm} ref={ref} options={[
                    { value: CitadAccountStatus.COMPLETED, label: <Tag color="green">{t("citadAccount:approveStatus:completed")}</Tag> },
                    { value: CitadAccountStatus.WAITING_APPROVAL_CREATE, label: <Tag color="blue">{t("citadAccount:approveStatus:waitingApprovalCreate")}</Tag> },
                    { value: CitadAccountStatus.WAITING_APPROVAL_DELETE, label: <Tag color="orange">{t("citadAccount:approveStatus:waitingApprovalDelete")}</Tag> },
                    { value: CitadAccountStatus.REJECT, label: <Tag color="red">{t("citadAccount:approveStatus:rejected")}</Tag> },
                    { value: CitadAccountStatus.DELETED, label: <Tag color="red">{t("citadAccount:approveStatus:deleted")}</Tag> },
                ]}
                />
            ),
        },
        {
            title: t("bank:bankNo"),
            dataIndex: "bank.bankNo",
            key: "bank.bankNo",
            width: '135px',
            filterable: true,
            sorter: true,
            render: (text: string, record: any) => _.get(record, "bank.bankNo"),
            renderFilter: ({ column, confirm, ref }: any) => (
                <FilterInput column={column} confirm={confirm} ref={ref} type={"number"}
                />
            ),
        },
        {
            title: t("bank:name"),
            dataIndex: "bank.name",
            key: "bank.name",
            filterable: true,
            width: '150px',
            ellipsis: true,
            sorter: true,
            render: (text: string, record: any) => _.get(record, "bank.name"),
            renderFilter: ({ column, confirm, ref }: any) => {
                const options = (banks || []).map(bank => (
                    { value: bank.id, label: bank.name }
                ));
                return (
                    <FilterDropdown column={column} confirm={confirm} ref={ref} options={options}
                    />
                )
            },
        },
        {
            title: t("bank:shortName"),
            dataIndex: "bank.shortName",
            key: "bank.shortName",
            filterable: true,
            width: '120px',
            sorter: true,
            render: (text: string, record: any) => _.get(record, "bank.shortName"),
            renderFilter: ({ column, confirm, ref }: any) => {
                const options = (banks || []).map(bank => (
                    { value: bank.id, label: bank.shortName }
                ));
                return (
                    <FilterDropdown column={column} confirm={confirm} ref={ref} options={options}
                    />
                )
            },
        },
        {
            title: t("citadAccount:accountNumber"),
            dataIndex: "accountNumber",
            key: "accountNumber",
            sorter: true,
            filterable: true,
            width: '140px',
            render: (text: string, record: any) => _.get(record, "accountNumber"),
        },
        {
            title: t("citadAccount:fullAfAccountNumber"),
            dataIndex: "fullAfAccountNumber",
            key: "fullAfAccountNumber",
            sorter: true,
            filterable: true,
            width: '140px',
            render: (text: string, record: any) => _.get(record, "fullAfAccountNumber"),
        },
        {
            title: t("citadAccount:customerName"),
            dataIndex: "customerName",
            key: "customerName",
            sorter: true,
            filterable: true,
            width: '230px',
            render: (text: string, record: any) => _.get(record, "customerName"),
        },
    ]

    const fetchData = async (params: TableParam2BackendQuery) => {
        const data: any = await getCitadAccountDataTable(params);
        return data;
    }

    const reloadTable = () => {
        if (tableRef && tableRef.current) {
            return tableRef.current.reload();
        }
    }
    if (isLoading) return <Spin />
    return (
        <div className="container mx-auto">
            <CitadAccountCreate
                isOpen={isOpenCreateForm}
                setOpen={setIsOpenCreateForm}
                reloadTable={reloadTable}
            />
            <CitadAccountDelete
                isOpen={isOpenDeleteForm}
                setOpen={setIsOpenDeleteForm}
                id={isOpenDeleteForm ? selectedCitadAccount?.id : null}
                reloadTable={reloadTable}
            />
            <CitadAccountDetail
                isOpen={isOpenDetailForm}
                setOpen={setIsOpenDetailForm}
                id={isOpenDetailForm ? selectedCitadAccount?.id : null}
            />
            {
                permissions?.includes("CREATE") ?
                    <div className="px-6 py-2 text-right" style={{ height: '7vh' }}>
                        <Button
                            type="primary"
                            className="text-gray-013 bg-color-blue"
                            onClick={() => setIsOpenCreateForm(true)}
                        >
                            <Plus />
                            {t("button:create")}
                        </Button>
                    </div> : <> </>
            }
            <GridTable
                ref={tableRef}
                columns={columns}
                fetchData={fetchData}
                addIndexCol={true}
                className="px-6 border-b-gray-010"
                onRow={(record: any) => ({
                    onDoubleClick: () => {
                        setCitadAccount(record);
                        setIsOpenDetailForm(true);
                    }, // Mở modal detail khi click vào hàng
                })}
                scroll={{ y: '63vh' }}
            />
        </div>
    )
}