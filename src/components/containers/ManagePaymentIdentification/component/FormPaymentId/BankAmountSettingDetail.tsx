import { formatNumberWithCommas } from "@helpers/utils";
import { Col, Form, Input, InputNumber, Row, Select } from "antd"
import { useTranslation } from "react-i18next"

export const BankAmountSettingFormDetail = () => {
    const { t } = useTranslation();
    return (<div>
        <Row gutter={{ xs: 8, sm: 12, md: 24, lg: 36 }}>
            <Col span={24}>
                <Form.Item
                    label={t("bank:noCodeShortName")}
                    name={["bank", "noCodeShortName"]}
                    rules={[{ required: true, message: t("form:validate:required") }]}
                >
                    <Input disabled={true} placeholder="" />
                </Form.Item>
            </Col>
        </Row>
        <Row gutter={{ xs: 8, sm: 12, md: 16, lg: 36 }}>
            <Col span={24}>
                <Form.Item
                    label={t("managePaymentIdContent:minValue")}
                    name={["amountMin"]}
                    rules={[{ required: true, message: t("form:validate:required") }]}
                >
                    <InputNumber className="w-full" disabled={true} placeholder=""  formatter={(val) => formatNumberWithCommas(val).toString()}/>
                </Form.Item>
            </Col>
        </Row>
        <Row gutter={{ xs: 8, sm: 12, md: 16, lg: 36 }}>
            <Col span={24}>
                <Form.Item
                    label={t("managePaymentIdContent:maxValue")}
                    name={["amountMax"]}
                    rules={[{ required: true, message: t("form:validate:required") }]}
                >
                    <InputNumber className="w-full" disabled={true} placeholder=""  formatter={(val) => formatNumberWithCommas(val).toString()} />
                </Form.Item>
            </Col>
        </Row>
        <Row gutter={{ xs: 8, sm: 12, md: 16, lg: 36 }}>
            <Col span={24}>
                <Form.Item
                    label={t("citadAccount:description")}
                    name={["description"]}
                >
                    <Input disabled={true} placeholder="" />
                </Form.Item>
            </Col>
        </Row>
    </div>)
}