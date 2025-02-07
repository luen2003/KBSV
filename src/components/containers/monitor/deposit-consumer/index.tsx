
import { EllipsisText } from "@components/common/EllipsisText";
import { FilterDatePicker, FilterDropdown, GridTable } from "@components/common/Table";
import FilterParam from "@components/common/Table/interface/FilterParam";
import { DepositConsumerLogType } from "@constants/DepositConsumerLogType";
import { getDepositConsumerLogDataTable } from "@services/DepositConsumerLogService";
import { Badge } from "antd";
import moment from "moment";
import { useRef } from "react";
import { useTranslation } from "react-i18next";
import JsonView from 'react18-json-view';
import 'react18-json-view/src/style.css';

export const MonitorDepositConsumer = () => {
    const { t } = useTranslation();
    const tableRef = useRef<any>(null);
    const columns: any[] = [
        {
            title: t("depositConsumer:id"),
            dataIndex: "id",
            key: "id",
            sorter: true,
            filterable: true,
            fixed: "left",
            width: "140px"
        },
        {
            title: t("depositConsumer:isError"),
            dataIndex: "isError",
            key: "isError",
            sorter: true,
            filterable: true,
            fixed: "left",
            width: "60px",
            render: (text: number, record: any) => {
                switch (text) {
                    case 0: return <Badge status="success" />;
                    case 1: return <Badge status="error" />;
                }
            },
            renderFilter: ({ column, confirm, ref }: any) => (
                <FilterDropdown column={column} confirm={confirm} ref={ref} options={[
                    { value: 0, label: t("common:no") },
                    { value: 1, label: t("common:yes") },
                ]}
                />
            ),
        },
        {
            title: t("depositConsumer:type"),
            dataIndex: "type",
            key: "type",
            sorter: true,
            filterable: true,
            fixed: "left",
            width: "100px",
            renderFilter: ({ column, confirm, ref }: any) => (
                <FilterDropdown column={column} confirm={confirm} ref={ref} options={[
                    { value: DepositConsumerLogType.HEALTH_CHECK, label: DepositConsumerLogType.HEALTH_CHECK },
                    { value: DepositConsumerLogType.PROCESS, label: DepositConsumerLogType.PROCESS },
                    { value: DepositConsumerLogType.RETRY, label: DepositConsumerLogType.RETRY },
                ]}
                />
            ),
        },
        {
            title: t("depositConsumer:request"),
            dataIndex: "request",
            key: "request",
            width: "200px",
            render: (val: any, record: any) => {
                return <JsonView src={val} />;
            }
        },
        {
            title: t("depositConsumer:response"),
            dataIndex: "response",
            key: "response",
            width: "100px",
        },

        {
            title: t("depositConsumer:description"),
            dataIndex: "description",
            key: "description",
            filterable: true,
            fixed: "left",
            width: "200px",
            render: (text: string, record: any) => {
                return <EllipsisText src={text} />
            }
        },
        {
            title: t("depositConsumer:createdAt"),
            dataIndex: "createdAt",
            key: "createdAt",
            sorter: true,
            filterable: true,
            width: "150px",
            render: (text: string, record: any) =>
                text ? moment(text).format("YYYY-MM-DD HH:mm:ss") : "",
            renderFilter: ({ column, confirm, ref }: FilterParam) => (
                <FilterDatePicker column={column} confirm={confirm} ref={ref} />
            )
        }
    ];

    const fetchData = async (params: any) => {
        if (!params.sortField) {
            params.sortField = "createdAt";  // default sort field
            params.sortOrder = "desc"; // default sort order
        }
        const data: any = await getDepositConsumerLogDataTable(params);
        return data;
    };

    return (<div>
        <div className="px-4 py-2 uppercase text-base border border-b-gray-010">
            {t("menu:monitor:depositConsumer")}
        </div>
        <GridTable
            ref={tableRef}
            columns={columns}
            fetchData={fetchData}
            addIndexCol={true}
        />
    </div>)
}