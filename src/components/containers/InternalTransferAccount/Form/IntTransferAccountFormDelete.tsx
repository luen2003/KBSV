
import { Button, Col, Form, Input, InputNumber, Row, Select } from "antd"
import { useTranslation } from "react-i18next"

export const InternalTransferAccountFormDetail = ({ isViewAccount = false }: { isViewAccount: boolean }) => {
    const { t } = useTranslation();


    return (<div>
        <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }} className="mt-4">
            <Col span={24}>
                <Form.Item
                    label={t('intTransferAccount:bank')}
                    name="bank"                
                    rules={[]}
                >
                    <Input
                        allowClear={true}
                        disabled={true}
                    />
                </Form.Item>
            </Col>

        </Row>
        <Row>
            <Col span={24}>
                <Form.Item
                    label={t('intTransferAccount:type:form')}
                    name="type"
                >
                    <Input
                        disabled={true}
                    />
                </Form.Item>
            </Col>
        </Row>

        {isViewAccount && (
                <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }} className="mt-2">
                    <Col span={24}>
                        <Form.Item
                            label={t("intTransferAccount:account")}
                            name="accountNumber"
                        >
                            <Input
                                placeholder={t("intTransferAccount:account")}
                                disabled={true}
                            />
                        </Form.Item>
                    </Col>
                </Row>
            )}
    </div>)
}