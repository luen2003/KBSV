import { formatNumberWithCommas } from "@helpers/utils";
import { getTransferDetail } from "@services/TransferService";
import { Col, DatePicker, Form, Input, InputNumber, Row } from "antd"
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next"

export const UncompletedWithdrawForm = ({
    isUpdate = false,
    requestOrderDetail,
    formRef
}: {
    isUpdate?: boolean
    requestOrderDetail: any,
    formRef: any
}) => {
    const { t } = useTranslation();
    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState<any>(null);

    const initData = async (id: number) => {
        try {
            console.log("---------------------------------------");
            const res = await getTransferDetail(id);
            const feeTypeValue = t(`transfer:feeTypeValue:${res?.value?.feeType}`) != "feeTypeValue.null" ? t(`transfer:feeTypeValue:${res?.value?.feeType}`) : res?.value?.feeType;
            setData({
                ...res?.value,
                txDate: res?.value.txDate ? dayjs(res?.value.txDate) : null,
                transferDate: res?.value.transferDate ? dayjs(res?.value.transferDate) : null,
                createdAt: dayjs(res?.value.createdAt),
                feeType: feeTypeValue,
            });
        } catch (e) {

        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        if (requestOrderDetail.sourceId) initData(requestOrderDetail.sourceId);

    }, [requestOrderDetail]);

    useEffect(() => {
        if (data) {
            formRef.setFieldsValue({ ...data });
        }
    }, [data])

    return (<>
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
                <Form.Item
                    label={t("transfer:beneficiaryAccountNumber")}
                    name={["beneficiaryAccountNumber"]}
                    rules={[]}

                >
                    <Input disabled={!isUpdate} placeholder="" />
                </Form.Item>
            </Col>
        </Row>
        <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
            <Col span={12}>
                <Form.Item
                    label={t("transfer:transferDate")}
                    name={["txDate"]}
                    rules={[]}
                >
                    <DatePicker disabled={true} style={{ width: '100%' }} format={"DD/MM/YYYY"} />
                </Form.Item>
            </Col>

            <Col span={12}>
                <Form.Item
                    label={t("bank:name")}
                    name={["beneficiaryBank", "name"]}
                    rules={[]}

                >
                    <Input disabled={!isUpdate} placeholder="" />
                </Form.Item>
            </Col>
        </Row>

        <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
            <Col span={12}>
                <Form.Item
                    label={t("transfer:txNumber")}
                    name={["txNumber"]}
                    rules={[]}
                >
                    <Input disabled={!isUpdate} placeholder="" />
                </Form.Item>
            </Col>

            <Col span={12}>
                <Form.Item
                    label={t("bank:bankNo")}
                    name={["beneficiaryBank", "bankNo"]}
                    rules={[]}

                >
                    <Input disabled={!isUpdate} placeholder="" />
                </Form.Item>
            </Col>
        </Row>

        <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
            <Col span={12}>
                <Form.Item
                    label={t("transfer:transferCode")}
                    name={["transferCode"]}
                    rules={[]}
                >
                    <Input disabled={!isUpdate} placeholder="" />
                </Form.Item>
            </Col>

            <Col span={12}>
                <Form.Item
                    label={t("bankBranch:name")}
                    name={["beneficiaryBankBranch", "name"]}
                    rules={[]}

                >
                    <Input disabled={!isUpdate} placeholder="" />
                </Form.Item>
            </Col>
        </Row>

        <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
            <Col span={12}>
                <Form.Item
                    label={t("transfer:afAccountNumber")}
                    name={["afAccountNumber"]}
                    rules={[]}
                >
                    <Input disabled={!isUpdate} placeholder="" />
                </Form.Item>
            </Col>

            <Col span={12}>
                <Form.Item
                    label={t("transfer:description")}
                    name={["description"]}
                    rules={[]}

                >
                    <Input disabled={!isUpdate} placeholder="" />
                </Form.Item>
            </Col>
        </Row>

        <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
            <Col span={12}>
                <Form.Item
                    label={t("transfer:accountNumber")}
                    name={["accountNumber"]}
                    rules={[]}
                >
                    <Input disabled={!isUpdate} placeholder="" />
                </Form.Item>
            </Col>

            <Col span={12}>
                <Form.Item
                    label={t("transfer:feeType")}
                    name={["feeType"]}
                    rules={[]}

                >
                    <Input disabled={!isUpdate} placeholder="" />
                </Form.Item>
            </Col>
        </Row>

        <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
            <Col span={12}>
                <Form.Item
                    label={t("transfer:customerName")}
                    name={["beneficiaryName"]}
                    rules={[]}
                >
                    <Input disabled={!isUpdate} placeholder="" />
                </Form.Item>
            </Col>

            <Col span={12}>
                <Form.Item
                    label={t("transfer:fee")}
                    name={["fee"]}
                    rules={[]}

                >
                    <InputNumber disabled={!isUpdate} placeholder=""
                        style={{ width: '100%' }}
                        formatter={(val) => formatNumberWithCommas(val).toString()}
                    />
                </Form.Item>
            </Col>
        </Row>
        <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
            <Col span={12}>
                <Form.Item
                    label={t("transfer:amount")}
                    name={["amount"]}
                    rules={[]}
                >
                    <InputNumber disabled={!isUpdate} placeholder=""
                        style={{ width: '100%' }}
                        formatter={(val) => formatNumberWithCommas(val).toString()}
                    />
                </Form.Item>
            </Col>
        </Row>
    </>)
}