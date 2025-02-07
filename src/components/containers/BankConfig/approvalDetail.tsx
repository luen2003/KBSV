import { Button, Col, Form, Input, Modal, Row, Spin } from "antd"
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import { getBankConfigDetail, getTempBankConfigDetail } from "@services/BankService";
import { BankConfigFormApprovalEdit } from "./Form/BankConfigFormApprovalEdit";
import { getRequestOrderDetail } from "@services/requestOrder.service";
import TextArea from "antd/es/input/TextArea";

export const BankConfigApprovalDetail = ({
    requestOrderDetail,
    formRef
}: {
    requestOrderDetail: any,
    formRef: any
}) => {
    const { t } = useTranslation();
    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState<any>(null);
    const [requestOrder, setRequestOrder] = useState<any>(null);
    const [bankConfigDetail, setBankConfigDetail] = useState<any>(null);
    const [isViewAccount, setIsViewAccount] = useState(false);
    const initIntTransferAccountDetail = async () => {
        try {
            setIsViewAccount(true)
            if (!requestOrder) {
                const currentRequestOrder = await getRequestOrderDetail(requestOrderDetail?.id)
                const bankConfigDetail = await getBankConfigDetail(requestOrderDetail?.sourceId)
                setRequestOrder(currentRequestOrder?.value)
                setBankConfigDetail(bankConfigDetail)
            }
            setData(requestOrder)
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
            });
        }
    }, [data])

    return (<div>
        <BankConfigFormApprovalEdit requestOrderDetail={requestOrder} bankConfigDetail={bankConfigDetail} />

        {requestOrderDetail?.reasonReject && (
            <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                <Col span={12}>
                    <Form.Item
                        label={t('requestOrder:reasonReject')}
                        name="reasonReject"
                        rules={[]}
                    >
                        <TextArea
                            value={requestOrderDetail?.reasonReject}
                            disabled
                            className="bg-gray-100 font-semibol w-full"
                        />
                    </Form.Item>
                </Col>
                


            </Row>
        )}
    </div>)
}