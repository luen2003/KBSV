import { FilterDatePicker, FilterDropdown, FilterInput, GridTable } from "@components/common/Table";
import FilterParam from "@components/common/Table/interface/FilterParam";
import { RequestOrderStatus } from "@constants/RequestOrderStatus";
import { WithdrawStatus } from "@constants/WithdrawStatus";
import { getUncompletedWithdrawTransferDataTable } from "@services/TransferService";
import { Button, Col, Row, Tag } from "antd";
import moment from "moment";
import { useRef, useState } from "react";
import { useTranslation } from "react-i18next"
import { UncompletedWithdrawDetail } from "./detail";
import { formatNumberWithCommas } from "@helpers/utils";
import { UncompletedWithdrawUpdate } from "./update";
import { TableParam2BackendQuery } from "@components/common/Table/interface/TableParam2BackendQuery";
import { UncompletedWithdrawDelete } from "./delete";
import { Check, Trash2 } from "lucide-react";
import { Eye } from "iconsax-react";
import { useAppSelector } from "@hooks/useStore";

export const UncompletedWithdraw = () => {
    const permissions = useAppSelector(state => state.common.permissions);
    const { t } = useTranslation();
    const tableRef = useRef<any>(null);
    const [isOpenDetailForm, setIsOpenDetailForm] = useState(false);
    const [isOpenUpdateForm, setIsOpenUpdateForm] = useState(false);
    const [isOpenDeleteForm, setIsOpenDeleteForm] = useState(false);
    const [data, setData] = useState<any>(null);

    const columns: any[] = [
        {
            title: "",
            dataIndex: 'action',
            key: "action",
            fixed: "left",
            width: '105px',
            align: 'right',
            render: (text: string, record: any) => {
                let isAllowApprove = false;
                let isAllowDelete = false;
                if (
                    record?.transferStatus != WithdrawStatus.WAITING_FOR_DELETE_PENDING_TRANSFER &&
                    record?.transferStatus != WithdrawStatus.WAITING_FOR_UPDATE_PENDING_TRANSFER &&
                    permissions?.includes("CREATE")
                ) {
                    isAllowApprove = true;
                }
                if (
                    record?.transferStatus != WithdrawStatus.WAITING_FOR_DELETE_PENDING_TRANSFER &&
                    record?.transferStatus != WithdrawStatus.WAITING_FOR_UPDATE_PENDING_TRANSFER &&
                    permissions?.includes("DELETE")
                ) {
                    isAllowDelete = true;
                }
                return (<Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }} style={{ textAlign: "right" }}>
                    {isAllowApprove ? (<Col span={4}>
                        <Button style={{ padding: 4 }} onClick={() => {
                            setData(null);
                            setData(record);
                            setIsOpenUpdateForm(true);
                        }} type="text">
                            <Check size={20} className="text-color-green" />
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

                    {isAllowDelete ? (<Col span={4}>
                        <Button style={{ padding: 4 }} onClick={() => {
                            setData(null);
                            setData(record);
                            setIsOpenDeleteForm(true);
                        }} type="text">
                            <Trash2 strokeWidth={1.5} size={20} className="text-color-grey" />
                        </Button>
                    </Col>
                    ) : <Col span={4}></Col>}

                </Row>
                )
            }
        },
        {
            title: t("transfer:status"),
            dataIndex: "transferStatus",
            key: "transferStatus",
            width: '170px',
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
                    case WithdrawStatus.PENDING_TRANSFER_REQUEST:
                        return statusText("withdrawStatus:pendingTransferRequest", 'green');
                    case WithdrawStatus.WAITING_FOR_UPDATE_PENDING_TRANSFER:
                        return statusText("withdrawStatus:waitingForUpdatePendingTransfer", 'orange');
                    case WithdrawStatus.WAITING_FOR_DELETE_PENDING_TRANSFER:
                        return statusText("withdrawStatus:waitingForDeletePendingTransfer", 'red');
                }
            },
            renderFilter: ({ column, confirm, ref }: any) => (
                <FilterDropdown column={column} confirm={confirm} ref={ref} options={[
                    { value: WithdrawStatus.PENDING_TRANSFER_REQUEST, label: <Tag color="green">{t("withdrawStatus:pendingTransferRequest")}</Tag> },
                    { value: WithdrawStatus.WAITING_FOR_UPDATE_PENDING_TRANSFER, label: <Tag color="orange">{t("withdrawStatus:waitingForUpdatePendingTransfer")}</Tag> },
                    { value: WithdrawStatus.WAITING_FOR_DELETE_PENDING_TRANSFER, label: <Tag color="red">{t("withdrawStatus:waitingForDeletePendingTransfer")}</Tag> },
                ]}
                />
            ),
        },
        {
            title: t("transfer:txDate"),
            dataIndex: "txDate",
            key: "txDate",
            width: '165px',
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
            title: t("transfer:txNumber"),
            dataIndex: "txNumber",
            key: "txNumber",
            width: '150px',
            filterable: true,
            sorter: true,
        },
        {
            title: t("transfer:requestId"),
            dataIndex: "requestId",
            key: "requestId",
            width: '160px',
            filterable: true,
            sorter: true,
        },
        {
            title: t("transfer:afAccountNumber"),
            dataIndex: "afAccountNumber",
            key: "afAccountNumber",
            width: '150px',
            filterable: true,
            sorter: true,
            render: (text: any, record: any) => {
                return record.afAccountNumber ? `${record.customerId} - ${record.afAccountNumber}` : '';
            },
        },
        {
            title: t("transfer:accountNumber"),
            dataIndex: "accountNumber",
            key: "accountNumber",
            width: '150px',
            filterable: true,
            sorter: true,
        },
        {
            title: t("transfer:beneficiaryName"),
            dataIndex: "beneficiaryName",
            key: "beneficiaryName",
            width: '200px',
            filterable: true,
            sorter: true,
        },
        {
            title: t("transfer:transferAmount"),
            dataIndex: "amount",
            key: "amount",
            width: '150px',
            filterable: true,
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
            title: t("transfer:beneficiaryAccountNumber"),
            dataIndex: "beneficiaryAccountNumber",
            key: "beneficiaryAccountNumber",
            width: '193px',
            filterable: true,
            align: "right",
        },
        {
            title: t("transfer:beneficiaryBank"),
            dataIndex: "beneficiaryBank",
            key: "beneficiaryBank.noCodeShortName",
            width: '320px',
            filterable: true,
            render: (val: number, record: any) => {
                return record.beneficiaryBank?.codeShortName
            },
        },
        {
            title: t("transfer:beneficiaryBankCode"),
            dataIndex: "beneficiaryBankCode",
            key: "beneficiaryBankCode",
            width: '140px',
            filterable: true
        },
        {
            title: t("transfer:beneficiaryBankBranch"),
            dataIndex: "beneficiaryBankBranch",
            key: "beneficiaryBankBranch",
            width: '260px',
            filterable: true,
            sorter: true,
        },
        {
            title: t("transfer:createdAt"),
            dataIndex: "createdAt",
            key: "createdAt",
            width: '200px',
            filterable: true,
            sorter: true,
            render: (text: string, record: any) =>
                text ? moment(text).format("YYYY-MM-DD HH:mm:ss") : "",
            renderFilter: ({ column, confirm, ref }: FilterParam) => (
                <FilterDatePicker column={column} confirm={confirm} ref={ref} />
            ),
        },
        {
            title: t("transfer:txDesc"),
            dataIndex: "txDesc",
            key: "txDesc",
            width: '200px',
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
            title: t("transfer:feeType"),
            dataIndex: "feeType",
            key: "feeType",
            width: '150px',
            filterable: true,
            sorter: true,
            render: (val: number, record: any) => {
                return t(`transfer:feeTypeValue:${val}`) != "feeTypeValue.null" ? t(`transfer:feeTypeValue:${val}`) : val;
            },
        },
        {
            title: t("transfer:fee"),
            dataIndex: "fee",
            key: "fee",
            width: '150px',
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
    ]

    const fetchData = async (params: TableParam2BackendQuery) => {
        const data: any = await getUncompletedWithdrawTransferDataTable(params);
        return data;
    }

    const reloadTable = () => {
        if (tableRef) {
            return tableRef.current.reload();
        }
    }
    return (<>
        <UncompletedWithdrawUpdate
            isOpen={isOpenUpdateForm}
            setOpen={setIsOpenUpdateForm}
            id={isOpenUpdateForm ? data?.id : null}
            reloadTable={reloadTable}
        />
        <UncompletedWithdrawDelete
            isOpen={isOpenDeleteForm}
            setOpen={setIsOpenDeleteForm}
            id={isOpenDeleteForm ? data?.id : null}
            reloadTable={reloadTable}
        />
        <UncompletedWithdrawDetail
            isOpen={isOpenDetailForm}
            setOpen={setIsOpenDetailForm}
            id={isOpenDetailForm ? data?.id : null}
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
    </>)
}