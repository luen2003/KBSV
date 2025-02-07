import { CheckCircleOutlined, CheckOutlined, CloseOutlined, CreditCardOutlined } from "@ant-design/icons";
import { formatNumberWithCommas } from "@helpers/utils";
import { Button, Checkbox, Col, Form, Input, InputNumber, Row, Select, Switch } from "antd"
import TextArea from "antd/es/input/TextArea";
import { useTranslation } from "react-i18next"

export const WithdrawRefusedByBankDetailForm = () => {
    const { t } = useTranslation();

    return (
        <div style={{ marginTop: "24px" }}>
            <Row gutter={24}>
                <Col span={12}>
                    <Form.Item
                        label={t("transfer:txDate")}
                        name={["txDate"]}
                    >
                        <Input disabled placeholder="" />
                    </Form.Item>
                    <Form.Item
                        label={t("transfer:txNumber")}
                        name={["txNumber"]}
                    >
                        <Input disabled placeholder="" />
                    </Form.Item>
                    <Form.Item
                        label={t("transfer:requestId")}
                        name={["requestId"]}
                    >
                        <Input disabled placeholder="" />
                    </Form.Item>
                    <Form.Item
                        label={t("transfer:afAccountNumber")}
                        name={["afAccountNumber"]}
                    >
                        <Input disabled placeholder="" />
                    </Form.Item>
                    <Form.Item
                        label={t("transfer:accountNumber")}
                        name={["accountNumber"]}
                    >
                        <Input disabled placeholder="" />
                    </Form.Item>
                    <Form.Item
                        label={t("transfer:beneficiaryName")}
                        name={["beneficiaryName"]}
                    >
                        <Input disabled placeholder="" />
                    </Form.Item>
                    <Form.Item
                        label={t("transfer:amount")}
                        name={["amount"]}
                    >
                        <InputNumber disabled
                            placeholder="" style={{ width: '100%' }}
                            formatter={(val) => formatNumberWithCommas(val).toString()}
                        />

                    </Form.Item>
                    <Form.Item
                        label={t("transfer:txDesc")}
                        name={["txDesc"]}
                    >
                        <Input disabled placeholder="" />
                    </Form.Item>
                </Col>

                <Col span={12}>
                    <Form.Item
                        label={t("transfer:beneficiaryAccountNumber")}
                        name={["beneficiaryAccountNumber"]}
                    >
                        <Input disabled placeholder="" />
                    </Form.Item>
                    <Form.Item
                        label={t("transfer:beneficiaryBank")}
                        name={["beneficiaryBank", "name"]}
                    >
                        <Input disabled placeholder="" />
                    </Form.Item>
                    <Form.Item
                        label={t("transfer:beneficiaryBankCode")}
                        name={["beneficiaryBank", "bankNo"]}
                    >
                        <Input disabled placeholder="" />
                    </Form.Item>
                    <Form.Item
                        label={t("transfer:beneficiaryBankBranch")}
                        name={["beneficiaryBankBranch"]}
                    >
                        <Input disabled placeholder="" />
                    </Form.Item>
                    <Form.Item
                        label={t("transfer:feeType")}
                        name={["feeType"]}
                    >
                        <Input disabled placeholder="" />
                    </Form.Item>
                    <Form.Item
                        label={t("transfer:fee")}
                        name={["fee"]}
                    >
                        <InputNumber disabled
                            placeholder="" style={{ width: '100%' }}
                            formatter={(val) => formatNumberWithCommas(val).toString()}
                        />
                    </Form.Item>
                    <Form.Item
                        label={t("transfer:bankErrorCode")}
                        name={["bankErrorCode"]}
                    >
                        <Input disabled placeholder="" />
                    </Form.Item>
                    <Form.Item
                        label={t("transfer:bankErrorDes")}
                        name={["bankErrorDes"]}
                    >
                        <Input disabled placeholder="" />
                    </Form.Item>
                </Col>
            </Row>
        </div>
    );
}