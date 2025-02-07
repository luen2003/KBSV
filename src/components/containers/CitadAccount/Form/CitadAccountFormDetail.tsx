import { Col, Form, Input, InputNumber, Row, Select } from "antd"
import TextArea from "antd/es/input/TextArea";
import { useTranslation } from "react-i18next"

export const CitadAccountFormDetail = () => {
    const { t } = useTranslation();
    return (<div>
        <Row gutter={{ xs: 8, sm: 12, md: 24, lg: 36 }}>
            <Col span={24}>
                <Form.Item
                    label={t("bank:noCodeShortName")}
                    name={["bank", "noCodeShortName"]}
                    rules={[{ required: true, message: t("form:validate:required") }]}
                >
                    <Input disabled placeholder="" />
                </Form.Item>
            </Col>
        </Row>
        <Row gutter={{ xs: 8, sm: 12, md: 16, lg: 36 }}>
            <Col span={24}>
                <Form.Item
                    label={t("citadAccount:accountNumber")}
                    name={["accountNumber"]}
                    rules={[{ required: true, message: t("form:validate:required") }]}
                >
                    <Input disabled placeholder="" />
                </Form.Item>
            </Col>
        </Row>
        <Row gutter={{ xs: 8, sm: 12, md: 16, lg: 36 }}>
            <Col span={24}>
                <Form.Item
                    label={t("citadAccount:customerName")}
                    name={["customerName"]}
                    rules={[{ required: true, message: t("form:validate:required") }]}
                >
                    <Input disabled placeholder="" />
                </Form.Item>
            </Col>
        </Row>
        <Row gutter={{ xs: 8, sm: 12, md: 16, lg: 36 }}>
            <Col span={24}>
                <Form.Item
                    label={t("citadAccount:fullAfAccountNumber")}
                    name={["fullAfAccountNumber"]}
                    rules={[{ required: true, message: t("form:validate:required") }]}
                >
                    <Input disabled placeholder="" />
                </Form.Item>
            </Col>
        </Row>
        <Row gutter={{ xs: 8, sm: 12, md: 16, lg: 36 }}>
            <Col span={24}>
                <Form.Item
                    label={t("citadAccount:description")}
                    name={["description"]}
                    // rules={[{ required: true, message: t("form:validate:required") }]}
                >
                    <TextArea disabled placeholder="" />
                </Form.Item>
            </Col>
        </Row>
    </div>)
}