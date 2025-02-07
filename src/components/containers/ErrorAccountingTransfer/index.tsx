
import { FilterDatePicker, FilterDropdown, FilterInput, GridTable } from "@components/common/Table";
import FilterParam from "@components/common/Table/interface/FilterParam";
import { getErrorAccountingTransferDataTable } from "@services/TransferService";
import { Button, Col, Row, Tag } from "antd";
import moment from "moment";
import { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { TransferDetail } from "./detail";
import { CreateCreditNote } from "./create-credit-note";
import { CreditNoteStatus } from "@constants/CreditNoteStatus";
import { CancelCreditNote } from "./cancel-credit-note";
import { formatNumberWithCommas } from "@helpers/utils";
import { TableParam2BackendQuery } from "@components/common/Table/interface/TableParam2BackendQuery";
import { Check, X } from "lucide-react";
import { Eye } from "iconsax-react";
import { useAppSelector } from "@hooks/useStore";

export const ErrorAccountingTransferIndex = () => {
    const permissions = useAppSelector(state => state.common.permissions);
    const { t } = useTranslation();
    const tableRef = useRef<any>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isOpenCreateNoteForm, setIsOpenCreateNoteForm] = useState(false);
    const [isOpenCancelNoteForm, setIsOpenCancelNoteForm] = useState(false);
    const [isOpenDetailForm, setIsOpenDetailForm] = useState(false);
    const [data, setData] = useState<any>(null);

    const columns: any[] = [
        {
            title: "",
            dataIndex: 'action',
            key: "action",
            fixed: "left",
            width: '105px',
            render: (text: string, record: any) => {
                let isAllowApprove = false;
                let isAllowDelete = false;
                if (
                    record?.creditNoteStatus != CreditNoteStatus.WAITING_APPROVAL &&
                    record?.creditNoteStatus != CreditNoteStatus.WAITING_DELETE &&
                    permissions?.includes("CREATE")
                ) {
                    isAllowApprove = true;
                }
                if (
                    record?.creditNoteStatus != CreditNoteStatus.WAITING_APPROVAL &&
                    record?.creditNoteStatus != CreditNoteStatus.WAITING_DELETE &&
                    permissions?.includes("DELETE")
                ) {
                    isAllowDelete = true;
                }
                return (<Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }} style={{ textAlign: "center" }}>
                    {isAllowApprove ? (<Col span={4}>
                        <Button style={{ padding: 4 }} onClick={() => {
                            setData(null);
                            setData(record);
                            setIsOpenCreateNoteForm(true);
                        }} type="text">
                            <Check size={20} className="text-color-green" />
                        </Button>
                    </Col>
                    ) : <Col span={4}></Col>}

                    {isAllowDelete ? (<Col span={4}>
                        <Button style={{ padding: 4 }} onClick={() => {
                            setData(null);
                            setData(record);
                            setIsOpenCancelNoteForm(true);
                        }} type="text">
                            <X size={20} className="text-color-red" />
                        </Button>
                    </Col>
                    ) : <Col span={4}></Col>}

                    <Col span={4}>
                        <Button style={{ padding: 4 }} onClick={() => {
                            setData(null);
                            setData(record);
                            setIsOpenDetailForm(true);
                        }} type="text">
                            <Eye
                                size="20"
                                className="text-color-grey"
                            />
                        </Button>
                    </Col>
                </Row>
                )
            }
        },
        {
            title: t("transfer:status"),
            dataIndex: "creditNoteStatus",
            key: "creditNoteStatus",
            width: '140px',
            filterable: true,
            sorter: true,
            render: (val: string, record: any) => {
                const statusText = (key: string, color: string) => (
                    <div>
                        <span style={{ color: color, marginRight: '5px', fontSize: '20px' }}>•</span>
                        {t(key)}
                    </div>
                );

                switch (val) {
                    case CreditNoteStatus.COMPLETED:
                        return statusText("creditNoteStatus:completed", 'green');
                    case CreditNoteStatus.REJECTED:
                        return statusText("creditNoteStatus:reject", 'red');
                    case CreditNoteStatus.WAITING_APPROVAL:
                        return statusText("creditNoteStatus:waitingApproval", 'orange');
                    case CreditNoteStatus.WAITING_DELETE:
                        return statusText("creditNoteStatus:waitingDelete", 'orange');
                    case CreditNoteStatus.NONE:
                        return statusText("creditNoteStatus:none", 'grey');
                }
            },
            renderFilter: ({ column, confirm, ref }: any) => (
                <FilterDropdown column={column} confirm={confirm} ref={ref} options={[
                    { value: CreditNoteStatus.NONE, label: <Tag color="gray">{t("creditNoteStatus:none")}</Tag> },
                    { value: CreditNoteStatus.COMPLETED, label: <Tag color="green">{t("creditNoteStatus:completed")}</Tag> },
                    { value: CreditNoteStatus.WAITING_APPROVAL, label: <Tag color="orange">{t("creditNoteStatus:waitingApproval")}</Tag> },
                    { value: CreditNoteStatus.WAITING_DELETE, label: <Tag color="orange">{t("creditNoteStatus:waitingDelete")}</Tag> },
                    { value: CreditNoteStatus.REJECTED, label: <Tag color="red">{t("creditNoteStatus:reject")}</Tag> },
                ]}
                />
            ),
        },
        {
            title: t("transfer:txDate"),
            dataIndex: "txDate",
            key: "txDate",
            width: '157px',
            filterable: true,
            sorter: true,
            render: (text: any, record: any) => {
                return text ? moment(text).format("DD/MM/YYYY") : "";
            },
            renderFilter: ({ column, confirm, ref }: FilterParam) => (
                <FilterDatePicker column={column} confirm={confirm} ref={ref} />
            ),
        },
        {
            title: t("transfer:flexTransferId"),
            dataIndex: "uuid",
            key: "uuid",
            width: '180px',
            filterable: true,
        },
        {
            title: t("transfer:transferCode"),
            dataIndex: "requestId",
            key: "requestId",
            width: '160px',
            filterable: true,
            sorter: true,
            render: (text: any, record: any) => {
                let requestId = record.requestId.split("-")
                return requestId[1]
            }
        },
        {
            title: t("transfer:bankCodeDeposit"),
            dataIndex: "bankCode",
            key: "bankCode",
            width: '160px',
            filterable: true,
            align: "center"
        },
        {
            title: t("transfer:afAccountNumber"),
            dataIndex: "afAccountNumber",
            key: "afAccountNumber",
            width: '145px',
            align: "center",
            filterable: true,
            sorter: true,
            render: (val: number, record: any) => {
               return record?.afAccountNumber?.length > 10 ? `${record.customerId} - ${record.afAccountNumber}` : ""
            },
        },
        {
            title: t("transfer:accountNumber"),
            dataIndex: "accountNumber",
            key: "accountNumber",
            width: '140px',
            filterable: true,
            sorter: true,
        },
        {
            title: t("transfer:beneficiaryName"),
            dataIndex: "customerName",
            key: "customerName",
            width: '150px',
            filterable: true,
        },
        {
            title: (t("transfer:amount") + " (vnđ)"),
            dataIndex: "amount",
            key: "amount",
            width: '140px',
            align: "right",
            filterable: true,
            sorter: true,
            render: (val: number, record: any) => {
                return <div className="text-right">
                    {formatNumberWithCommas(val)}
                </div>
            },
            renderFilter: ({ column, confirm, ref }: any) => (
                <FilterInput column={column} confirm={confirm} ref={ref} type={"number"}
                />
            ),
        },
        {
            title: t("transfer:createdAt"),
            dataIndex: "createdAt",
            key: "createdAt",
            width: '180px',
            align: "center",
            filterable: true,
            sorter: true,
            render: (text: string, record: any) =>
                text ? moment(text).format("HH:mm:ss DD/MM/YYYY") : "",
            renderFilter: ({ column, confirm, ref }: FilterParam) => (
                <FilterDatePicker column={column} confirm={confirm} ref={ref} />
            ),
        },
        {
            title: t("transfer:description"),
            dataIndex: "description",
            key: "description",
            width: '364px',
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
            title: t("transfer:errorCode"),
            dataIndex: "errorCode",
            key: "errorCode",
            width: '133px',
            filterable: true,
            sorter: true,
            render: (val: number, record: any) => {
                const flexConfirm = typeof record.flexConfirm === 'string'
                    ? JSON.parse(record.flexConfirm) : record.flexConfirm;
                return flexConfirm?.P_ERR_CODE;
            },
        },
        {
            title: t("transfer:errorMessage"),
            dataIndex: "errorMessage",
            key: "errorMessage",
            width: '283px',
            filterable: true,
            sorter: true,
            render: (val: number, record: any) => {
                const flexConfirm = typeof record.flexConfirm === 'string'
                    ? JSON.parse(record.flexConfirm) : record.flexConfirm;
                const errorMessage = flexConfirm?.P_ERR_MESSAGE;

                return (
                    <div style={{
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'normal',
                        width: '100%',
                    }}>
                        {errorMessage || ''}
                    </div>
                );
            }
        }
    ]

    const fetchData = async (params: TableParam2BackendQuery) => {
        const data: any = await getErrorAccountingTransferDataTable(params);
        return data;
    }

    const reloadTable = () => {
        if (tableRef) {
            return tableRef.current.reload();
        }
    }

    return (<div>
        <TransferDetail
            isOpen={isOpenDetailForm}
            setOpen={setIsOpenDetailForm}
            id={isOpenDetailForm ? data?.id : null}
        />
        <CreateCreditNote
            isOpen={isOpenCreateNoteForm}
            setOpen={setIsOpenCreateNoteForm}
            id={isOpenCreateNoteForm ? data?.id : null}
            reloadTable={reloadTable}
        />
        <CancelCreditNote
            isOpen={isOpenCancelNoteForm}
            setOpen={setIsOpenCancelNoteForm}
            id={isOpenCancelNoteForm ? data?.id : null}
            reloadTable={reloadTable}
        />
        <GridTable
            ref={tableRef}
            columns={columns}
            fetchData={fetchData}
            addIndexCol={true}
            className="px-6 py-6 border-b-gray-010"
            onRow={(record: any) => ({
                onDoubleClick: () => {
                    setData(null);
                    setData(record);
                    setIsOpenDetailForm(true);
                }, // Mở modal detail khi click vào hàng
            })}
        />
    </div>)
}