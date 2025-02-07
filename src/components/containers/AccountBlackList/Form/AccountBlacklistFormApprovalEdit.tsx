
import { getAfAccountNumberByCustodycd, getBankAccByAfAccountNumber } from "@services/DBInterfaceService";
import { Col, Form, FormInstance, Input, InputNumber, Row, Select } from "antd";
import { debounce } from "lodash";
import { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next"

export const AccountBlacklistFormApprovalEdit = (
    { isUpdate = false, form, data }:
        { isUpdate?: boolean, form: FormInstance<any>, data?: any }
) => {
    const { t } = useTranslation();
    const [isLoading, setIsLoading] = useState(false);
    const [afOptions, setAfOptions] = useState<{
        value: string, label: string, acctNo: string, fullName: string, cdContent: string
    }[]>([]);
    const [bankAccOptions, setBankAccOptions] = useState<{
        value: string, label: string, bankName: string, branchName: string, customerName: string,
    }[]>([]);

    const initAfOptions = async () => {
        if (isLoading) return;
        setIsLoading(true);
        try {
            const custodycd: string = form.getFieldValue("accountNumber");
            if (!custodycd) return;
            if (custodycd.length < 10) return;
            console.log("Call api get af otp");
            const afAccount = await getAfAccountNumberByCustodycd(custodycd)
            if (afAccount.value) {
                setAfOptions(afAccount.value.map((record: any) => ({
                    value: record.acctNo + " - " + record.custodycd + record.typeName,
                    label: record.acctNo + " - " + record.custodycd + record.typeName,
                    acctNo: record.acctNo,
                    fullName: record.fullName,
                    cdContent: record.cdContent,
                })))
            }
        } catch (e) {

        } finally {
            setIsLoading(false);
        }
    }

    const initBankAccOptions = async () => {
        if (isLoading) return;
        setIsLoading(true);
        try {
            const afAccountNumber: string = form.getFieldValue("afAccountNumber");
            if (!afAccountNumber || !afOptions.length) return;
            const option = afOptions.find(afAccount => afAccount.value == afAccountNumber);
            if (option?.acctNo) {
                console.log("Call api get bank otp");
                const bankAcc = await getBankAccByAfAccountNumber(option?.acctNo);
                if (bankAcc?.value) {
                    setBankAccOptions(bankAcc.value.map((record: any) => ({
                        value: record.REG_ACCTNO,
                        label: record.REG_ACCTNO + " - " + record.REG_BENEFICARY_INFO + " - " + record.REG_BENEFICARY_NAME,
                        bankName: record.BANKID.split(".")[0] + " - " + record.REG_BENEFICARY_INFO,
                        branchName: record.CITYBANK,
                        customerName: record.REG_BENEFICARY_NAME,
                    })))
                }
            }
        } catch (e) {

        } finally {
            setIsLoading(false);
        }
    }

    const debounceOnCustodycdChange = useCallback(debounce((e: any) => onCustodycdChange(e), 1000), [])
    const onCustodycdChange = async (e: any) => {
        /**
         * Reset value
         */
        form.setFieldsValue({
            afAccountNumber: null,
            customerName: null,
            beneficiaryAccountName: null,
            beneficiaryAccountNumber: null,
            beneficiaryBankName: null,
            beneficiaryBranchName: null,
        });
        /**
         * Loading new option
         */
        await initAfOptions();
    }

    /**
     * useEffect for case update
     */
    useEffect(() => {
        setAfOptions([]);
        setBankAccOptions([]);
        if (data) {
            form.setFieldsValue(data);
            initAfOptions();
        }
    }, [data]);
    useEffect(() => {
        initBankAccOptions();
    }, [afOptions]);
    /**
     * end case update -------------------------
     */

    return (<div>
        <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
            <Col span={12}>{t("requestOrderAction:commonInfo")}</Col>
            <Col span={12}></Col>
        </Row>
        <Row className="mt-2" gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
            <Col span={12}>
                <Form.Item
                    label="ID"
                    name={["sourceId"]}
                    rules={[]}
                >
                    <Input disabled placeholder="" />
                </Form.Item>
            </Col>
            <Col span={12}>

            </Col>
        </Row>
        <hr />
        <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }} className="mt-2">
            <Col span={12}>{t("requestOrderAction:beforeUpdate")}</Col>
            <Col span={12}>{t("requestOrderAction:afterUpdate")}</Col>
        </Row>
        <br />
        {data?.props?.beforeUpdate?.accountNumber != data?.props?.afterUpdate?.accountNumber && (
            <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                <Col span={12}>
                    <Form.Item
                        label={t("blacklist:accountNumber")}
                        name={["props", "beforeUpdate", "accountNumber"]}
                        rules={[]}
                        required
                    >
                        <Input disabled placeholder="" />
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item
                        label={t("blacklist:accountNumber")}
                        name={["props", "afterUpdate", "accountNumber"]}
                        rules={[]}
                        required
                    >
                        <Input disabled placeholder="" />
                    </Form.Item>
                </Col>
            </Row>
        )}

        {data?.props?.beforeUpdate?.afAccountNumber != data?.props?.afterUpdate?.afAccountNumber && (
            <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                <Col span={12}>
                    <Form.Item
                        label={t("blacklist:afAccountNumber")}
                        name={["props", "beforeUpdate", "afAccountNumber"]}
                        rules={[]}
                        required
                    >
                        <Input disabled placeholder="" />
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item
                        label={t("blacklist:afAccountNumber")}
                        name={["props", "afterUpdate", "afAccountNumber"]}
                        rules={[]}
                        required
                    >
                        <Input disabled placeholder="" />
                    </Form.Item>
                </Col>
            </Row>
        )}

        {data?.props?.beforeUpdate?.customerName != data?.props?.afterUpdate?.customerName && (
            <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                <Col span={12}>
                    <Form.Item
                        label={t("blacklist:customerName")}
                        name={["props", "beforeUpdate", "customerName"]}
                        required
                    >
                        <Input disabled placeholder="" />
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item
                        label={t("blacklist:customerName")}
                        name={["props", "afterUpdate", "customerName"]}
                        required
                    >
                        <Input disabled placeholder="" />
                    </Form.Item>
                </Col>
            </Row>
        )}

        {data?.props?.beforeUpdate?.beneficiaryAccountName != data?.props?.afterUpdate?.beneficiaryAccountName && (
            <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                <Col span={12}>
                    <Form.Item
                        label={t("blacklist:beneficiaryAccountName")}
                        name={["props", "beforeUpdate", "beneficiaryAccountName"]}
                        rules={[]}
                        required
                    >
                        <Input disabled placeholder="" />
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item
                        label={t("blacklist:beneficiaryAccountName")}
                        name={["props", "afterUpdate", "beneficiaryAccountName"]}
                        rules={[]}
                        required
                    >
                        <Input disabled placeholder="" />
                    </Form.Item>
                </Col>
            </Row>
        )}

        {data?.props?.beforeUpdate?.beneficiaryAccountNumber != data?.props?.afterUpdate?.beneficiaryAccountNumber && (
            <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                <Col span={12}>
                    <Form.Item
                        label={t("blacklist:beneficiaryAccountNumber")}
                        name={["props", "beforeUpdate", "beneficiaryAccountNumber"]}
                        rules={[]}
                    >
                        <Input disabled placeholder="" />
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item
                        label={t("blacklist:beneficiaryAccountNumber")}
                        name={["props", "afterUpdate", "beneficiaryAccountNumber"]}
                        rules={[]}
                    >
                        <Input disabled placeholder="" />
                    </Form.Item>
                </Col>
            </Row>
        )}

        {data?.props?.beforeUpdate?.beneficiaryBankName != data?.props?.afterUpdate?.beneficiaryBankName && (
            <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                <Col span={12}>
                    <Form.Item
                        label={t("blacklist:beneficiaryBankName")}
                        name={["props", "beforeUpdate", "beneficiaryBankName"]}
                    >
                        <Input disabled placeholder="" />
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item
                        label={t("blacklist:beneficiaryBankName")}
                        name={["props", "afterUpdate", "beneficiaryBankName"]}
                    >
                        <Input disabled placeholder="" />
                    </Form.Item>
                </Col>
            </Row>
        )}

        {data?.props?.beforeUpdate?.beneficiaryBranchName != data?.props?.afterUpdate?.beneficiaryBranchName && (
            <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                <Col span={12}>
                    <Form.Item
                        label={t("blacklist:beneficiaryBranchName")}
                        name={["props", "beforeUpdate", "beneficiaryBranchName"]}
                    >
                        <Input disabled placeholder="" />
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item
                        label={t("blacklist:beneficiaryBranchName")}
                        name={["props", "afterUpdate", "beneficiaryBranchName"]}
                    >
                        <Input disabled placeholder="" />
                    </Form.Item>
                </Col>
            </Row>
        )}
    </div>)
}