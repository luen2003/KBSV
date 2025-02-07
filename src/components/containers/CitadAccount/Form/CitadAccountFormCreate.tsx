import { getBankConfigMaster, getBankMaster } from "@services/BankService";
import { Col, Form, Input, InputNumber, Row, Select } from "antd"
import TextArea from "antd/es/input/TextArea";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next"

export const CitadAccountFormCreate = (
    { selectFullAfAccountNumber }: { selectFullAfAccountNumber?: any }) => {
    const { t } = useTranslation();
    const [bankOptions, setBankOptions] = useState<any>([]);

    const getListBank = async () => {
        const banksMaster: any = await getBankConfigMaster({});
        setBankOptions(banksMaster.items ? (banksMaster.items).map((bank: { id: number; noCodeShortName: string; bank: any }) => (
            { value: bank.bank.id, label: `${bank.bank.bankNo} - ${bank.bank.bankCode} - ${bank.bank.name}` }
        )) : []);
    }

    useEffect(() => {
        getListBank()
    }, [])
    return (<div>
        <Row gutter={{ xs: 8, sm: 12, md: 24, lg: 36 }}>
            <Col span={24}>
                <Form.Item
                    label={t("bank:noCodeShortName")}
                    name={["bankId"]}
                    rules={[{ required: true, message: t("form:validate:required") }]}
                >
                    <Select placeholder={t("citadAccount:inputData:bankCode")}
                        showSearch
                        options={bankOptions}
                        filterOption={(input, option) => {
                            const label = option?.label;
                            if (typeof label === 'string') {
                                return label.toLowerCase().includes(input.toLowerCase());
                            }
                            return false;
                        }} />
                </Form.Item>
            </Col>
        </Row>
        <Row gutter={{ xs: 8, sm: 12, md: 16, lg: 36 }}>
            <Col span={24}>
                <Form.Item
                    label={t("citadAccount:accountNumber")}
                    name={["accountNumber"]}
                    rules={[{ required: true, message: t("form:validate:required") },
                        { max: 10, message: t("form:validate:lengthMax", { len: 10 }) }
                    ]}
                >
                    <Input placeholder={t("citadAccount:inputData:accountNumber")} />
                </Form.Item>
            </Col>
        </Row>
        <Row gutter={{ xs: 8, sm: 12, md: 16, lg: 36 }}>
            <Col span={24}>
                <Form.Item
                    label={t("citadAccount:customerName")}
                    name={["customerName"]}
                    rules={[{ required: true, message: t("form:validate:required") }]}
                >
                    <Input disabled={true} placeholder={t("citadAccount:inputData:customerName")} />
                </Form.Item>
            </Col>
        </Row>
        <Row gutter={{ xs: 8, sm: 12, md: 16, lg: 36 }}>
            <Col span={24}>
                <Form.Item
                    label={t("citadAccount:fullAfAccountNumber")}
                    name={["fullAfAccountNumber"]}
                    rules={[{ required: true, message: t("form:validate:required") }]}
                >
                    <Select placeholder={t("citadAccount:inputData:fullAfAccountNumber")} options={selectFullAfAccountNumber} />
                </Form.Item>
            </Col>
        </Row>
        <Row gutter={{ xs: 8, sm: 12, md: 16, lg: 36 }}>
            <Col span={24}>
                <Form.Item
                    label={t("citadAccount:description")}
                    name={["description"]}
                // rules={[{ required: true, message: t("form:validate:required") }]}
                >
                    <TextArea rows={4} placeholder={t("citadAccount:inputData:description")} />
                </Form.Item>
            </Col>
        </Row>
    </div>)
}