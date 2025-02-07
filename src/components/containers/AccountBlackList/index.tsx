import { FilterDropdown, FilterInput, GridTable } from "@components/common/Table";
import { ApproveBlacklistStatus } from "@constants/ApproveBlacklistStatus";
import { getAccountBlacklistDataTable } from "@services/BlacklistAccountService";
import { Button, Col, Row, Spin, Tag } from "antd";
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next"
import { AccountBlackListDetail } from "./detail";
import { AccountBlackListFormCreate } from "./create";
import { AccountBlackListUpdate } from "./update";
import { AccountBlackListDelete } from "./delete";
import { Edit2, Eye } from "iconsax-react";
import { Plus, Trash2 } from "lucide-react";
import { useAppSelector } from "@hooks/useStore";
import _, { set } from "lodash";
import { getBankMaster } from "@services/BankService";

export const AccountBlackListIndex = () => {
    const permissions = useAppSelector(state => state.common.permissions);
    const { t } = useTranslation();
    const [isLoading, setIsLoading] = useState(true);
    const [banks, setBanks] = useState<any[]>([]);
    const [isOpenCreateForm, setIsOpenCreateForm] = useState(false);
    const [isOpenDetailForm, setIsOpenDetailForm] = useState(false);
    const [isOpenUpdateForm, setIsOpenUpdateForm] = useState(false);
    const [isOpenDeleteForm, setIsOpenDeleteForm] = useState(false);
    const [data, setData] = useState<any>(null);

    const initMasterData = async () => {
        setIsLoading(true);
        try {
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
            title: "",
            dataIndex: 'action',
            key: "action",
            fixed: "left",
            width: '105px',
            render: (text: string, record: any) => {
                return (
                    <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                        <Col span={4}>
                            <Button style={{ padding: 4 }} onClick={() => {
                                setData(record);
                                setIsOpenDetailForm(true);
                            }} type="text">
                                <Eye
                                    size="20"
                                    className="text-color-grey"
                                />
                            </Button>
                        </Col>
                        {
                            permissions?.includes("UPDATE") ?
                                record.status == ApproveBlacklistStatus.COMPLETED && (
                                    <Col span={4}>
                                        <Button style={{ padding: 4 }} onClick={() => {
                                            setData(record);
                                            setIsOpenUpdateForm(true);
                                        }} type="text">
                                            <Edit2
                                                size="20"
                                                className="text-color-grey"
                                            />
                                        </Button>
                                    </Col>
                                ) : <> </>
                        }
                        {
                            permissions?.includes("DELETE") ?
                                record.status == ApproveBlacklistStatus.COMPLETED && (
                                    <Col span={4}>
                                        <Button style={{ padding: 4 }} onClick={() => {
                                            setData(record);
                                            setIsOpenDeleteForm(true);
                                        }} type="text">
                                            <Trash2
                                                size="20"
                                                className="text-color-grey"
                                                strokeWidth={1.5}
                                            />
                                        </Button>
                                    </Col>
                                ) : <> </>
                        }
                    </Row>
                )
            }
        },
        {
            title: t("blacklist:status"),
            dataIndex: "status",
            key: "status",
            sorter: true,
            filterable: true,
            fixed: true,
            width: '145px',
            render: (text: string) => {
                switch (text) {
                    case ApproveBlacklistStatus.COMPLETED: return t("blacklist:approveStatus:completed");
                    case ApproveBlacklistStatus.REJECTED: return t("blacklist:approveStatus:rejected");
                    case ApproveBlacklistStatus.WAITING_APPROVAL_CREATE: return t("blacklist:approveStatus:waitingApprovalCreate");
                    case ApproveBlacklistStatus.WAITING_APPROVAL_EDIT: return t("blacklist:approveStatus:waitingApprovalEdit");
                    case ApproveBlacklistStatus.WAITING_APPROVAL_DELETE: return t("blacklist:approveStatus:waitingApprovalDelete");
                }
                return text;
            },
            renderFilter: ({ column, confirm, ref }: any) => (
                <FilterDropdown column={column} confirm={confirm} ref={ref} options={[
                    { value: ApproveBlacklistStatus.COMPLETED, label: <Tag color="green">{t("blacklist:approveStatus:completed")}</Tag> },
                    { value: ApproveBlacklistStatus.WAITING_APPROVAL_CREATE, label: <Tag color="blue">{t("blacklist:approveStatus:waitingApprovalCreate")}</Tag> },
                    { value: ApproveBlacklistStatus.WAITING_APPROVAL_EDIT, label: <Tag color="orange">{t("blacklist:approveStatus:waitingApprovalEdit")}</Tag> },
                    { value: ApproveBlacklistStatus.WAITING_APPROVAL_DELETE, label: <Tag color="orange">{t("blacklist:approveStatus:waitingApprovalDelete")}</Tag> },
                    { value: ApproveBlacklistStatus.REJECTED, label: <Tag color="red">{t("blacklist:approveStatus:rejected")}</Tag> },
                ]}
                />
            ),
        },
        {
            title: "ID",
            dataIndex: "id",
            key: "id",
            width: '65px',
            filterable: true,
            align: 'center',
            sorter: true,
            render: (text: string, record: any) => _.get(record, "id"),
            renderFilter: ({ column, confirm, ref }: any) => (
                <FilterInput column={column} confirm={confirm} ref={ref} type={"number"}
                />
            ),
        },
        {
            title: t("blacklist:beneficiaryAccountNumber"),
            dataIndex: "beneficiaryAccountNumber",
            key: "beneficiaryAccountNumber",
            width: '165px',
            filterable: true,
            sorter: true,
        },
        {
            title: t("blacklist:beneficiaryAccountName"),
            dataIndex: "beneficiaryAccountName",
            key: "beneficiaryAccountName",
            width: '180px',
            filterable: true,
            sorter: true,
        },
        {
            title: t("blacklist:beneficiaryBankName"),
            dataIndex: "beneficiaryBankName",
            key: "beneficiaryBankName",
            width: '277px',
            sorter: true,
            filterable: true,
            ellipsis: true,
            render: (text: string, record: any) => _.get(record, "beneficiaryBankName"),
            renderFilter: ({ column, confirm, ref }: any) => {
                const options = (banks || []).map(bank => (
                    { value: bank.bankNo + " - " + bank.name, label: bank.bankNo + " - " + bank.name }
                ));
                return (
                    <FilterDropdown column={column} confirm={confirm} ref={ref} options={options}
                    />
                )
            },
        },
        {
            title: t("blacklist:beneficiaryBranchName"),
            dataIndex: "beneficiaryBranchName",
            key: "beneficiaryBranchName",
            width: '220px',
            filterable: true,
            sorter: true,
        },
        {
            title: t("blacklist:accountNumber"),
            dataIndex: "accountNumber",
            key: "accountNumber",
            width: '140px',
            filterable: true,
            sorter: true,
        },
        {
            title: t("blacklist:afAccountNumber"),
            dataIndex: "afAccountNumber",
            key: "afAccountNumber",
            width: '145px',
            filterable: true,
            sorter: true,
        },
        {
            title: t("blacklist:customerName"),
            dataIndex: "customerName",
            key: "customerName",
            width: '165px',
            filterable: true,
            sorter: true,
        },
    ]
    const tableRef = useRef<any>(null);
    const fetchData = async (params: any) => {
        const data: any = await getAccountBlacklistDataTable(params);
        return data;
    }
    const reloadTable = () => {
        if (tableRef) {
            return tableRef.current.reload();
        }
    }

    if (isLoading) return <Spin />

    return (
        <div className="px-6 py-2 text-right">
            {
                permissions?.includes("CREATE") ?
                    <Button
                        type="primary"
                        className="text-gray-013 bg-color-blue"
                        onClick={() => setIsOpenCreateForm(true)}
                    >
                        <Plus />
                        {t("button:create")}
                    </Button> : <></>
            }

            <GridTable
                ref={tableRef}
                columns={columns}
                fetchData={fetchData}
                addIndexCol={true}
                className="py-2 border-b-gray-010"
                onRow={(record: any) => ({
                    onDoubleClick: () => {
                        setData(record);
                        setIsOpenDetailForm(true);
                    }, // Mở modal detail khi click vào hàng
                })}
                scroll={{ y: '63vh' }}
            />

            <AccountBlackListFormCreate
                isOpen={isOpenCreateForm}
                setOpen={setIsOpenCreateForm}
                reloadTable={reloadTable}
            />
            <AccountBlackListDetail
                isOpen={isOpenDetailForm}
                setOpen={setIsOpenDetailForm}
                id={isOpenDetailForm ? data?.id : null}
            />
            <AccountBlackListUpdate
                isOpen={isOpenUpdateForm}
                setOpen={setIsOpenUpdateForm}
                id={isOpenUpdateForm ? data?.id : null}
                reloadTable={reloadTable}
            />
            <AccountBlackListDelete
                isOpen={isOpenDeleteForm}
                setOpen={setIsOpenDeleteForm}
                id={isOpenDeleteForm ? data?.id : null}
                reloadTable={reloadTable}
            />

        </div>)
}