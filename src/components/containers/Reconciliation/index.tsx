import { FilterDatePicker, FilterDropdown, GridTable } from "@components/common/Table"
import FilterParam from "@components/common/Table/interface/FilterParam";
import moment from "moment";
import { useEffect, useRef, useState } from "react";
import { Button, Spin, DatePicker, Select, Row, Col, Form } from "antd";
import { DownloadOutlined, SearchOutlined } from "@ant-design/icons";
import _ from "lodash";
import { useTranslation } from "react-i18next";
import "antd/dist/reset.css";
import { generateReconciliation, getReconciliationDataTable, downloadReconciliation, getDetailReconciliation } from "@services/Reconciliation";
import { getBankConfigMaster, getBankMaster } from "@services/BankService";
import { format } from 'date-fns';
import toast from "react-hot-toast";
import { useAppSelector } from "@hooks/useStore";

export const ReconciliationIndex = () => {
    const permissions = useAppSelector(state => state.common.permissions);
    const { t } = useTranslation();
    const tableRef: any = useRef(null);
    const [isLoading, setIsLoading] = useState(true);
    const [banksOption, setBanksOption] = useState<any>([]);
    const [filterBank, setFilterBank] = useState<any>(null);
    const [filterType, setFilterType] = useState<any>(null);
    const [filterDate, setFilterDate] = useState<any>(null);

    const initMasterData = async () => {
        try {
            const banksMaster: any = await getBankConfigMaster({});
            setBanksOption(banksMaster.items ? (banksMaster.items).map((bank: { id: number; noCodeShortName: string; bank: any }) => (
                { value: bank.bank.id, label: `${bank.bank.bankNo} - ${bank.bank.bankCode} - ${bank.bank.name}` }
            )) : []);
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
            title: t("reconciliation:action"),
            dataIndex: 'action',
            key: "action",
            fixed: "left",
            width: '50px',
            render: (text: string, record: any) => {
                // Hàm xử lý download
                const handleDownload = async (id: number) => {
                    try {
                        const detail = await getDetailReconciliation(id);
                        const response = await downloadReconciliation(id);
                        if (response) {
                            const url = window.URL.createObjectURL(response);
                            let elementA = document.createElement('a');
                            elementA.href = url;
                            elementA.setAttribute('download', `${detail?.value?.fileName}.xlsx`);
                            document.body.appendChild(elementA);
                            elementA.click();
                            elementA?.parentNode?.removeChild(elementA);
                            elementA.remove();
                        }
                    } catch (error: any) {
                        // Báo lỗi nếu API trả về lỗi
                        toast.error(`${t("common:download:fail")}: ${error.message}`);
                    }
                };
                return (
                    <>
                        <Button onClick={() => handleDownload(parseInt(record.id.toString()))} type="text">
                            <DownloadOutlined />
                        </Button>
                    </>
                );
            }
        },
        {
            title: t("reconciliation:createdAt"),
            dataIndex: "createdAt",
            key: "createdAt",
            width: '200px',
            sorter: true,
            filterable: true,
            fixed: true,
            render: (text: string, record: any) =>
                text ? moment(text).format("YYYY-MM-DD HH:mm:ss") : "",
            renderFilter: ({ column, confirm, ref }: FilterParam) => (
                <FilterDatePicker column={column} confirm={confirm} ref={ref} />
            ),
        },
        {
            title: t("reconciliation:receivedAt"),
            dataIndex: "receivedAt",
            key: "receivedAt",
            width: '200px',
            sorter: true,
            filterable: true,
            render: (text: string, record: any) =>
                text ? moment(text).format("YYYY-MM-DD HH:mm:ss") : "",
            renderFilter: ({ column, confirm, ref }: FilterParam) => (
                <FilterDatePicker column={column} confirm={confirm} ref={ref} />
            ),
        },
        {
            title: t("reconciliation:fileName"),
            dataIndex: "fileName",
            key: "fileName",
            sorter: true,
            filterable: true,
            width: '500px',
            render: (text: string, record: any) => _.get(record, "fileName"),
            renderFilter: ({ column, confirm, ref }: any) => (
                <FilterDropdown column={column} confirm={confirm} ref={ref} options={[
                ]}
                />
            ),
        },
    ]

    const fetchData = async (body: any) => {
        const data: any = await getReconciliationDataTable(body);
        return data;
    }

    const reloadTable = () => {
        if (tableRef && tableRef.current) {
            return tableRef.current.reload();
        }
    }
    if (isLoading) return <Spin />
    return (
        <div className="container mx-auto" style={{ padding: 25 }}>
            {
                permissions?.includes("CREATE") ?
                    <div>
                        <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }} className="mt-4">
                            <Col style={{ width: "auto" }}>
                                <Form.Item
                                    label={t("reconciliation:filterInput:bank")}
                                    name="bank"
                                    rules={[{ required: true, message: t("form:validate:required") }]}
                                >
                                    <Select
                                        style={{ width: 230, marginLeft: 15 }}
                                        options={banksOption}
                                        showSearch
                                        placeholder="Chọn ngân hàng"
                                        onChange={(value: any) => setFilterBank(value)}
                                        filterOption={(input, option) => {
                                            const label = option?.label;
                                            if (typeof label === 'string') {
                                                return label.toLowerCase().includes(input.toLowerCase());
                                            }
                                            return false;
                                        }}
                                    />
                                </Form.Item>
                            </Col>

                            <Col style={{ width: "auto" }}>
                                <Form.Item
                                    label={t("reconciliation:filterInput:type:key")}
                                    name="type"
                                    rules={[{ required: true, message: t("form:validate:required") }]}
                                >
                                    <Select
                                        style={{ width: 230, marginLeft: 15 }}
                                        placeholder="Đối soát ngày"
                                        options={[
                                            { value: 'BY_DAY', label: t("reconciliation:filterInput:type:value:date") },
                                            { value: 'BY_MONTH', label: t("reconciliation:filterInput:type:value:month") },
                                        ]}
                                        onChange={(value: any) => {
                                            setFilterType(value)
                                            setFilterDate(null)
                                        }}
                                    />
                                </Form.Item>
                            </Col>

                            <Col style={{ width: "auto" }}>
                                {filterType === "BY_MONTH" ? <div>
                                    <Form.Item
                                        label={t("reconciliation:filterInput:selectMonth")}
                                        name="month"
                                        rules={[{ required: true, message: t("form:validate:required") }]}
                                    >
                                        <DatePicker value={filterDate} format={'MM/YYYY'} style={{ width: 230, marginLeft: 15 }} placeholder="mm/yyyy" picker="month"
                                            onChange={(date: any) => setFilterDate(date)} />
                                    </Form.Item>
                                </div> : <div>
                                    <Form.Item
                                        label={t("reconciliation:filterInput:selectDate")}
                                        name="day"
                                        rules={[{ required: true, message: t("form:validate:required") }]}
                                    >
                                        <DatePicker format={'DD/MM/YYYY'} style={{ width: 230, marginLeft: 15 }} placeholder="dd/mm/yyyy"
                                            onChange={(date: any) => setFilterDate(date)} />
                                    </Form.Item>
                                </div>
                                }
                            </Col>

                            <Col style={{ width: "auto" }}>
                                <div className="w-full px-3">
                                    <Button
                                        type="primary"
                                        className="text-gray-013 bg-color-blue mb-3"
                                        onClick={async () => {
                                            let convertedDate
                                            // Check required fields
                                            if (!filterBank || !filterType || !filterDate) {
                                                toast.error(`${t("common:search:fail")}`);
                                                return;
                                            }
                                            if (filterType === "BY_MONTH") {
                                                convertedDate = format(new Date(filterDate), 'yyyyMM')
                                            } else {
                                                convertedDate = format(new Date(filterDate), 'yyyyMMdd')
                                            }
                                            try {
                                                // Call API
                                                const resultGenerateReconciliation = await generateReconciliation({
                                                    type: filterType,
                                                    bankId: filterBank,
                                                    date: convertedDate
                                                });

                                                // Reload table after successful API call
                                                reloadTable();
                                                console.log("resultGenerateReconciliation: ", resultGenerateReconciliation);
                                                if (!resultGenerateReconciliation.code || resultGenerateReconciliation.code === 0) {
                                                    toast.success(`${t("common:search:success")}`);
                                                }
                                            } catch (error) {
                                                console.error("Error generating reconciliation:", error);
                                                toast.error(`${t("common:search:fail")}`);
                                            }
                                        }}
                                    >
                                        <SearchOutlined width={120} />
                                        {t("button:search")}
                                    </Button>
                                </div>
                            </Col>
                        </Row>

                        <br />
                    </div>
                    : <></>
            }
            <GridTable
                ref={tableRef}
                columns={columns}
                fetchData={fetchData}
                addIndexCol={true}
            />
        </div>
    )
}