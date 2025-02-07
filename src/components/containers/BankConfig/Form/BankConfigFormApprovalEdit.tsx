import { formatNumberWithCommas } from "@helpers/utils";
import { Col, Form, Input, InputNumber, Row, Select } from "antd"
import TextArea from "antd/es/input/TextArea";
import { useTranslation } from "react-i18next"

export const BankConfigFormApprovalEdit = ({
    bankConfigDetail,
    requestOrderDetail
}: {
    bankConfigDetail: any,
    requestOrderDetail: any
}) => {

    const { t } = useTranslation();
    return (<div>
        <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
            <Col span={12}><span className="font-bold">{t("requestOrderAction:commonInfo")}</span></Col>
            <Col span={12}></Col>
        </Row>
        <br />
        <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
            <Col span={12}>
                <Form.Item
                    label={t("bank:bankNo")}
                    rules={[{ required: true, message: t("form:validate:required") }]}
                >
                    <Input disabled={true} placeholder="" value={bankConfigDetail?.value?.bank?.bankCode} />
                </Form.Item>
            </Col>
            <Col span={12}>

                <Form.Item
                    label={t("bank:name")}
                    rules={[{ required: true, message: t("form:validate:required") }]}
                >
                    <TextArea rows={1} disabled={true} placeholder="" value={bankConfigDetail?.value?.bank?.name} />
                </Form.Item>

            </Col>
        </Row>
        <hr className="mb-4" />
        <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
            <Col span={12}>{t("requestOrderAction:beforeUpdate")}</Col>
            <Col span={12}>{t("requestOrderAction:afterUpdate")}</Col>
        </Row>
        <br />

        {requestOrderDetail?.props?.beforeUpdate?.transferChannel != requestOrderDetail?.props?.afterUpdate?.transferChannel && (
            <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                <Col span={12}>
                    <Form.Item
                        label={t("bank:transferWay")}
                        name={["props", "beforeUpdate", "transferChannel"]}
                        rules={[{ required: true, message: t("form:validate:required") }]}
                    >
                        <Select
                            onFocus={(e) => e.target.blur()}
                            disabled
                            options={[
                                { value: null, label: t("bank:transferChannel:none") },
                                { value: 2, label: t("bank:transferChannel:napas") },
                                { value: 1, label: t("bank:transferChannel:citad") },
                                { value: 0, label: t("bank:transferChannel:all") },
                            ]}
                            value={requestOrderDetail?.props?.beforeUpdate?.transferChannel}
                        />
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item
                        label={t("bank:transferWay")}
                        name={["props", "afterUpdate", "transferChannel"]}
                        rules={[{ required: true, message: t("form:validate:required") }]}
                    >
                        <Select
                            onFocus={(e) => e.target.blur()}
                            disabled
                            options={[
                                { value: null, label: t("bank:transferChannel:none") },
                                { value: 2, label: t("bank:transferChannel:napas") },
                                { value: 1, label: t("bank:transferChannel:citad") },
                                { value: 0, label: t("bank:transferChannel:all") },
                            ]}
                            value={requestOrderDetail?.props?.afterUpdate?.transferChannel}
                        />
                    </Form.Item>
                </Col>
            </Row>
        )}

        {requestOrderDetail?.props?.beforeUpdate?.isSupportTransfer != requestOrderDetail?.props?.afterUpdate?.isSupportTransfer && (
            <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                <Col span={12}>
                    <Form.Item
                        label={t("bank:isSupportTransfer")}
                        name={["props", "beforeUpdate", "isSupportTransfer"]}
                        rules={[{ required: true, message: t("form:validate:required") }]}
                    >
                        <Select
                            onFocus={(e) => e.target.blur()}
                            disabled
                            options={[
                                { value: 1, label: t("bank:isSupportTransferValue.active") },
                                { value: 0, label: t("bank:isSupportTransferValue.inactive") },
                            ]}
                            value={requestOrderDetail?.props?.beforeUpdate?.isSupportTransfer}
                        />
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item
                        label={t("bank:isSupportTransfer")}
                        name={["props", "afterUpdate", "isSupportTransfer"]}
                        rules={[{ required: true, message: t("form:validate:required") }]}
                    >
                        <Select
                            onFocus={(e) => e.target.blur()}
                            disabled
                            options={[
                                { value: 1, label: t("bank:isSupportTransferValue.active") },
                                { value: 0, label: t("bank:isSupportTransferValue.inactive") },
                            ]}
                            value={requestOrderDetail?.props?.afterUpdate?.isSupportTransfer}
                        />
                    </Form.Item>
                </Col>
            </Row>
        )}

        {requestOrderDetail?.props?.beforeUpdate?.withdrawAccountNumber != requestOrderDetail?.props?.afterUpdate?.withdrawAccountNumber && (
            <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                <Col span={12}>
                    <Form.Item
                        label={t("bank:withdrawAccountNumber")}
                        name={["props", "beforeUpdate", "withdrawAccountNumber"]}
                        rules={[
                            { required: true, message: t("form:validate:required") },
                            { max: 20, message: t("form:validate:lengthMax", { len: 20 }) }
                        ]}
                    >
                        <Input disabled value={requestOrderDetail?.props?.beforeUpdate?.withdrawAccountNumber} />
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item
                        label={t("bank:withdrawAccountNumber")}
                        name={["props", "afterUpdate", "withdrawAccountNumber"]}
                        rules={[
                            { required: true, message: t("form:validate:required") },
                            { max: 20, message: t("form:validate:lengthMax", { len: 20 }) }
                        ]}
                    >
                        <Input disabled value={requestOrderDetail?.props?.afterUpdate?.withdrawAccountNumber} />
                    </Form.Item>
                </Col>
            </Row>
        )}
    
        {requestOrderDetail?.props?.beforeUpdate?.depositAccountNumber != requestOrderDetail?.props?.afterUpdate?.depositAccountNumber && (
            <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                <Col span={12}>
                    <Form.Item
                        label={t("bank:depositAccountNumber")}
                        name={["props", "beforeUpdate", "depositAccountNumber"]}
                        rules={[
                            { required: true, message: t("form:validate:required") },
                            { max: 20, message: t("form:validate:lengthMax", { len: 20 }) }
                        ]}
                    >
                        <Input disabled value={requestOrderDetail?.props?.beforeUpdate?.depositAccountNumber} />
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item
                        label={t("bank:depositAccountNumber")}
                        name={["props", "afterUpdate", "depositAccountNumber"]}
                        rules={[
                            { required: true, message: t("form:validate:required") },
                            { max: 20, message: t("form:validate:lengthMax", { len: 20 }) }
                        ]}
                    >
                        <Input disabled value={requestOrderDetail?.props?.afterUpdate?.depositAccountNumber} />
                    </Form.Item>
                </Col>
            </Row>
        )}

        {requestOrderDetail?.props?.beforeUpdate?.maxNapas != requestOrderDetail?.props?.afterUpdate?.maxNapas && (
            <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                <Col span={12}>
                    <Form.Item
                        label={t("bank:maxNapas")}
                        name={["props", "beforeUpdate", "maxNapas"]}
                        rules={[
                            { type: "number", max: 100000000000, message: t("form:validate:inRange", { min: 0, max: 100000000000 }) }
                        ]}
                    >
                        <InputNumber disabled
                            className="w-full"
                            value={requestOrderDetail?.props?.beforeUpdate?.maxNapas}
                            formatter={(val) => formatNumberWithCommas(val).toString()}
                        />
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item
                        label={t("bank:maxNapas")}
                        name={["props", "afterUpdate", "maxNapas"]}
                        rules={[
                            { type: "number", max: 100000000000, message: t("form:validate:inRange", { min: 0, max: 100000000000 }) }
                        ]}
                    >
                        <InputNumber disabled
                            className="w-full"
                            value={requestOrderDetail?.props?.afterUpdate?.maxNapas}
                            formatter={(val) => formatNumberWithCommas(val).toString()}
                        />
                    </Form.Item>
                </Col>
            </Row>
        )}

        {requestOrderDetail?.props?.beforeUpdate?.description != requestOrderDetail?.props?.afterUpdate?.description && (
            <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                <Col span={12}>
                    <Form.Item
                        label={t("bank:description")}
                        name={["props", "beforeUpdate", "description"]}
                        rules={[
                            { max: 1000, message: t("form:validate:lengthMax", { len: 1000 }) }
                        ]}
                    >
                        <TextArea rows={4} disabled value={requestOrderDetail?.props?.beforeUpdate?.description} />
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item
                        label={t("bank:description")}
                        name={["props", "afterUpdate", "description"]}
                        rules={[
                            { max: 1000, message: t("form:validate:lengthMax", { len: 1000 }) }
                        ]}
                    >
                        <TextArea rows={4} disabled value={requestOrderDetail?.props?.afterUpdate?.description} />
                    </Form.Item>
                </Col>
            </Row>
        )}

    </div>)
}