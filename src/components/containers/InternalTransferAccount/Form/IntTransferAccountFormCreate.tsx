import { getAfAccountNumberByCustodycd } from "@services/DBInterfaceService";
import { Button, Col, Form, Input, InputNumber, Row, Select } from "antd"
import { debounce } from "lodash";
import { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next"


export const InternalTransferAccountFormCreate = ({ bankOptions }: { bankOptions?: any }) => {
    const { t } = useTranslation();
    const [types, setType] = useState<String[]>(["ALL", "ACCOUNT"]);
    const [selectedType, setSelectedType] = useState(types[0]);

    const handleTypeChange = (value: any) => {
        setSelectedType(value);
    };

    const validateAccountNumber = useCallback(
        debounce(async (value: string) => {
            if (value.length < 10) return;
            console.log("Call API to validate account number:", value);
            try {
                const afAccount = await getAfAccountNumberByCustodycd(value);
                console.log("API Response:", afAccount);
            } catch (error) {
                console.error("Error validating account number:", error);
            }
        }, 500),
        []
    );

    return (<div>
        <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }} className="mt-4">
            <Col span={24}>
                <Form.Item
                    label={t('intTransferAccount:bank')}
                    name="bank"
                    rules={[{ required: true, message: t("form:validate:required") }]}
                >
                    <Select
                        options={bankOptions}
                        allowClear={true}
                        showSearch={true}
                        filterOption={(input, option) => {
                            const label = option?.label;
                            if (typeof label === 'string') {
                                return label.toLowerCase().includes(input.toLowerCase());
                            }
                            return false;
                        }}
                    />
                </Form.Item>
            </Col>

        </Row>
        <Row>
            <Col span={24}>
                <Form.Item
                    label={t('intTransferAccount:type:form')} className="text-dark"
                    name="type"
                    rules={[{ required: true, message: t("form:validate:required") }]}
                >
                    <Select
                        options={types.map(type => ({ value: type, label: t(`intTransferAccount:type:${type}`) }))}
                        defaultValue={"----- Chọn loại tài khoản ----"}
                        onChange={handleTypeChange}
                    />
                </Form.Item>
            </Col>
        </Row>

        {selectedType === "ACCOUNT" && (
            <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }} className="mt-2">
                <Col span={24}>
                    <Form.Item
                        label={t("intTransferAccount:account")}
                        name="accountNumber"
                        rules={[
                            { required: true, message: t("form:validate:required") },
                            { max: 10, message: t("form:validate:lengthMax", { len: 10 }) }
                        ]}
                    >
                        <Input
                            placeholder={t("intTransferAccount:account")}
                            onChange={(e) => validateAccountNumber(e.target.value)}
                        />
                    </Form.Item>
                </Col>
            </Row>
        )
        }
    </div >)
}