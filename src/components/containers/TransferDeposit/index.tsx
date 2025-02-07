
import { FilterDatePicker, FilterDropdown, FilterInput, GridTable } from "@components/common/Table";
import FilterParam from "@components/common/Table/interface/FilterParam";
import { TransferStatus } from "@constants/TransferStatus";
import { getTransferDepositDataTable } from "@services/TransferService";
import { Button, Col, Row, Spin, Tag } from "antd";
import moment from "moment";
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next"
import { TransferDepositDetail } from "./detail";
import { Eye } from "iconsax-react";
import { formatNumberWithCommas } from "@helpers/utils";
import { filter } from "lodash";
import { getBankMaster } from "@services/BankService";

export const TransferDeposit = () => {
    const { t } = useTranslation();
    const [isLoading, setIsLoading] = useState(true);
    const tableRef = useRef<any>(null);
    const [isOpenDetailForm, setIsOpenDetailForm] = useState(false);
    const [data, setData] = useState<any>(null);
    const [banks, setBanks] = useState<any[]>([]);

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
            dataIndex: 'action',
            key: "action",
            fixed: "left",
            width: '50px',
            render: (text: string, record: any) => {
                return (<>
                    {/* View */}
                    <Button style={{ padding: 4 }} onClick={() => {
                        setData(null);
                        setData(record);
                        setIsOpenDetailForm(true);
                    }} type="text">
                        <Eye size={20} className="text-color-grey" />
                    </Button>
                </>
                )
            }
        },
        {
            title: t("transfer:refNo"),
            dataIndex: "uuid",
            key: "uuid",
            filterable: true,
            width: '170px',
            sorter: true,
        },
        {
            title: t("transfer:txDate"),
            dataIndex: "bankTransTime",
            key: "bankTransTime",
            sorter: true,
            filterable: true,
            width: '170px',
            align: "center",
            render: (text: any, record: any) => {
                return text ? moment(text).format("HH:mm:ss DD/MM/YYYY") : "";
            },
            renderFilter: ({ column, confirm, ref }: FilterParam) => (
                <FilterDatePicker column={column} confirm={confirm} ref={ref} />
            ),
        },
        {
            title: t("transfer:accountNumber"),
            dataIndex: "accountNumber",
            key: "accountNumber",
            width: '140px',
            align: "center",
            filterable: true,
            sorter: true,
        },
        {
            title: t("transfer:afAccountNumber"),
            dataIndex: "afAccountNumber",
            key: "afAccountNumber",
            width: '145px',
            align: "center",
            filterable: true,
            sorter: true,
        },

        {
            title: t("transfer:bankCode"),
            dataIndex: "bankCode",
            key: "bankCode",
            width: '150px',
            align: "center",
            filterable: true,
            sorter: true,
            renderFilter: ({ column, confirm, ref }: any) => {
                const options = (banks || []).map(bank => (
                    { value: bank.bankCode, label: bank.bankCode }
                ));
                return (
                    <FilterDropdown column={column} confirm={confirm} ref={ref} options={options}
                    />
                )
            },
        },
        {
            title: t("transfer:amount"),
            dataIndex: "amount",
            key: "amount",
            width: '120px',
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
            title: t("transfer:status"),
            dataIndex: "transferStatus",
            key: "transferStatus",
            filterable: true,
            sorter: true,
            width: '130px',
            render: (val: string, record: any) => {
                switch (val) {
                    case TransferStatus.SUCCESS:
                        return <span style={{ color: "green", marginRight: '5px' }}>{t("transfer:transferStatus:success")}</span>
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
            title: t("transfer:description"),
            dataIndex: "description",
            key: "description",
            width: '750px',
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
        }
    ]

    const fetchData = async (params: any) => {
        const data: any = await getTransferDepositDataTable(params);
        return data;
    }

    const reloadTable = () => {
        if (tableRef) {
            return tableRef.current.reload();
        }
    }

    if (isLoading) { return <Spin /> }

    return (<>
        <div className="px-4 py-3  border border-b-gray-010">
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
                    }, // Mở modal detail khi click vào hàng
                })}
            />
        </div>

        <TransferDepositDetail
            isOpen={isOpenDetailForm}
            setOpen={setIsOpenDetailForm}
            id={isOpenDetailForm ? data?.id : null}
        />
    </>)
}