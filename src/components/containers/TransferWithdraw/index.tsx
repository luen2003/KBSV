import { FilterDatePicker, FilterDropdown, FilterInput, GridTable } from "@components/common/Table"
import FilterParam from "@components/common/Table/interface/FilterParam";
import moment from "moment";
import { useEffect, useRef, useState } from "react";
import { Button, Tag, Spin } from "antd";
import _ from "lodash";
import { useTranslation } from "react-i18next";
import "antd/dist/reset.css";
import { getWithdrawTransferDataTable } from "@services/TransferService";
import { WithdrawTransferDetail } from "./detail";
import { Eye } from "iconsax-react";
import { formatNumberWithCommas } from "@helpers/utils";
import { TransferStatus } from "@constants/TransferStatus";

export const WithdrawTransferIndex = () => {
    const { t } = useTranslation();
    const tableRef: any = useRef(null);
    const [WithdrawTransfers, setWithdrawTransfers] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isOpenCreateForm, setIsOpenCreateForm] = useState(false);
    const [isOpenDeleteForm, setIsOpenDeleteForm] = useState(false);
    const [isOpenDetailForm, setIsOpenDetailForm] = useState(false);
    const [selectedWithdrawTransfer, setWithdrawTransfer] = useState<any>(null);

    const initMasterData = async () => {
        try {

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
            title: t("transfer:action"),
            dataIndex: 'action',
            key: "action",
            fixed: "left",
            width: '50px',
            render: (text: string, record: any) => {
                return (<>
                    <Button style={{ padding: 4 }} onClick={() => {
                        setWithdrawTransfer(record);
                        setIsOpenDetailForm(true);
                    }} type="text">
                        <Eye size={20} className="text-color-grey" />
                    </Button>
                </>
                )
            }
        },
        {
            title: t("transfer:txNumber"),
            dataIndex: "txNumber",
            key: "txNumber",
            width: '135px',
            filterable: true,
            sorter: true,
            fixed: true,
            render: (text: string, record: any) => _.get(record, "txNumber"),
        },
        {
            title: t("transfer:transferDate"),
            dataIndex: "transferDate",
            key: "transferDate",
            width: '155px',
            filterable: true,
            sorter: true,
            render: (text: string, record: any) =>
                text ? moment(text).format("YYYY-MM-DD HH:mm:ss") : "",
            renderFilter: ({ column, confirm, ref }: FilterParam) => (
                <FilterDatePicker column={column} confirm={confirm} ref={ref} />
            ),
        },
        {
            title: t("transfer:batchId"),
            dataIndex: "requestId",        // ### Temporary set = requestId
            key: "requestId",
            width: '150px',
            filterable: true,
            sorter: true,
            render: (text: string, record: any) => _.get(record, "requestId"),
        },
        {
            title: t("transfer:flexTransferId"),
            dataIndex: "requestId",       // ### Temporary set = requestId
            key: "requestId",
            width: '150px',
            filterable: true,
            sorter: true,
            render: (text: string, record: any) => _.get(record, "requestId"),
        },
        {
            title: t("transfer:bankTime"),
            dataIndex: "bankTransTime",
            key: "bankTransTime",
            width: '145px',
            filterable: true,
            sorter: true,
            render: (text: string, record: any) =>
                text ? moment(text).format("YYYY-MM-DD HH:mm:ss") : "",
            renderFilter: ({ column, confirm, ref }: FilterParam) => (
                <FilterDatePicker column={column} confirm={confirm} ref={ref} />
            ),
        },
        {
            title: t("transfer:amount"),
            dataIndex: "amount",
            key: "amount",
            align: "right",
            width: '110px',
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
            title: t("transfer:status"),
            dataIndex: "transferStatus",
            key: "transferStatus",
            width: '130px',
            filterable: true,
            sorter: true,
            render: (val: string, record: any) => {
                switch (val) {
                    case TransferStatus.SUCCESS:
                        return <span style={{ color: "green", marginRight: '5px' }}>{t("transfer:transferStatus:success")}</span>
                    case TransferStatus.WAITING:
                        return <span style={{ color: "orange", marginRight: '5px' }}>{t("transfer:transferStatus:waiting")}</span>
                    default:
                        return <span style={{ color: "red", marginRight: '5px' }}>{t("transfer:transferStatus:fail")}</span>
                }
            },
            renderFilter: ({ column, confirm, ref }: any) => (
                <FilterDropdown column={column} confirm={confirm} ref={ref} options={[
                    { value: TransferStatus.SUCCESS, label: <Tag color="green">{t("transfer:transferStatus:success")}</Tag> },
                    { value: TransferStatus.FAIL, label: <Tag color="red">{t("transfer:transferStatus:fail")}</Tag> },
                ]}
                />
            ),
        },
        {
            title: t("transfer:bankErrorCode"),
            dataIndex: "bankErrorCode",
            key: "bankErrorCode",
            align: "center",
            width: '110px',
            filterable: true,
            sorter: true,
        },
        {
            title: t("transfer:bankErrorDes"),
            dataIndex: "bankErrorDes",
            key: "bankErrorDes",
            width: '400px',
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
            title: t("transfer:flexConfirm"),
            dataIndex: "flexConfirm",
            key: "flexConfirm",
            width: '280px',
            filterable: true,
            sorter: true,
        },
        {
            title: t("transfer:bankCode"),
            dataIndex: "bankCode",
            key: "bankCode",
            width: '120px',
            align: "center",
            filterable: true,
            sorter: true,
        },
        {
            title: t("transfer:nodeName"), // Node name
            dataIndex: "nodeName",
            key: "nodeName",
            width: '135px',
            align: "center",
            filterable: true,
            sorter: true,
            render: (val: string, record: any) => {
                if (record?.bankCode) { return "GW - " + record?.bankCode }
            },
        },
    ]

    const fetchData = async (params: any) => {
        const data: any = await getWithdrawTransferDataTable(params);
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
            <WithdrawTransferDetail
                isOpen={isOpenDetailForm}
                setOpen={setIsOpenDetailForm}
                id={isOpenDetailForm ? selectedWithdrawTransfer?.id : null}
            />

            <div className="px-4 py-3 border border-b-gray-010">
                <GridTable
                    ref={tableRef}
                    columns={columns}
                    fetchData={fetchData}
                    addIndexCol={true}
                    onRow={(record: any) => ({
                        onDoubleClick: () => {
                            setWithdrawTransfer(record);
                            setIsOpenDetailForm(true);
                        }, // Mở modal detail khi click vào hàng
                    })}
                />
            </div>
        </div>
    )
}