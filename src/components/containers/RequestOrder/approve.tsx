import { Button, Form, Input, Modal, Spin } from "antd"
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import { useForm } from "antd/es/form/Form";
import toast from "react-hot-toast";
import { approveRequest, getRequestOrderDetail, rejectRequest } from "@services/requestOrder.service";
import { RequestOrderType } from "@constants/RequestOrderType";
import { InternalTransferAccountApprove } from "../InternalTransferAccount/Form/InternalTransferAccountApprove";
import { TransferApprove } from "../ErrorAccountingTransfer/Form/TransferApproveForm";
import { CitadAccountApprovalDetail } from "../CitadAccount/approvalDetail";
import { BankConfigApprovalDetail } from "../BankConfig/approvalDetail";
import { UncompletedWithdrawForm } from "./Form/UncompleteWithdrawForm";
import { AccountBlacklistApprove } from "../AccountBlackList/Form/AccountBlacklistApprove";
import { ManagePaymentIdApprovalDetail } from "../ManagePaymentIdentification/approvalDetail";
import { WithdrawRejectByBankApproveForm } from "../withdraw-refused-by-bank/form/WithdrawRejectByBankApproveForm";
import { RequestOrderBusinessName } from "@constants/RequestOrderBusinessName";
import { RequestOrderAction } from "@constants/RequestOrderAction";

