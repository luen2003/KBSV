import {
  FilterDatePicker,
  FilterDropdown,
  FilterInput,
  GridTable
} from "@components/common/Table";
import FilterParam from "@components/common/Table/interface/FilterParam";
import { fetchTransferLogs } from "@services/TransferLog";
import moment from "moment";
import { useTranslation } from "react-i18next";
import { type Data } from "@types";
import "antd/dist/reset.css";
import { EllipsisText } from "@components/common/EllipsisText";
import JsonView from "react18-json-view";
import { TransferType } from "@constants/TransferType";

export const TransferLog = () => {
  const { t } = useTranslation();

  const columns: any[] = [
    {
      title: t("monitor:transferLog:transferId"),
      dataIndex: "transferId",
      key: "transferId",
      sorter: true,
      filterable: true,
      width: "80px",
      align: "center",
      renderFilter: ({ column, confirm, ref }: any) => (
        <FilterInput column={column} confirm={confirm} ref={ref} type={"number"} />
      ),
    },
    {
      title: t("monitor:transferLog:txNum"),
      dataIndex: "txNum",
      key: "txNum",
      sorter: true,
      filterable: true,
      width: "130px",
      align: "center",
    },
    {
      title: t("monitor:transferLog:transferType"),
      dataIndex: "transferType",
      key: "transferType",
      width: "150px",
      sorter: true,
      filterable: true,
      render: (text: string, record: any) => {
        switch (record.transferType) {
          case TransferType.DEPOSIT: return t("transfer:deposit");
          case TransferType.WITHDRAW: return t("transfer:withdraw");
        }
      },
      renderFilter: ({ column, confirm, ref }: any) => (
        <FilterDropdown column={column} confirm={confirm} ref={ref} options={[
          { value: TransferType.DEPOSIT, label: t("transfer:deposit") },
          { value: TransferType.WITHDRAW, label: t("transfer:withdraw") },
        ]}
        />
      ),
    },
    {
      title: t("monitor:transferLog:bankRequestId"),
      dataIndex: "bankRequestId",
      key: "bankRequestId",
      width: "250px",
      sorter: true,
      filterable: true,
    },
    {
      title: t("monitor:transferLog:batchId"),
      dataIndex: "batchId",
      key: "batchId",
      width: "200px",
      sorter: true,
      filterable: true,
    },
    {
      title: t("monitor:transferLog:transferStatus"),
      dataIndex: "transferStatus",
      key: "transferStatus",
      width: "200px",
      sorter: true,
      filterable: true,
      render: (val: string, record: any) => {
        const statusText = (key: string, color: string) => (
          <div>
            <span style={{ color: color, marginRight: '5px', fontSize: '20px' }}>•</span>
            {t(key)}
          </div>
        );
        const successStatus = [
          'IN_PROGRESS',
          'PRODUCER_PROCESSED',
          "SUCCESS",
          'VALID_SUB_ACCOUNT',
          'CORE_PROCESSED',
          'COMPLETE_TRANS_ERROR',
          'BANK_GATEWAY_PROCESS',
          'COMPLETE_TRANSFER_REQUEST_SUCCESSFULLY',
          'REJECT_TRANSFER_REQUEST_SUCCESSFULLY',
          'CALL_TRANSFER_EXTERNAL_CITAD',
          'CALL_TRANSFER_EXTERNAL_NAPAS',
          'CALL_TRANSFER_INTERNAL',
          'CALL_TO_GET_BANK_ACCOUNT',
          'CALL_GET_DATA_BANKLIST_NAPAS',
          'CHECK_BLACKLISTED_ACCOUNT',
          'CHECK_INTERNAL_TRANSFER_ACCOUNT',
          'GET_INFO_BENEFICIARY_ACCOUNT_NUMBER',
          'CALL_REJECT_TRANSFER_REQUEST',
        ]
        const failStatus = [
          'CORE_ERROR',
          'TRANSFER_NOT_FOUND',
          'INVALID_DEPOSIT_AMOUNT',
          'INVALID_SUB_ACCOUNT',
          'UNKNOWN_ERROR',
          'PRODUCER_ERROR',
          'BANK_IS_NOT_SUPPORTED',
          'ERROR_GET_BANK_ACCOUNT',
          'NAME_MISMATCH',
          'PAYGATE_ERROR',
          'REJECT_TRANSFER_REQUEST',
          'AMOUNT_NOT_IN_RANGE',
          'AMOUNT_NAPAS_OUT_OF_RANGE',
          'ERROR_BLACKLISTED_ACCOUNT',
          'ERROR_INTERNAL_TRANSFER_ACCOUNT',
          'ERROR_GET_DATA_BANKLIST_NAPAS',
          'ERROR_BANK_NAPAS',
          'ERROR_GET_INFO_BENEFICIARY_ACCOUNT_NUMBER',
        ]
        const pendingStatus = [
          'PENDING_TRANSFER_REQUEST',
          'WAITING_FOR_UPDATE_PENDING_TRANSFER',
          'WAITING_FOR_DELETE_PENDING_TRANSFER',
          'WAITING_FOR_UPDATE_REJECT_TRANSFER',
          'WAITING_FOR_DELETE_REJECT_TRANSFER',
        ]
        if (successStatus.includes(val)) {
          return statusText(val, 'green');
        } else if (failStatus.includes(val)) {
          return statusText(val, 'red');
        } else if (pendingStatus.includes(val)) {
          return statusText(val, 'orange');
        } else {
          return val;
        }
      },
    },
    {
      title: t("monitor:transferLog:description"),
      dataIndex: "description",
      key: "description",
      sorter: true,
      filterable: true,
      width: "300px",
      render: (text: string, record: any) => {
        return <EllipsisText src={text} />
      }
    },
    {
      title: t("monitor:transferLog:request"),
      dataIndex: "request",
      key: "request",
      width: "250px",
      render: (val: any, record: any) => {
        return <JsonView src={val} collapsed={true} />;
      }
    },
    {
      title: t("monitor:transferLog:response"),
      dataIndex: "response",
      key: "response",
      width: "250px",
      render: (val: any, record: any) => {
        return <JsonView src={val} collapsed={true} />;
      }
    },
    {
      title: t("monitor:transferLog:createdBy"),
      dataIndex: "user",
      key: "user",
      width: "150px",
      sorter: true,
      filterable: true,
    },
    {
      title: t("monitor:transferLog:createdAt"),
      dataIndex: "createdAt",
      key: "createdAt",
      width: "200px",
      sorter: true,
      filterable: true,
      render: (text: string, record: any) =>
        text ? moment(text).format("YYYY-MM-DD HH:mm:ss.SSS") : "",
      renderFilter: ({ column, confirm, ref }: FilterParam) => (
        <FilterDatePicker column={column} confirm={confirm} ref={ref} />
      )
    }
  ];

  const fetchData = async (params: Data.IQueryParams) => {
    const data: any = await fetchTransferLogs(params);
    return data;
  };

  return (
    <div className="container mx-auto">
      <div className="px-4 py-2 uppercase text-base border border-b-gray-010">
        {t("menu:monitor:transferLog")}
      </div>
      <GridTable
        columns={columns}
        fetchData={fetchData}
        addIndexCol={true}
      />
    </div>
  );
};
