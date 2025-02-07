import { getBankConfigMaster, getBankMaster } from "@services/BankService";
import moment from "moment";
import { useEffect, useRef, useState } from "react";
import { Button, Tag, Spin, Form, Select, Row, Col, Input } from "antd";
import _, { parseInt } from "lodash";
import { useTranslation } from "react-i18next";
import "antd/dist/reset.css";
import { getAllBanks, getBalanceQueryAccount } from "@services/BalanceQueryServices";
import { SearchOutlined } from "@ant-design/icons";
import toast from "react-hot-toast";

export interface BankOption {
    value: string;
    label: string;
    name: string;
    active: boolean;
}

export const BalanceQueryIndex = () => {
    const { t } = useTranslation();
    const [isLoading, setIsLoading] = useState(true);
    const [bankCode, setBankCode] = useState<string>('');
    const [bankName, setBankName] = useState<string>('');
    const [status, setStatus] = useState<string>('');
    const [amount, setAmount] = useState<string>('');
    const [bankOptions, setBankOptions] = useState<BankOption[]>([]);

    // Initialize master data on component mount
    const initMasterData = async () => {
        try {
            const banksMaster: any = await getBankConfigMaster({});
            setBankOptions(banksMaster?.items.map((item: any, index: number) => ({
                value: `${item.bank.bankCode}`,
                label: `${item.bank.bankNo} - ${item.bank.bankCode} - ${item.bank.name}`,
                name: item.bank.name,
                active: item.isSupportTransfer
            })));
        } catch (e) {
            console.log(e);
        }
        setIsLoading(false);
    };

    useEffect(() => {
        initMasterData();
    }, []);

    const handleBankCodeChange = (value: string) => {
        setBankCode(value);
        const selectedBank = bankOptions.find(bank => bank.value === value);

        if (selectedBank) {
            setBankName(selectedBank.name);
            formRef.setFieldsValue({ bankName: selectedBank.name });

            setStatus(selectedBank.active == true ? "ACTIVE" : "INACTIVE")
            formRef.setFieldsValue({ status: selectedBank.active == true ? t('balanceQuery:active') : t('balanceQuery:inactive') });
        }
    };

    const handleButtonLockUp = async () => {
        const values = formRef.getFieldsValue();
        const { bankCode } = values;

        if (!bankCode) {
            toast.error('Vui lòng điền đầy đủ thông tin!')
            return;
        }

        try {
            formRef.setFieldsValue({ amount: 'Đang xử lý ...' })

            const body = {
                bankCode,
                bankName,
                bankStatus: status,
            };

            const response = await getBalanceQueryAccount(body);

            if (response && response.value && response.value.balance) {
                const balance = parseInt(response.value.balance).toLocaleString('en-US');
                setAmount(balance);
                formRef.setFieldsValue({ amount: `${balance} (vnđ)` });
            } else {
                console.error('Invalid response:', response);
                formRef.setFieldsValue({ amount: 'Đã có lỗi xảy ra!' })
            }
        } catch (error) {
            console.error('Error fetching balance:', error);
            formRef.setFieldsValue({ amount: 'Đã có lỗi xảy ra!' })
        }
    };

    const [formRef] = Form.useForm();
    if (isLoading) return <Spin />

    return (
        <div className=" px-6 py-6 border-b-gray-010">
            <Form
                form={formRef}
                layout="horizontal"
                labelCol={{ span: 6 }}
                wrapperCol={{ span: 16 }}
                labelAlign="left"
                className="ml-5 mr-5"
            >
                <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }} className="mt-4">
                    <Col span={12}>
                        <Form.Item
                            label={t('balanceQuery:bankCode')}
                            name="bankCode"
                            rules={[{ required: true, message: t("form:validate:required") }]}
                        >
                            <Select
                                options={bankOptions}
                                allowClear={true}
                                showSearch={true}
                                onChange={handleBankCodeChange}
                                optionFilterProp="label"
                                className=" h-[36px]"
                                defaultValue={"--------------------- Chọn mã ngân hàng -------------------"}
                            />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            label={t('balanceQuery:bankName')} className="text-dark"
                            name="bankName"
                        >
                            <Input
                                value={bankName}
                                disabled={true}
                                placeholder="Tên ngân hàng"
                            />
                        </Form.Item>
                    </Col>
                </Row>

                <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }} className="mt-1">
                    <Col span={3}></Col>
                    <Col span={9}>
                        <Button
                            onClick={handleButtonLockUp}
                            htmlType="submit"
                            className="width: 111px height: 36px text-sm shadow bg-blue-500  text-white font-bold "
                        >
                            <SearchOutlined />  {t("balanceQuery:lockUp")}
                        </Button>

                    </Col>
                    <Col span={12}>
                        <Form.Item
                            label={t('balanceQuery:status')}
                            name="status"
                        >
                            <Input
                                value={status}
                                disabled={true}
                                placeholder="Trạng thái ngân hàng"
                            />
                        </Form.Item>
                    </Col>
                </Row>

                <hr />
                <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }} className="mt-5">
                    <Col span={12}>
                        <Form.Item
                            label={t('balanceQuery:amount')}
                            name="amount"
                            className=" text-black font-bold"
                        >
                            <Input
                                value={amount}
                                disabled={true}
                                className="bg-gray-100 text-black font-semibold h-[44px]"
                                placeholder="Số tiền hiện có"
                            />
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
        </div>
    );
};


