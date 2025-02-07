import { Col, Form, Input, Modal, Row, Spin } from "antd"
import { useForm } from "antd/es/form/Form";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { getTransferDetail } from "@services/TransferService";
import dayjs from "dayjs";
import { WithdrawRefusedByBankDetailForm } from "./detail-form";
import moment from "moment";


export const WithdrawRejectByBankApproveForm = ({
  formRef,
  requestOrderDetail
}: {
  formRef: any,
  requestOrderDetail: any
}) => {

  const { t } = useTranslation();
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState<any>(null);

  const initData = async (id: number) => {
    try {
      const res = await getTransferDetail(requestOrderDetail?.sourceId);
      const feeTypeValue = t(`transfer:feeTypeValue:${res?.value?.feeType}`) != "feeTypeValue.null" ? t(`transfer:feeTypeValue:${res?.value?.feeType}`) : res?.value?.feeType;
      setData({
        ...res?.value,
        // txDate: res?.value.txDate ? dayjs(res?.value.txDate) : null,
        txDate: res?.value?.txDate ? moment(res?.value?.txDate).format('DD/MM/YYYY') : null,
        createdAt: res?.value?.createdAt ? moment(res?.value?.createdAt).format('DD/MM/YYYY') : null,
        transferDate: res?.value?.transferDate ? moment(res?.value?.transferDate).format('DD/MM/YYYY') : null,
        feeType: feeTypeValue,
      });
    } catch (e) {

    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (requestOrderDetail?.id) initData(requestOrderDetail?.id);

  }, [requestOrderDetail?.id]);

  useEffect(() => {
    if (data) {
      formRef.setFieldsValue({ ...data });
    }
  }, [data])


  return (
    <>
      <div>
        <WithdrawRefusedByBankDetailForm />
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
