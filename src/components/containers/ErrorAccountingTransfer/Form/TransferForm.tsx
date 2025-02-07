import { formatNumberWithCommas } from "@helpers/utils";
import { Col, DatePicker, Form, Input, InputNumber, Row } from "antd"
import TextArea from "antd/es/input/TextArea";
import { useTranslation } from "react-i18next"

export const TransferForm = ({ isUpdate = false }: { isUpdate?: boolean }) => {
    const { t } = useTranslation();
    return (<div>
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
                    label={t("transfer:amount")}
                    name={["amount"]}
                    rules={[]}
                >
                    <InputNumber disabled={!isUpdate}
                        style={{ width: '100%' }}
                        formatter={(val) => formatNumberWithCommas(val).toString()}
                    />
                </Form.Item>
            </Col>
        </Row>
        <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
            <Col span={12}>
                <Form.Item
                    label={t("transfer:txNumber")}
                    name={["uuid"]}
                    rules={[]}
                >
                    <Input disabled={!isUpdate} placeholder="" />
                </Form.Item>
            </Col>
            <Col span={12}>
                <Form.Item
                    label={t("transfer:createdAt")}
                    name={["createdAt"]}
                    rules={[]}
                >
                    <DatePicker disabled={!isUpdate} style={{ width: '100%' }} format={"HH:mm:ss DD/MM/YYYY"} />
                </Form.Item>
            </Col>

        </Row>
        <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
            <Col span={12}>
                <Row>
                    <Col style={{ width: "100%" }}>
                        <Form.Item
                            label={t("transfer:transferCode")}
                            name={["requestId"]}
                            rules={[]}
                        >
                            <Input disabled={!isUpdate} placeholder="" />
                        </Form.Item>
                    </Col>
                </Row>

                <Row>
                    <Col style={{ width: "100%" }}>
                        <Form.Item
                            label={t("transfer:bankCodeDeposit")}
                            name={["bankCode"]}
                            rules={[]}
                        >
                            <Input disabled={!isUpdate} placeholder="" />
                        </Form.Item>

                    </Col>
                </Row>
                <Row>
                </Row>
            </Col>
            <Col span={12}>
                <Form.Item
                    label={t("transfer:description")}
                    name={["description"]}
                    rules={[]}
                >
                    <TextArea rows={4} disabled={!isUpdate} placeholder="" />
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
                    label={t("transfer:errorCode")}
                    name={["flexConfirm", "P_ERR_CODE"]}
                    rules={[]}
                >
                    <Input disabled={!isUpdate} placeholder="" />
                </Form.Item>
            </Col>

        </Row>
        <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
            <Col span={12}>
                <Row>
                    <Col style={{ width: "100%" }}>

                        <Form.Item
                            label={t("transfer:accountNumber")}
                            name={["accountNumber"]}
                            rules={[]}
                        >
                            <Input disabled={!isUpdate} placeholder="" />
                        </Form.Item>
                    </Col>
                </Row>

                <Row>
                    <Col style={{ width: "100%" }}>
                        <Form.Item
                            label={t("transfer:beneficiaryName")}
                            name={["customerName"]}
                            rules={[]}

                        >
                            <Input disabled={!isUpdate} placeholder="" />
                        </Form.Item>

                    </Col>
                </Row>
                <Row>
                </Row>
            </Col>
            <Col span={12}>
                <Form.Item
                    label={t("transfer:errorMessage")}
                    name={["flexConfirm", "P_ERR_MESSAGE"]}
                    rules={[]}
                >
                    <TextArea rows={4} disabled={!isUpdate} placeholder="" />
                </Form.Item>
            </Col>
        </Row>
    </div>)
}