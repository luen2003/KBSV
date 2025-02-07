import { CheckCircleOutlined, CheckOutlined, CloseOutlined, CreditCardOutlined } from "@ant-design/icons";
import { UserEnabled } from "@constants/User.constant";
import { Button, Checkbox, Col, Form, Input, InputNumber, Row, Select, Switch } from "antd"
import TextArea from "antd/es/input/TextArea";
import { useTranslation } from "react-i18next"
import { ModalAssignRole } from "../ModalAssignRole";
import { useState } from "react";

export const UserForm = ({ user }: any) => {
    const { t } = useTranslation();
    const [isOpenModalAssignRole, setIsOpenModalAssignRole] = useState<boolean>(false);

    return (<div style={{ marginBottom: "30px" }}>
        <Form.Item
            label={t("user:id")}
            name={["id"]}
            rules={[{ required: true, message: t("form:validate:required") }]}
        >
            <Input disabled={true} placeholder="" />
        </Form.Item>
        <Form.Item
            label={t("user:username")}
            name={["username"]}
            rules={[{ required: true, message: t("form:validate:required") }]}
        >
            <Input disabled={true} placeholder="" />
        </Form.Item>

        <Form.Item
            label={t("user:fullName")}
            name={["fullName"]}
            rules={[{ required: true, message: t("form:validate:required") }]}

        >
            <Input disabled={true} placeholder="" />
        </Form.Item>

        <Form.Item
            label={t("user:departmentName")}
            name={["departmentName"]}
        >
            <Input disabled={true} placeholder="" />
        </Form.Item>

        <Form.Item
            label={t("user:email")}
            name={["email"]}
            rules={[{ required: true, message: t("form:validate:required") }]}
        >
            <Input disabled={true} placeholder="" />
        </Form.Item>

        <Form.Item
            label={t("user:enabled:title")}
            name={["enabled"]}
            rules={[{ required: true, message: t("form:validate:required") }]}
        >
            <Select disabled={true} options={[
                {
                    value: UserEnabled.ACTIVE,
                    label: (
                        <span>
                            <span style={{ color: "green", display: "inline-block", width: "8px", height: "8px", borderRadius: "50%", backgroundColor: "green", marginRight: "8px" }}></span>
                            {t("user:enabled:value:active")}
                        </span>
                    )
                },
                {
                    value: UserEnabled.INACTIVE,
                    label: (
                        <span>
                            <span style={{ color: "red", display: "inline-block", width: "8px", height: "8px", borderRadius: "50%", backgroundColor: "red", marginRight: "8px" }}></span>
                            {t("user:enabled:value:inActive")}
                        </span>
                    )
                }
            ]} />
        </Form.Item>

        <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }} style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Col style={{ display: 'flex', alignItems: 'center' }}>
                <Button type="default" style={{ width: "150px" }} onClick={() => setIsOpenModalAssignRole(true)}>
                    {t("user:button:viewRole")}
                </Button>
            </Col>
        </Row>
        {isOpenModalAssignRole && <ModalAssignRole isOpen={isOpenModalAssignRole} setIsOpen={setIsOpenModalAssignRole} user={user} isUpdate={false} />}

    </div>)
}