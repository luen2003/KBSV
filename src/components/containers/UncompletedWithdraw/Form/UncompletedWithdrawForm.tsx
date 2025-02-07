import { formatNumberWithCommas } from "@helpers/utils";
import { Col, DatePicker, Form, Input, InputNumber, Row } from "antd"
import { useTranslation } from "react-i18next"

export const UncompletedWithdrawForm = ({ isUpdate = false }: { isUpdate?: boolean }) => {
    const { t } = useTranslation();
    return (<>
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
                    label={t("transfer:txNumber")}
                    name={["txNumber"]}
                    rules={[]}
                >
                    <Input disabled={!isUpdate} placeholder="" />
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
                    label={t("transfer:requestId")}
                    name={["requestId"]}
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
                    label={t("transfer:afAccountNumber")}
                    name={["afAccountNumber"]}
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
                    label={t("transfer:accountNumber")}
                    name={["accountNumber"]}
                    rules={[]}
                >
                    <Input disabled={!isUpdate} placeholder="" />
                </Form.Item>
            </Col>
            <Col span={12}>
                <Form.Item
                    label={t("transfer:txDesc")}
                    name={["txDesc"]}
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
    </>)
}