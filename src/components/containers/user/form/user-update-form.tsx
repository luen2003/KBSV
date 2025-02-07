import { CheckOutlined, CloseOutlined } from "@ant-design/icons";
import { Button, Col, Form, Input, Row, Select } from "antd"
import { useTranslation } from "react-i18next"
import { useState } from "react";
import { ModalAssignRole } from "../ModalAssignRole";
import { UserEnabled } from "@constants/User.constant";

export const UserUpdateForm = ({ user }: any) => {
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
            <Select disabled={false} options={[
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
                <Button type="default" onClick={() => setIsOpenModalAssignRole(true)}>
                    {t("user:button:updateRole")}
                </Button>
            </Col>
        </Row>
        <ModalAssignRole isOpen={isOpenModalAssignRole} setIsOpen={setIsOpenModalAssignRole} user={user} isUpdate={true} />
    </div>)
}