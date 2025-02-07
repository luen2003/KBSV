import { Col, Form, Input, Modal, Row, Spin } from "antd"
import { useForm } from "antd/es/form/Form";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { getTransferDetail } from "@services/TransferService";
import dayjs from "dayjs";
import { TransferForm } from "./TransferForm";

export const TransferApprove = ({
  id,
  formRef,
  requestOrderDetail
}: {
  id: number,
  formRef: any,
  requestOrderDetail: any
}) => {

  const { t } = useTranslation();
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState<any>(null);

  const initData = async (id: number) => {
    try {
      const res = await getTransferDetail(id);

      setData({
        ...res?.value,
        txDate: res?.value.txDate ? dayjs(res?.value.txDate) : null,
        transferDate: res?.value.transferDate ? dayjs(res?.value.transferDate) : null,
        createdAt: dayjs(res?.value.createdAt),
        flexConfirm: typeof res?.value.flexConfirm === 'string'
        ? JSON.parse(res?.value.flexConfirm)
        : res?.value.flexConfirm,
        requestId: res?.value.requestId.split("-") ? res?.value.requestId.split("-")[1] : res?.value.requestId,
        customerId: res?.value?.afAccountNumber?.length > 10 ? `${res?.value?.customerId} - ${res?.value?.afAccountNumber}` : null
      });
    } catch (e) {

    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (id) initData(id);

  }, [id]);

  useEffect(() => {
    if (data) {
      formRef.setFieldsValue({ ...data });
    }
  }, [data])

  console.log(requestOrderDetail?.action);

  return (
    <>

      <div>
        <TransferForm isUpdate={false} />
      </div>

      <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
        <Col span={12}>
          <Form.Item
            label={t('requestOrder:action')}
            rules={[]}
          >
            <Input
              value={t(`requestOrderAction:${requestOrderDetail?.businessName?.toLowerCase()}`)}
              disabled
              className="bg-gray-100 "
            />
          </Form.Item>
        </Col>
        <Col span={12}>
          {requestOrderDetail?.reasonReject && (
            <Form.Item
              label={t('requestOrder:reasonReject')}
              rules={[]}
            >
              <Input
                value={requestOrderDetail?.reasonReject}
                disabled 
              />
            </Form.Item>
          )}
        </Col>
      </Row>
    </>
  );
};
