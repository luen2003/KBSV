import { Button, Form, Input, Modal, Select, Spin } from "antd"
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import { useForm } from "antd/es/form/Form";
import { InternalTransferAccountFormDetail } from "./IntTransferAccountFormDetail";

export const InternalTransferAccountApprove = ({
  requestOrderDetail,
  formRef
}: {
  requestOrderDetail: any,
  formRef: any
}) => {
  const { t } = useTranslation();
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState<any>(null);
  const [isViewAccount, setIsViewAccount] = useState(false);
  const initIntTransferAccountDetail = async () => {
    try {
      const res = requestOrderDetail

      if (res.props.type === "ACCOUNT") {
        setIsViewAccount(true)
      } else {
        setIsViewAccount(false)
      }

      setData(res?.props);
    } catch (e) {

    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (requestOrderDetail) {
      initIntTransferAccountDetail();
    }
  })

  useEffect(() => {
    if (data) {
      formRef.setFieldsValue({
        ...data,
        type: t(`intTransferAccount:type:${data.type}`),
        bank: `${data.bankId} - ${data.bankCode} - ${data.bankName}`
      });
    }
  }, [data])

  return (<div>
    <Form.Item
      label={t('requestOrder:action')}
      rules={[]}
    >
      <Input
        value={t(`requestOrderAction:${requestOrderDetail.action.toLowerCase()}`)}
        disabled
      />
    </Form.Item>

    <InternalTransferAccountFormDetail isViewAccount={isViewAccount} />

    {requestOrderDetail.reasonReject && (
      <Form.Item
        label={t('requestOrder:reasonReject')}
        rules={[]}
      >
        <Input
          value={requestOrderDetail.reasonReject}
          disabled
        />
      </Form.Item>
    )}
  </div>)
}