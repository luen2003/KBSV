import { CheckCircleOutlined, CheckOutlined, CloseOutlined, CreditCardOutlined } from "@ant-design/icons";
import { Button, Checkbox, Col, Form, Input, InputNumber, Row, Select, Switch } from "antd"
import TextArea from "antd/es/input/TextArea";
import { useTranslation } from "react-i18next"

export const RoleFormDelete = ({ isUpdate = false }: { isUpdate?: boolean }) => {
    const { t } = useTranslation();
    const options = [
        { value: true, label: t("roleStatus:active"), icon: <CheckCircleOutlined style={{ color: 'green' }} /> },
        { value: false, label: t("roleStatus:in_active"), icon: <CheckCircleOutlined /> }
    ];

    return (<div>

        <Form.Item
            label={t("role:id")}
            name={["id"]}
            rules={[{ required: true, message: t("form:validate:required") }]}
        >
            <Input disabled={true} placeholder="" />
        </Form.Item>

        {/* <Form.Item
            label={t("role:authority")}
            name={["authority"]}
            rules={[{ required: true, message: t("form:validate:required") }]}
        >
            <Input disabled={true} placeholder="" />
        </Form.Item> */}

        <Form.Item
            label={t("role:name")}
            name={["name"]}
            rules={[{ required: true, message: t("form:validate:required") }]}

        >
            <Input disabled={true} placeholder="" />
        </Form.Item>

        <Form.Item
            label={t("role:description")}
            name={["description"]}
            rules={[]}
        >
            <TextArea disabled={true} rows={4} placeholder="" />
        </Form.Item>
        <Form.Item
            label={t("role:status")}
            name={["status"]}
            rules={[{ required: true, message: t("form:validate:required") }]}
        >
            <Select disabled={true} options={[
                {
                    value: true,
                    label: (
                        <span>
                            <span style={{ color: "green", display: "inline-block", width: "8px", height: "8px", borderRadius: "50%", backgroundColor: "green", marginRight: "8px" }}></span>
                            {t("roleStatus:active")}
                        </span>
                    )
                },
                {
                    value: false,
                    label: (
                        <span>
                            <span style={{ color: "red", display: "inline-block", width: "8px", height: "8px", borderRadius: "50%", backgroundColor: "red", marginRight: "8px" }}></span>
                            {t("roleStatus:in_active")}
                        </span>
                    )
                }
            ]} />
        </Form.Item>
        <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>.
            <Col span={6} offset={10} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }} >
                <Button type="default" disabled={true}>
                    {t("role:button:authorization")}
                </Button>
            </Col>
            <Col span={6} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Button type="default" disabled={true}>
                    {t("role:button:addUser")}
                </Button>
            </Col>
        </Row>
        <br />
    </div>)
}