import { Col, Form, Input, InputNumber, Row, Select } from "antd"
import TextArea from "antd/es/input/TextArea";
import { useTranslation } from "react-i18next"

export const RequestOrderForm = ({ isUpdate = false }: { isUpdate?: boolean }) => {
    const { t } = useTranslation();
    return (<div>
        <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
            <Col span={12}>
                <Form.Item
                    label={t("requestOrder:id")}
                    name={["id"]}
                    rules={[{ required: true, message: t("form:validate:required") }]}
                >
                    <Input disabled={true} placeholder="" />
                </Form.Item>
            </Col>
            <Col span={12}>
                <Form.Item
                    label={t("requestOrder:createdBy")}
                    name={["createdBy"]}
                    rules={[{ required: true, message: t("form:validate:required") }]}

                >
                    <Input disabled={true} placeholder="" />
                </Form.Item>
            </Col>

        </Row>
        <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
            <Col span={12}>
                <Form.Item
                    label={t("requestOrder:createdAt")}
                    name={["createdAt"]}
                    rules={[{ required: true, message: t("form:validate:required") }]}

                >
                    <Input disabled={true} placeholder="" />
                </Form.Item>
            </Col>
            <Col span={12}>
                <Form.Item
                    label={t("requestOrder:type")}
                    name={["type"]}
                    rules={[{ required: true, message: t("form:validate:required") }]}

                >
                    <Select disabled={!isUpdate} options={[
                        { value: 1, label: t("bank:heath.active") },
                        { value: 0, label: t("bank:heath.inactive") },
                    ]} />
                </Form.Item>
            </Col>

        </Row>
        <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
            <Col span={12}>
                <Form.Item
                    label={t("requestOrder:businessName")}
                    name={["businessName"]}
                    rules={[{ required: true, message: t("form:validate:required") }]}
                >
                    <Input disabled={true} placeholder="" />
                </Form.Item>
            </Col>
            <Col span={12}>
                <Form.Item
                    label={t("requestOrder:afAccountNumber")}
                    name={["afAccountNumber"]}
                    rules={[{ required: true, message: t("form:validate:required") }]}
                >
                    <Input disabled={!isUpdate} placeholder="" />
                </Form.Item>
            </Col>

        </Row>
        <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
            <Col span={12}>
                <Form.Item
                    label={t("requestOrder:action")}
                    name={["action"]}
                    rules={[{ required: true, message: t("form:validate:required") }]}

                >
                    <Input disabled={true} placeholder="" />
                </Form.Item>
            </Col>
            <Col span={12}>
                <Form.Item
                    label={t("requestOrder:approvedBy")}
                    name={["approvedBy"]}
                    rules={[{ required: true, message: t("form:validate:required") }]}

                >
                    <Input disabled={!isUpdate} placeholder="" />
                </Form.Item>
            </Col>

        </Row>
        <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
            <Col span={12}>
                <Form.Item
                    label={t("requestOrder:approvedAt")}
                    name={["approvedAt"]}
                    rules={[{ required: true, message: t("form:validate:required") }]}
                >
                    <Input disabled={true} placeholder="" />
                </Form.Item>
            </Col>
            <Col span={12}>
                <Form.Item
                    label={t("requestOrder:reasonReject")}
                    name={["reasonReject"]}
                    rules={[{ required: true, message: t("form:validate:required") },]}
                >
                    <Input disabled={true} placeholder="" />
                </Form.Item>
            </Col>
        </Row>
    </div>)
}