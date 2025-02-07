import { FilterDatePicker, FilterDropdown, FilterInput, GridTable } from "@components/common/Table"
import FilterParam from "@components/common/Table/interface/FilterParam";
import moment from "moment";
import { useRef, useState } from "react";
import { Button, Tag, Spin, Modal } from "antd";
import _ from "lodash";
import { useTranslation } from "react-i18next";
import "antd/dist/reset.css";
import { RequestOrderDetail } from "./detail";
import { getRequestOrderDataTable } from "@services/requestOrder.service";
import { RequestOrderStatus } from "@constants/RequestOrderStatus";
import { RequestOrderApprove } from "./approve";
import { RequestOrderBusinessName } from "@constants/RequestOrderBusinessName";
import { TableParam2BackendQuery } from "@components/common/Table/interface/TableParam2BackendQuery";
import { Check, X } from "lucide-react";
import { Eye } from "iconsax-react";
import { useAppSelector } from "@hooks/useStore";

export const RequestOrder = () => {
  const permissions = useAppSelector(state => state.common.permissions);
  const { t } = useTranslation();
  const tableRef = useRef<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isOpenUpdateForm, setIsOpenUpdateForm] = useState(false);
  const [isOpenDetailForm, setIsOpenDetailForm] = useState(false);
  const [selectedRequestOrder, setRequestOrder] = useState<any>(null);
  const [isApprove, setIsApprove] = useState(false);
  const [isReject, setIsReject] = useState(false);
  const [isView, setIsView] = useState(false);
  const [isOpenApproveForm, setIsOpenApproveForm] = useState(false)

  const columns: any[] = [
    {
      // title: () => <div style={{ textAlign: 'center' }}>{t("requestOrder:action")}</div>,
      dataIndex: 'action',
      key: "action",
      fixed: "left",
      width: '110px',
      render: (text: string, record: any) => {
        return (<>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            {
              permissions?.includes("APPROVE") ?
                <Button style={{ padding: 5 }} onClick={() => {
                  setRequestOrder(record);
                  setIsApprove(true)
                  setIsReject(false)
                  setIsView(false)
                  setIsOpenApproveForm(true);
                }} type="text" disabled={record.status != RequestOrderStatus.WAITING_APPROVAL}>
                  <Check size={20} style={{ color: record.status != RequestOrderStatus.WAITING_APPROVAL ? "gray" : 'green' }} />
                </Button> : <></>
            }
            {
              permissions?.includes("APPROVE") ?
                <Button style={{ padding: 5 }} onClick={() => {
                  setRequestOrder(record);
                  setIsReject(true)
                  setIsApprove(false)
                  setIsView(false)
                  setIsOpenApproveForm(true);
                }} type="text" disabled={record.status != RequestOrderStatus.WAITING_APPROVAL}>
                  <X size={20} style={{ color: record.status != RequestOrderStatus.WAITING_APPROVAL ? "gray" : 'red' }} />
                </Button> : <></>
            }
            <Button style={{ padding: 5 }} onClick={() => {
              setRequestOrder(record);
              setIsApprove(false)
              setIsReject(false)
              setIsView(record.status == RequestOrderStatus.WAITING_APPROVAL ? true : false);
              setIsOpenApproveForm(true);
            }} type="text">
              <Eye
                size="20"
                className="text-color-grey"
              />
            </Button>
          </div>
        </>
        )
      }
    },
    {
      title: () => <div style={{}}>{t("requestOrder:status")}</div>,
      dataIndex: "status",
      key: "status",
      width: '125px',
      fixed: "left",
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
          case RequestOrderStatus.COMPLETED:
            return statusText("requestOrderStatus:completed", 'green');
          case RequestOrderStatus.REJECTED:
            return statusText("requestOrderStatus:reject", 'red');
          case RequestOrderStatus.WAITING_APPROVAL:
            return statusText("requestOrderStatus:waiting", 'orange');
        }
      },
      renderFilter: ({ column, confirm, ref }: any) => (
        <FilterDropdown column={column} confirm={confirm} ref={ref} options={[
          { value: RequestOrderStatus.COMPLETED, label: <Tag color="green">{t("requestOrderStatus:completed")}</Tag> },
          { value: RequestOrderStatus.WAITING_APPROVAL, label: <Tag color="orange">{t("requestOrderStatus:waiting")}</Tag> },
          { value: RequestOrderStatus.REJECTED, label: <Tag color="red">{t("requestOrderStatus:reject")}</Tag> },
        ]}
        />
      ),
    },
    {
      title: () => <div style={{}}>{t("requestOrder:transDate")}</div>,
      dataIndex: "transDate",
      key: "transDate",
      width: '160px',
      filterable: true,
      align: "center",
      sorter: true,
      render: (text: string, record: any) =>
        text ? moment(text).format("DD/MM/YYYY") : "",
      renderFilter: ({ column, confirm, ref }: FilterParam) => (
        <FilterDatePicker column={column} confirm={confirm} ref={ref} />
      ),
    },
    {
      title: () => <div style={{}}>{t("requestOrder:docsDate")}</div>,
      dataIndex: "createdAt",
      key: "createdAt",
      width: '160px',
      filterable: true,
      align: "center",
      sorter: true,
      render: (text: string, record: any) =>
        text ? moment(text).format("DD/MM/YYYY") : "",
      renderFilter: ({ column, confirm, ref }: FilterParam) => (
        <FilterDatePicker column={column} confirm={confirm} ref={ref} />
      ),
    },
    {
      title: () => <div style={{}}>{t("requestOrder:accountNumber")}</div>,
      dataIndex: "accountNumber",
      key: "accountNumber",
      filterable: true,
      width: '140px',
      align: "center",
      sorter: true,
    },
    {
      title: () => <div style={{}}>{t("requestOrder:customerName")}</div>,
      dataIndex: "customerName",
      key: "customerName",
      width: '160px',
      filterable: true,
      sorter: true,
    },
    {
      title: () => <div style={{}}>{t("requestOrder:afAccountNumber")}</div>,
      dataIndex: "afAccountNumber",
      key: "afAccountNumber",
      width: '145px',
      filterable: true,
      align: "center",
      sorter: true,
    },
    {
      title: () => <div style={{}}>{t("requestOrder:businessName")}</div>,
      dataIndex: "businessName",
      key: "businessName",
      width: '400px',
      filterable: true,
      sorter: true,
      render: (val: string, record: any) => {
        switch (val) {
          case RequestOrderBusinessName.RECEIVE_CREDIT_NOTE: return t("requestOrderBusinessName:receiveCreditNote");
          case RequestOrderBusinessName.CANCEL_CREDIT_NOTE: return t("requestOrderBusinessName:cancelCreditNote");
          case RequestOrderBusinessName.CREATE_BLACKLIST_ACCOUNT: return t("requestOrderBusinessName:createBlacklistAccount");
          case RequestOrderBusinessName.UPDATE_BLACKLIST_ACCOUNT: return t("requestOrderBusinessName:updateBlacklistAccount");
          case RequestOrderBusinessName.DELETE_BLACKLIST_ACCOUNT: return t("requestOrderBusinessName:deleteBlacklistAccount");
          case RequestOrderBusinessName.CREATE_INTERNAL_TRANSFER_ACCOUNT: return t("requestOrderBusinessName:createInternalTransferAccount");
          case RequestOrderBusinessName.DELETE_INTERNAL_TRANSFER_ACCOUNT: return t("requestOrderBusinessName:deleteInternalTransferAccount");
          case RequestOrderBusinessName.EDIT_BANK_CONFIG: return t("requestOrderBusinessName:editBankConfig");
          case RequestOrderBusinessName.CREATE_CITAD_ACCOUNT: return t("requestOrderBusinessName:createCitadAccount");
          case RequestOrderBusinessName.DELETE_CITAD_ACCOUNT: return t("requestOrderBusinessName:deleteCitadAccount");
          case RequestOrderBusinessName.CREATE_BANK_AMOUNT_SETTING: return t("requestOrderBusinessName:createBankAmountSetting");
          case RequestOrderBusinessName.DELETE_BANK_AMOUNT_SETTING: return t("requestOrderBusinessName:deleteBankAmountSetting");
          case RequestOrderBusinessName.REFUSE_UNCOMPLETED_WITHDRAW: return t("requestOrderBusinessName:refuseUncompletedWithdraw");
          case RequestOrderBusinessName.COMPLETE_UNCOMPLETED_WITHDRAW: return t("requestOrderBusinessName:completeUncompletedWithdraw");
          case RequestOrderBusinessName.UPDATE_WITHDRAW_REJECT_BY_BANK: return t("requestOrderBusinessName:updateWithdrawRejectByBank");
          case RequestOrderBusinessName.DELETE_WITHDRAW_REJECT_BY_BANK: return t("requestOrderBusinessName:deleteWithdrawRejectByBank");
        }
      },
      renderFilter: ({ column, confirm, ref }: any) => (
        <FilterDropdown column={column} confirm={confirm} ref={ref} options={[
          { value: RequestOrderBusinessName.RECEIVE_CREDIT_NOTE, label: t("requestOrderBusinessName:receiveCreditNote") },
          { value: RequestOrderBusinessName.CANCEL_CREDIT_NOTE, label: t("requestOrderBusinessName:cancelCreditNote") },
          { value: RequestOrderBusinessName.CREATE_BLACKLIST_ACCOUNT, label: t("requestOrderBusinessName:createBlacklistAccount") },
          { value: RequestOrderBusinessName.UPDATE_BLACKLIST_ACCOUNT, label: t("requestOrderBusinessName:updateBlacklistAccount") },
          { value: RequestOrderBusinessName.DELETE_BLACKLIST_ACCOUNT, label: t("requestOrderBusinessName:deleteBlacklistAccount") },
          { value: RequestOrderBusinessName.CREATE_INTERNAL_TRANSFER_ACCOUNT, label: t("requestOrderBusinessName:createInternalTransferAccount") },
          { value: RequestOrderBusinessName.DELETE_INTERNAL_TRANSFER_ACCOUNT, label: t("requestOrderBusinessName:deleteInternalTransferAccount") },
          { value: RequestOrderBusinessName.EDIT_BANK_CONFIG, label: t("requestOrderBusinessName:editBankConfig") },
          { value: RequestOrderBusinessName.CREATE_CITAD_ACCOUNT, label: t("requestOrderBusinessName:createCitadAccount") },
          { value: RequestOrderBusinessName.DELETE_CITAD_ACCOUNT, label: t("requestOrderBusinessName:deleteCitadAccount") },
          { value: RequestOrderBusinessName.CREATE_BANK_AMOUNT_SETTING, label: t("requestOrderBusinessName:createBankAmountSetting") },
          { value: RequestOrderBusinessName.DELETE_BANK_AMOUNT_SETTING, label: t("requestOrderBusinessName:deleteBankAmountSetting") },
          { value: RequestOrderBusinessName.REFUSE_UNCOMPLETED_WITHDRAW, label: t("requestOrderBusinessName:refuseUncompletedWithdraw") },
          { value: RequestOrderBusinessName.COMPLETE_UNCOMPLETED_WITHDRAW, label: t("requestOrderBusinessName:completeUncompletedWithdraw") },
          { value: RequestOrderBusinessName.UPDATE_WITHDRAW_REJECT_BY_BANK, label: t("requestOrderBusinessName:updateWithdrawRejectByBank") },
          { value: RequestOrderBusinessName.DELETE_WITHDRAW_REJECT_BY_BANK, label: t("requestOrderBusinessName:deleteWithdrawRejectByBank") },
        ]}
        />
      ),
    },
    {
      title: () => <div style={{}}>{t("requestOrder:createdBy")}</div>,
      dataIndex: "createdBy",
      key: "createdBy",
      width: '165px',
      filterable: true,
      sorter: true,
    },
    {
      title: () => <div style={{}}>{t("requestOrder:createdAt")}</div>,
      dataIndex: "createdAt",
      key: "createdAt",
      width: '155px',
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
      title: () => <div style={{}}>{t("requestOrder:approvedBy")}</div>,
      dataIndex: "approvedBy",
      key: "approvedBy",
      width: '150px',
      filterable: true,
      sorter: true,
    },
    {
      title: () => <div style={{}}>{t("requestOrder:approvedAt")}</div>,
      dataIndex: "approvedAt",
      key: "approvedAt",
      width: '165px',
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
      title: () => <div style={{}}>{t("requestOrder:description")}</div>,
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
    }
  ]

  const fetchData = async (params: TableParam2BackendQuery) => {
    setIsLoading(true);
    if (!params.sortField) {
      params.sortField = "createdAt";
      params.sortOrder = "desc";
    }
    const data: any = await getRequestOrderDataTable(params);
    setIsLoading(false);
    return data;
  }

  const reloadTable = () => {
    if (tableRef) {
      return tableRef.current.reload();
    }
  }

  return (
    <div>
      <GridTable
        ref={tableRef}
        columns={columns}
        fetchData={fetchData}
        addIndexCol={true}
        className="px-6 py-6 border-b-gray-010"
        onRow={(record: any) => ({
          onDoubleClick: () => {
            setRequestOrder(record);
            setIsApprove(false)
            setIsReject(false)
            setIsView(record.status == RequestOrderStatus.WAITING_APPROVAL ? true : false);
            setIsOpenApproveForm(true);
          }, // Mở modal detail khi click vào hàng
        })}
      />
      <RequestOrderDetail
        isOpen={isOpenDetailForm}
        setOpen={setIsOpenDetailForm}
        id={isOpenDetailForm ? selectedRequestOrder?.id : null}
      />

      {/* Đây là Modal chung*/}
      <RequestOrderApprove
        isOpen={isOpenApproveForm}
        setOpen={setIsOpenApproveForm}
        isApprove={isApprove}
        isReject={isReject}
        isView={isView}
        id={isOpenApproveForm ? selectedRequestOrder?.id : 0}
        reloadTable={reloadTable}
      />
    </div >
  )
}