export const RequestOrderApprove = ({
  isOpen = false,
  isApprove = false,
  isReject = false,
  isView = false,
  setOpen,
  id,
  reloadTable,
}: {
  isOpen: boolean,
  isApprove: boolean,
  isReject: boolean,
  isView: boolean,
  setOpen: any,
  id: string,
  reloadTable: any
}) => {
  const { t } = useTranslation();
  const [isLoading, setLoading] = useState(true);
  const [formRef] = useForm();
  const [formIntTransAccount] = useForm();
  const [formCreditNote] = useForm();
  const [formCitadAccount] = useForm();
  const [formBankConfig] = useForm();
  const [uncompletedWithdrawFormRef] = useForm(); //
  const [formBlacklistAccount] = useForm();
  const [formBankAmountSetting] = useForm();
  const [formWithdrawRejectByBank] = useForm();
  const [data, setData] = useState<any>(null);
  const [isRejectModalOpen, setIsRejectModalOpen] = useState(false);
  const initRequestOrderDetail = async (id: string) => {
    try {
      const resData: any = await getRequestOrderDetail(id);
      const res = resData.value
      setData(res);
    } catch (e) {
      console.log(e);

    } finally {
      setLoading(false);
    }
  }
  useEffect(() => {
    if (id) initRequestOrderDetail(id);
    return () => {
      setData(null)
    }
  }, [id]);

  // Xử lý khi nhấn nút duyệt
  const handleApprove = async (e: React.MouseEvent<HTMLElement>) => {
    try {
      setLoading(true);
      const res = await approveRequest(data)
      if (!res.errorCode && res.code == 0) {
        toast.success(`${t("common:approve:success")}`);
        if (reloadTable) reloadTable();
      } else {
        toast.error(`${t("common:approve:fail")}`);
      }
    } catch (e) {
      toast.error(`${t("common:approve:fail")}`);
    }
    finally {
      setLoading(false);
    }
    if (reloadTable) reloadTable();

    setOpen(false);
  };

  // Xử lý khi nhấn nút từ chối
  const handleReject = async (e: React.MouseEvent<HTMLElement>) => {
    setIsRejectModalOpen(true);
  };

  // Xử lý sau khi nhập xong lý do từ chối
  const handleRejectSubmit = async (reason: string) => {
    try {
      setLoading(true);
      const res = await rejectRequest(data, reason);
      formRef.resetFields();
      if (!res.errorCode && res.code == 0) {
        toast.success(`${t("common:reject:success")}`);
        if (reloadTable) reloadTable();
      } else {
        toast.error(`${t("common:reject:fail")}`);
      }
    } catch (e) {
      toast.error(`${t("common:reject:fail")}`);
    }
    finally {
      setLoading(false);
    }

    setOpen(false);
    setIsRejectModalOpen(false);
  };

  const handleClose = (e: React.MouseEvent<HTMLElement>) => {
    setOpen(false);
  };

  const renderTitleByType = (type: string, action?: string) => {
    switch (type) {
      case RequestOrderType.INTERNAL_TRANSFER_ACCOUNT:
        switch (action) {
          case RequestOrderAction.CREATE:
            return t("menu:intTransferAccount:create")
          case RequestOrderAction.DELETE:
            return t("menu:intTransferAccount:delete")
          default:
            return t("menu:intTransferAccount:detail")
        }
      case RequestOrderType.TRANSFER_ACCOUNTING_ERROR:
        return t("menu:errorAccountingTransfer:detail")
      case RequestOrderType.CITAD_ACCOUNT:
        switch (action) {
          case RequestOrderAction.CREATE:
            return t("menu:citadAccount:create")
          case RequestOrderAction.UPDATE:
            return t("menu:citadAccount:update")
          case RequestOrderAction.DELETE:
            return t("menu:citadAccount:delete")
          default:
            return t("menu:citadAccount:detail")
        }
      case RequestOrderType.BANK_CONFIG:
        switch (action) {
          case RequestOrderAction.UPDATE:
            return t("menu:bankConfig:update")
          default:
            return t("menu:bankConfig:detail")
        }
      case RequestOrderType.UNCOMPLETED_PAYMENT_TRANSACTION:
        return t("menu:uncompletedWithdraw:detail")
      case RequestOrderType.BLACKLIST_ACCOUNT:
        switch (action) {
          case RequestOrderAction.CREATE:
            return t("menu:accountBlacklist:create")
          case RequestOrderAction.UPDATE:
            return t("menu:accountBlacklist:update")
          case RequestOrderAction.DELETE:
            return t("menu:accountBlacklist:delete")
          default:
            return t("menu:accountBlacklist:detail")
        }
      case RequestOrderType.BANK_AMOUNT_SETTING:
        switch (action) {
          case RequestOrderAction.CREATE:
            return t("menu:managePaymentId:create")
          case RequestOrderAction.DELETE:
            return t("menu:managePaymentId:delete")
          default:
            return t("menu:managePaymentId:detail")
        }
      case RequestOrderType.REJECTED_PAYMENT_TRANSACTION:
        return t("menu:withdrawTransfer:refusedDetail")
      default:
        return "";
    }
  }

  // Hiển thị form theo loại
  const renderFormByType = (type: string) => {
    switch (type) {
      case RequestOrderType.INTERNAL_TRANSFER_ACCOUNT:
        return (
          <Form
            form={formIntTransAccount}
            layout="horizontal"
            labelCol={{ span: 10 }}
            wrapperCol={{ span: 14 }}
            labelAlign="left"
            className="mt-4"
          >
            <InternalTransferAccountApprove
              requestOrderDetail={data}
              formRef={formIntTransAccount}
            />
          </Form>
        );
      case RequestOrderType.TRANSFER_ACCOUNTING_ERROR:
        return (
          <Form
            form={formCreditNote}
            layout="horizontal"
            labelCol={{ span: 10 }}
            wrapperCol={{ span: 14 }}
            labelAlign="left"
            className="mt-4"
          >
            <TransferApprove
              formRef={formCreditNote}
              requestOrderDetail={data}
              id={parseInt(data.sourceId)}
            />
          </Form>

        );
      case RequestOrderType.CITAD_ACCOUNT:
        return (
          <Form
            form={formCitadAccount}
            layout="horizontal"
            labelCol={{ span: 10 }}
            wrapperCol={{ span: 14 }}
            labelAlign="left"
            className="mt-4"
          >
            <CitadAccountApprovalDetail
              requestOrderDetail={data}
              formRef={formCitadAccount}
            />
          </Form>
        );
      case RequestOrderType.BANK_CONFIG:
        return (
          <Form
            form={formBankConfig}
            layout="horizontal"
            labelCol={{ span: 10 }}
            wrapperCol={{ span: 14 }}
            labelAlign="left"
            className="mt-4"
          >
            <BankConfigApprovalDetail
              requestOrderDetail={data}
              formRef={formBankConfig}
            />
          </Form>
        );
      case RequestOrderType.UNCOMPLETED_PAYMENT_TRANSACTION:
        return (
          <Form
            form={uncompletedWithdrawFormRef}
            layout="horizontal"
            labelCol={{ span: 10 }}
            wrapperCol={{ span: 14 }}
            labelAlign="left"
            className="mt-4"
          >
            <UncompletedWithdrawForm
              requestOrderDetail={data}
              formRef={uncompletedWithdrawFormRef}
            />
          </Form>
        );
      case RequestOrderType.BLACKLIST_ACCOUNT:
        return (
          <Form
            form={formBlacklistAccount}
            layout="horizontal"
            labelCol={{ span: 10 }}
            wrapperCol={{ span: 14 }}
            labelAlign="left"
            className="mt-4"
          >
            <AccountBlacklistApprove
              requestOrderDetail={data}
              formRef={formBlacklistAccount}
            />
          </Form>
        );
      case RequestOrderType.BANK_AMOUNT_SETTING:
        return (
          <Form
            form={formBankAmountSetting}
            layout="horizontal"
            labelCol={{ span: 10 }}
            wrapperCol={{ span: 14 }}
            labelAlign="left"
            className="mt-4"
          >
            <ManagePaymentIdApprovalDetail
              requestOrderDetail={data}
              formRef={formBankAmountSetting}
            />
          </Form>
        );
      case RequestOrderType.REJECTED_PAYMENT_TRANSACTION:
        return (
          <Form
            form={formWithdrawRejectByBank}
            layout="horizontal"
            labelCol={{ span: 10 }}
            wrapperCol={{ span: 14 }}
            labelAlign="left"
            className="mt-4"
          >
            <WithdrawRejectByBankApproveForm
              requestOrderDetail={data}
              formRef={formWithdrawRejectByBank}
            />
          </Form>
        );
      default:
        break;
    }
  };

  const modalWidths = (type: string, businessName: string) => {
    switch (type) {
      case RequestOrderType.INTERNAL_TRANSFER_ACCOUNT:
        return "600px"
      case RequestOrderType.TRANSFER_ACCOUNTING_ERROR:
        return "1100px"
      case RequestOrderType.CITAD_ACCOUNT:
        return "600px"
      case RequestOrderType.BANK_CONFIG:
        return "1100px"
      case RequestOrderType.UNCOMPLETED_PAYMENT_TRANSACTION:
        return "1100px"
      case RequestOrderType.BLACKLIST_ACCOUNT:
        if (businessName == RequestOrderBusinessName.UPDATE_BLACKLIST_ACCOUNT) {
          return "1100px"
        } else {
          return "600px"
        }
      case RequestOrderType.BANK_AMOUNT_SETTING:
        return "600px"
      case RequestOrderType.REJECTED_PAYMENT_TRANSACTION:
        return "1100px"
      default:
        return "1000px"
    }
  };

  return (<div>
    <Modal title={renderTitleByType(data?.type, isView ? "DETAIL" : data?.action)}
      open={isOpen}
      onCancel={() => setOpen(false)}
      width={modalWidths(data?.type, data?.businessName)}
      maskClosable={false}
      footer={[
        isReject || isView ? (
          <>
            <Button style={{ width: "150px", background: "#FF453A" }}
              key="reject" type="primary" danger onClick={handleReject} className="bg-color-red"
            >
              {t("button:reject")}
            </Button>
          </>
        ) : null,

        isApprove || isView ? (
          <>
            <Button style={{ width: "150px", background: "#25B770" }}
              key="approve" type="primary" onClick={handleApprove} className="bg-color-green"
            >
              {t("button:approve")}
            </Button>
          </>
        ) : null,


        <Button className="ant-btn-close" style={{ marginTop: "8px", width: "150px", background: "#EAECF0", borderColor: "#EAECF0", color: "#000" }}
          key="close" onClick={handleClose}>
          {t("button:close")}
        </Button>
      ]}
    >
      <hr />
      {(!data) ? <Spin /> : renderFormByType(data?.type)}
      <hr />
    </Modal>

    {/* Modal nhập lý do từ chối */}
    <Modal
      title={t("requestOrderStatus:reject")}
      open={isRejectModalOpen}
      onOk={() => formRef.submit()}
      onCancel={() => { setIsRejectModalOpen(false), formRef.resetFields() }}
      okText={t("button:done")}
      cancelText={t("button:close")}
      okButtonProps={{
        style: {
          backgroundColor: "#1890FF",
        }
      }}
      width={650}
      height={350}
    >
      <Form
        form={formRef}
        onFinish={(values) => handleRejectSubmit(values.reasonReject)}
      >
        <Form.Item
          label={t('requestOrder:reasonReject')}
          name="reasonReject"
          rules={[{ required: true, message: t("form:validate:required") }]}
        >
          <Input.TextArea rows={5} />
        </Form.Item>
      </Form>
    </Modal>
  </div>)
}