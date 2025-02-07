import { formatNumberWithCommas } from "@helpers/utils";
import { Col, Form, Input, InputNumber, Row, Select } from "antd"
import TextArea from "antd/es/input/TextArea";
import { useTranslation } from "react-i18next"

export const BankConfigForm = ({ isUpdate = false }: { isUpdate?: boolean }) => {
    const { t } = useTranslation();
    return (<div>
        <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
            <Col span={12}>
                <Form.Item
                    label={t("bank:bankNo")}
                    name={["bank", "bankNo"]}
                    rules={[{ required: true, message: t("form:validate:required") }]}
                >
                    <Input disabled={true} placeholder="" />
                </Form.Item>
            </Col>
            <Col span={12}>
                <Form.Item
                    label={t("bank:transferWay")}
                    name={["transferChannel"]}
                    rules={[{ required: true, message: t("form:validate:required") }]}
                >
                    <Select disabled={!isUpdate} options={[
                        { value: 2, label: t("bank:transferChannel:napas") },
                        { value: 1, label: t("bank:transferChannel:citad") },
                        { value: 0, label: t("bank:transferChannel:all") },
                    ]} />
                </Form.Item>
            </Col>
        </Row>
        <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
            <Col span={12}>
                <Form.Item
                    label={t("bank:name")}
                    name={["bank", "name"]}
                    rules={[{ required: true, message: t("form:validate:required") }]}
                >
                    <TextArea rows={2} disabled={true} placeholder="" />
                </Form.Item>
            </Col>
            <Col span={12}>
                <Form.Item
                    label={t("bank:active")}
                    name={["active"]}
                    rules={[{ required: true, message: t("form:validate:required") }]}
                >
                    <Select disabled={!isUpdate} options={[
                        { value: 0, label: t("bank:heath:inactive") },
                        { value: 1, label: t("bank:heath:active") },
                    ]} />
                </Form.Item>
            </Col>
        </Row>
        <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
        <Col span={12}>
                <Form.Item
                    label={t("bank:isSupportTransfer")}
                    name={["isSupportTransfer"]}
                    rules={[{ required: true, message: t("form:validate:required") }]}
                >
                    <Select disabled={true} options={[
                        { value: 0, label: t("common:no") },
                        { value: 1, label: t("common:yes") },
                    ]} />
                </Form.Item>
            </Col>
            <Col span={12}>
                <Form.Item
                    label={t("bank:withdrawAccountNumber")}
                    name={["withdrawAccountNumber"]}
                    rules={[
                        { max: 4, message: t("form:validate:lengthMax", { len: 4 }) }
                    ]}
                >
                    <Input disabled={!isUpdate} placeholder="" />
                </Form.Item>
            </Col>
        </Row>
        <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
            <Col span={12}>
                <Form.Item
                    label={t("bank:bankCode")}
                    name={["bank", "bankCode"]}
                    rules={[{ required: true, message: t("form:validate:required") }]}
                >
                    <Input disabled={true} placeholder="" />
                </Form.Item>
            </Col>
            <Col span={12}>
                <Form.Item
                    label={t("bank:depositAccountNumber")}
                    name={["depositAccountNumber"]}
                    rules={[
                        // { required: true, message: t("form:validate:required") },
                        { max: 4, message: t("form:validate:lengthMax", { len: 4 }) }
                    ]}
                >
                    <Input disabled={!isUpdate} placeholder="" />
                </Form.Item>
            </Col>

        </Row>
        <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
            <Col span={12}>
                <Form.Item
                    label={t("bank:isNapasTransfer")}
                    name={["bank", "isNapasTransfer"]}
                    rules={[{ required: true, message: t("form:validate:required") }]}
                >
                    <Select disabled={true} options={[
                        { value: 0, label: t("common:no") },
                        { value: 1, label: t("common:yes") },
                    ]} />
                </Form.Item>
            </Col>
            <Col span={12}>
                <Form.Item
                    label={t("bank:maxNapas")}
                    name={["maxNapas"]}
                    rules={[
                        // { required: true, message: t("form:validate:required") },
                        { type: "number", max: 100000000000, message: t("form:validate:inRange", { min: 0, max: 100000000000 }) }
                    ]}
                >
                    <InputNumber disabled={!isUpdate}
                        placeholder=""
                        style={{
                            width: '100%'
                        }}
                        formatter={(val) => formatNumberWithCommas(val).toString()}
                        min={0}
                        max={100000000000}
                    />
                </Form.Item>
            </Col>
        </Row>
        <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
            <Col span={12}>
                <Form.Item
                    label={t("bank:isCitadTransfer")}
                    name={["bank", "isCitadTransfer"]}
                    rules={[{ required: true, message: t("form:validate:required") }]}
                >
                    <Select disabled={true} options={[
                        { value: 0, label: t("common:no") },
                        { value: 1, label: t("common:yes") },
                    ]} />
                </Form.Item>
            </Col>
            <Col span={12}>
                <Form.Item
                    label={t("bank:description")}
                    name={["description"]}
                    rules={[
                        // { required: true, message: t("form:validate:required") },
                        { max: 500, message: t("form:validate:lengthMax", { len: 500 }) }
                    ]}
                >
                    <TextArea rows={4} disabled={!isUpdate} placeholder="" />
                </Form.Item>
            </Col>
        </Row>
    </div>)
}