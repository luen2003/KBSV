import { FilterDatePicker, FilterDropdown, FilterInput, GridTable } from "@components/common/Table";
import { Button, Col, Row, Spin, Tag } from "antd";
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next"
import { WithdrawRefusedByBankDetail } from "./detail";
import { Eye } from "iconsax-react";
import { getWithdrawRefusedByBankDataTable } from "@services/withdraw-refused-by-bank.service";
import { TableParam2BackendQuery } from "@components/common/Table/interface/TableParam2BackendQuery";
import moment from "moment";
import FilterParam from "@components/common/Table/interface/FilterParam";
import { useLocation } from "react-router-dom";
import permissionService from "@services/permission.service";
import { Check, Trash2 } from "lucide-react";
import { ApproveBlacklistStatus } from "@constants/ApproveBlacklistStatus";
import { WithdrawRefusedByBankUpdate } from "./update";
import { WithdrawRefusedByBankDelete } from "./delete";

import { formatNumberWithCommas } from "@helpers/utils";
import { WithDrawRejectByBankStatus } from "@constants/WithDrawRejectByBankStatus";

export const WithdrawRefusedByBankIndex = () => {
    const { t } = useTranslation();
    const [isOpenDetailForm, setIsOpenDetailForm] = useState(false);
    const [isOpenDeleteForm, setIsOpenDeleteForm] = useState(false);
    const [isOpenUpdateForm, setIsOpenUpdateForm] = useState(false);
    const [data, setData] = useState<any>(null);
    const [permissions, setPermissions] = useState<string[]>([]);
    // var permissions:string[] = []
    const state = useLocation();

    const initPermissionsData = async () => {
        const menu = state.state?.menu;
        var permissionData = await permissionService.getByMenuAndUser(menu.id);
        setPermissions(permissionData.map(p => p.code));
    };
    useEffect(() => {
        initPermissionsData();
    }, [state.state?.menu]);


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
                        {record.transferStatus == WithDrawRejectByBankStatus.REJECT_TRANSFER_REQUEST && (
                            <Col style={{ visibility: permissions.includes('APPROVE') ? "visible" : "hidden" }} span={4}>
                                <Button style={{ padding: 5 }} onClick={() => {
                                    setData(null);
                                    setData(record);
                                    setIsOpenUpdateForm(true);
                                }} type="text">
                                    <Check size={20} style={{ color: "green" }} />
                                </Button>
                            </Col>
                        )}
                        <Col span={4} style={{ visibility: permissions.includes("VIEW") ? "visible" : "hidden" }}>
                            {permissions.includes("VIEW") && <Button style={{ padding: 4 }} onClick={() => {
                                setData(record);
                                setIsOpenDetailForm(true);
                            }} type="text">
                                <Eye
                                    size="20"
                                    className="text-color-grey"
                                />
                            </Button>}
                        </Col>

                        {record.transferStatus == WithDrawRejectByBankStatus.REJECT_TRANSFER_REQUEST && (
                            <Col style={{ visibility: permissions.includes('DELETE') ? "visible" : "hidden" }} span={4}>
                                <Button style={{ padding: 4 }} onClick={() => {
                                    setData(null);
                                    setData(record);
                                    setIsOpenDeleteForm(true);
                                }} type="text">
                                    <Trash2
                                        size="20"
                                        className="text-color-grey"
                                        strokeWidth={1.5}
                                    />
                                </Button>
                            </Col>)}
                    </Row>
                )
            }
        },
        {
            title: t("transfer:transferStatus:title"),
            dataIndex: "transferStatus",
            key: "transferStatus",
            width: '160px',
            filterable: true,
            sorter: true,
            render: (val: string, record: any) => {
                return (
                    <div>
                        {t("transfer:transferStatus:" + val)}
                    </div>
                )
            },
            renderFilter: ({ column, confirm, ref }: any) => {
                return (
                    <FilterDropdown column={column} confirm={confirm} ref={ref} options={[
                        { value: WithDrawRejectByBankStatus.SUCCESS, label: <Tag color="green">{t("transfer:transferStatus:SUCCESS")}</Tag> },
                        { value: WithDrawRejectByBankStatus.WAITING_FOR_UPDATE_REJECT_TRANSFER, label: <Tag color="orange">{t("transfer:transferStatus:WAITING_FOR_UPDATE_REJECT_TRANSFER")}</Tag> },
                        { value: WithDrawRejectByBankStatus.WAITING_FOR_DELETE_REJECT_TRANSFER, label: <Tag color="red">{t("transfer:transferStatus:WAITING_FOR_DELETE_REJECT_TRANSFER")}</Tag> },
                        { value: WithDrawRejectByBankStatus.REJECT_TRANSFER_REQUEST, label: <Tag color="red">{t("transfer:transferStatus:REJECT_TRANSFER_REQUEST")}</Tag> },
                    ]} />
                )
            },
        },
        {
            title: t("transfer:txDate"),
            dataIndex: "txDate",
            key: "txDate",
            width: '160px',
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
            render: (text: any, record: any) => {
                return record.requestId;
            },
        },
        {
            title: t("transfer:afAccountNumber"),
            dataIndex: "afAccountNumber",
            key: "afAccountNumber",
            width: '160px',
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
            width: '160px',
            filterable: true,
            sorter: true,
        },
        {
            title: t("transfer:beneficiaryName"),
            dataIndex: "beneficiaryName",
            key: "beneficiaryName",
            width: '180px',
            filterable: true,
            sorter: true,
        },
        {
            title: t("transfer:amount"),
            dataIndex: "amount",
            key: "amount",
            width: '150px',
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
            title: t("transfer:beneficiaryAccountNumber"),
            dataIndex: "beneficiaryAccountNumber",
            key: "beneficiaryAccountNumber",
            width: '210px',
            filterable: true,
            sorter: true,
        },
        {
            title: t("transfer:beneficiaryBank"),
            dataIndex: ["beneficiaryBank", "name"],
            key: ["beneficiaryBank", "name"],
            width: '180px',
            filterable: true,
            sorter: true,
        },
        {
            title: t("transfer:beneficiaryBankCode"),
            dataIndex: ["beneficiaryBank", "bankNo"],
            key: ["beneficiaryBank", "bankNo"],
            width: '160px',
            filterable: true,
            sorter: true,
        },
        {
            title: t("transfer:beneficiaryBankBranch"),
            dataIndex: "beneficiaryBankBranch",
            key: "beneficiaryBankBranch",
            width: '180px',
            filterable: true,
            sorter: true,
        },
        {
            title: t("transfer:txDesc"),
            dataIndex: "txDesc",
            key: "txDesc",
            width: '180px',
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
            width: '180px',
            filterable: true,
            sorter: true,
            renderFilter: ({ column, confirm, ref }: any) => (
                <FilterInput column={column} confirm={confirm} ref={ref} type={"number"}
                />
            ),
        },
        {
            title: t("transfer:bankErrorCode"),
            dataIndex: "bankErrorCode",
            key: "bankErrorCode",
            width: '180px',
            filterable: true,
            sorter: true,
        },
        {
            title: t("transfer:bankErrorDes"),
            dataIndex: "bankErrorDes",
            key: "bankErrorDes",
            width: '180px',
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
    ]
    const tableRef = useRef<any>(null);
    const fetchData = async (params: TableParam2BackendQuery) => {
        const data: any = await getWithdrawRefusedByBankDataTable(params);
        return data;
    }
    const reloadTable = () => {
        if (tableRef) {
            return tableRef.current.reload();
        }
    }
    if (!permissions?.length) return <Spin />
    return (<div className="px-6 py-2 text-right">

        <WithdrawRefusedByBankDetail
            isOpen={isOpenDetailForm}
            setOpen={setIsOpenDetailForm}
            id={isOpenDetailForm ? data?.id : null}
        />

        <WithdrawRefusedByBankUpdate
            isOpen={isOpenUpdateForm}
            setOpen={setIsOpenUpdateForm}
            id={isOpenUpdateForm ? data?.id : null}
            reloadTable={reloadTable}
        />

        <WithdrawRefusedByBankDelete
            isOpen={isOpenDeleteForm}
            setOpen={setIsOpenDeleteForm}
            id={isOpenDeleteForm ? data?.id : null}
            reloadTable={reloadTable}
        />
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
        />
    </div>)
}