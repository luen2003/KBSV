import { CheckOutlined, CloseOutlined } from "@ant-design/icons";
import { getBankMaster } from "@services/BankService";
import { Button, Col, Form, Input, InputNumber, Row, Select, Switch } from "antd"
import TextArea from "antd/es/input/TextArea";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next"

export const RoleFormCreate = (
    { selectAfAccountNumber }: { selectAfAccountNumber?: any }) => {
    const { t } = useTranslation();

    return (<div>
        {/* <Row gutter={{ xs: 8, sm: 12, md: 24, lg: 36 }}>
            <Col span={24}>
                <Form.Item
                    label={t("role:authority")}
                    name={["authority"]}
                    rules={[{ required: true, message: t("form:validate:required") }]}
                >
                    <Input placeholder={t("role:inputData:authority")} maxLength={100} />
                </Form.Item>
            </Col>
        </Row> */}
        <Row gutter={{ xs: 8, sm: 12, md: 16, lg: 36 }}>
            <Col span={24}>
                <Form.Item
                    label={t("role:name")}
                    name={["name"]}
                    rules={[{ required: true, message: t("form:validate:required") }]}
                >
                    <Input placeholder={t("role:inputData:name")} maxLength={100} />
                </Form.Item>
            </Col>
        </Row>
        <Row gutter={{ xs: 8, sm: 12, md: 16, lg: 36 }}>
            <Col span={24}>
                <Form.Item
                    label={t("role:description")}
                    name={["description"]}
                    rules={[]}
                >
                    <TextArea rows={4} placeholder={t("role:inputData:description")} />
                </Form.Item>
            </Col>
        </Row>
        <Row gutter={{ xs: 8, sm: 12, md: 16, lg: 36 }}>
            <Col span={24}>
                <Form.Item
                    label={t("role:status")}
                    name={["status"]}
                    rules={[{ required: true, message: t("form:validate:required") }]}
                    initialValue={true}
                >
                    <Select defaultValue={true} disabled={false} options={[
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
            </Col>
        </Row>
        <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
            <Col span={6} offset={10}>
                <Button type="default" disabled={true}>
                    {t("role:button:authorization")}
                </Button>
            </Col>
            <Col span={6}>
                <Button type="default" disabled={true}>
                    {t("role:button:addUser")}
                </Button>
            </Col>
        </Row>
        <br />
    </div>)
}