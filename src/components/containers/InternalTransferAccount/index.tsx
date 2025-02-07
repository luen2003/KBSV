import { FilterDatePicker, FilterDropdown, FilterInput, GridTable } from "@components/common/Table"
import { useEffect, useRef, useState } from "react";
import { Button, Tag, Spin } from "antd";
import _ from "lodash";
import { useTranslation } from "react-i18next";
import "antd/dist/reset.css";
import { getInternalTransferAccountDataTable, getInternalTransferAccountMaster } from "@services/InternalTransferAccountServices";
import { InternalTransferAccountStatus } from "@constants/InternalTransferAccountStatus";
import { InternalTransferAccountCreate } from "./create";
import { InternalTransferAccountDetail } from "./detail";
import { InternalTransferAccountDelete } from "./delete";
import { Eye } from "iconsax-react";
import { Plus, Trash2 } from "lucide-react";
import { useAppSelector } from "@hooks/useStore";
import { getBankMaster } from "@services/BankService";

export const InternalTransferAccountIndex = () => {
    const permissions = useAppSelector(state => state.common.permissions);
    const { t } = useTranslation();
    const tableRef = useRef<any>(null);
    const [banks, setBanks] = useState<any[]>([]);
    const [intTransferAccounts, setIntTransferAccounts] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isOpenDetailForm, setIsOpenDetailForm] = useState(false);
    const [isOpenDeleteForm, setIsOpenDeleteForm] = useState(false);
    const [isOpenCreateForm, setIsOpenCreateForm] = useState(false);
    const [selectedInternalTransferAccount, setInternalTransferAccount] = useState(0);

    const initMasterData = async () => {
        try {
            const intTransferAccountMaster: any = await getInternalTransferAccountMaster();
            setIntTransferAccounts(intTransferAccountMaster.value);
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
            dataIndex: 'action',
            key: "action",
            fixed: "left",
            width: '70px',
            render: (text: string, record: any) => {
                return (<>
                    {/* View */}
                    <Button style={{ padding: 4 }} onClick={() => {
                        setInternalTransferAccount(record.id);
                        setIsOpenDetailForm(true);
                    }} type="text">
                        <Eye
                            size="20"
                            className="text-color-grey"
                        />
                    </Button>

                    {
                        permissions?.includes("DELETE") ?
                            record.status == InternalTransferAccountStatus.COMPLETED && (
                                <Button style={{ padding: 4 }} onClick={() => {
                                    setInternalTransferAccount(record.id);
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
            title: t("intTransferAccount:status"),
            dataIndex: "status",
            key: "status",
            sorter: true,
            filterable: true,
            fixed: true,
            width: '144px',
            render: (text: string, record: any) => {
                switch (text) {
                    case InternalTransferAccountStatus.WAITING_APPROVAL_CREATE: return t("intTransferAccount:approveStatus:waitingApprovalCreate");
                    case InternalTransferAccountStatus.WAITING_APPROVAL_DELETE: return t("intTransferAccount:approveStatus:waitingApprovalDelete");
                    case InternalTransferAccountStatus.COMPLETED: return t("intTransferAccount:approveStatus:completed");
                    case InternalTransferAccountStatus.REJECTED: return t("intTransferAccount:approveStatus:rejected");
                }
            },
            renderFilter: ({ column, confirm, ref }: any) => (
                <FilterDropdown column={column} confirm={confirm} ref={ref} options={[
                    { value: InternalTransferAccountStatus.COMPLETED, label: <Tag color="green">{t("intTransferAccount:approveStatus:completed")}</Tag> },
                    { value: InternalTransferAccountStatus.WAITING_APPROVAL_CREATE, label: <Tag color="blue">{t("intTransferAccount:approveStatus:waitingApprovalCreate")}</Tag> },
                    { value: InternalTransferAccountStatus.WAITING_APPROVAL_DELETE, label: <Tag color="orange">{t("intTransferAccount:approveStatus:waitingApprovalDelete")}</Tag> },
                    { value: InternalTransferAccountStatus.REJECTED, label: <Tag color="red">{t("intTransferAccount:approveStatus:rejected")}</Tag> },
                ]}
                />
            ),
        },
        {
            title: t("intTransferAccount:bank"),
            dataIndex: "bankCode",
            key: "bankCode",
            width: '480px',
            filterable: true,
            sorter: true,
            render: (text: string, record: any) => {
                return text = `${record.bankId} - ${record.bankCode} - ${record.bankName}`
            },
            renderFilter: ({ column, confirm, ref }: any) => {
                const options = (banks || []).map(bank => (
                    { value: bank.bankCode, label: `${bank.bankNo} - ${bank.shortName} - ${bank.name}` }
                ));
                return (
                    <FilterDropdown column={column} confirm={confirm} ref={ref} options={options}
                    />
                )
            },
        },
        {
            title: t("intTransferAccount:type:header"),
            dataIndex: "accountNumber",
            key: "accountNumber",
            width: '465PX',
            filterable: true,
            sorter: true,
            render: (text: string, record: any) => {
                return record.type === "ALL" ? "Tất cả" : record.accountNumber;
            },
            renderFilter: ({ column, confirm, ref }: any) => (
                <FilterInput column={column} confirm={confirm} ref={ref} type={"string"} />
            ),
        }
    ]

    const fetchData = async (params: any) => {
        // Logic check filter accountNumber =  All => set type = ALL and delete accountNumber
        let filterObj = JSON.parse(params?.filters);
        if (filterObj["accountNumber"]) {
            let accountNumberValue = JSON.parse(JSON.stringify(filterObj["accountNumber"]));
            const normalizeInputType = await normalizeText(accountNumberValue["value"].trim().toLowerCase());
            const normalizeTypeAll = await normalizeText("tất cả");
            if (normalizeInputType == normalizeTypeAll || normalizeInputType == "all") {
                filterObj["type"] = filterObj.accountNumber;
                filterObj["type"]["value"] = "ALL";
                delete filterObj.accountNumber;
                params.filters = JSON.stringify(filterObj);
            }
        }

        const data: any = await getInternalTransferAccountDataTable(params);
        return data;
    }

    const normalizeText = async (text: String) => {
        return text.normalize("NFC").trim();
    }

    const reloadTable = () => {
        if (tableRef) {
            return tableRef.current.reload();
        }
    }

    if (isLoading) return <Spin />
    return (
        <Spin spinning={isLoading}>
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
                    </div> : <></>
            }
            <GridTable
                ref={tableRef}
                columns={columns}
                fetchData={fetchData}
                addIndexCol={true}
                className="px-6 border-b-gray-010"
                onRow={(record: any) => ({
                    onDoubleClick: () => {
                        setInternalTransferAccount(record.id);
                        setIsOpenDetailForm(true);
                    }, // Mở modal detail khi click vào hàng
                })}
                scroll={{ y: '63vh' }}
            />

            {isOpenCreateForm && <InternalTransferAccountCreate
                isOpen={isOpenCreateForm}
                setOpen={setIsOpenCreateForm}
                reloadTable={reloadTable}
            />}
            <InternalTransferAccountDetail
                isOpen={isOpenDetailForm}
                setOpen={setIsOpenDetailForm}
                id={isOpenDetailForm ? selectedInternalTransferAccount : 0}
            />
            <InternalTransferAccountDelete
                isOpen={isOpenDeleteForm}
                setOpen={setIsOpenDeleteForm}
                id={isOpenDeleteForm ? selectedInternalTransferAccount : 0}
                reloadTable={reloadTable}
            />
        </Spin>
    );
}