import BlockUi from "@availity/block-ui";
import { Spinner } from "@components/common";
import { getAfAccountNumberByCustodycd, getBankAccByAfAccountNumber } from "@services/DBInterfaceService";
import { Form, FormInstance, Input, Select } from "antd";
import { debounce } from "lodash";
import { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next"

export const AccountBlackListForm = (
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

    const onAfAccountNumberChange = async (value: any) => {
        /**
         * Reset value
         */
        form.setFieldsValue({
            beneficiaryAccountName: null,
            beneficiaryAccountNumber: null,
            beneficiaryBankName: null,
            beneficiaryBranchName: null,
        });

        /**
         * 
         */
        const afAccountNumber: string = value;
        const option = afOptions.find(afAccount => afAccount.value == afAccountNumber);
        if (option) {
            form.setFieldValue("customerName", option.fullName);
        }
        await initBankAccOptions();
    }

    const onBankAccountChange = (value: any) => {
        const REG_ACCTNO: string = value;
        if (!REG_ACCTNO) return;
        const option = bankAccOptions.find(afAccount => afAccount.value == REG_ACCTNO);
        if (option) {
            form.setFieldValue("beneficiaryBankName", option.bankName);
            form.setFieldValue("beneficiaryBranchName", option.branchName);
            form.setFieldValue("beneficiaryAccountName", option.customerName);
        }
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
        <BlockUi blocking={isLoading} loader={<Spinner />}>
            <Form.Item
                label={t("blacklist:accountNumber")}
                name={["accountNumber"]}
                rules={[
                    { required: true, message: t("form:validate:required") },
                    { max: 10, message: t("form:validate:lengthMax", { len: 10 }) },
                ]}
            >
                <Input disabled={!isUpdate} style={{ width: '100%' }} placeholder={t("blacklist:inputData:accountNumber")} onChange={debounceOnCustodycdChange} />
            </Form.Item>

            <Form.Item
                label={t("blacklist:afAccountNumber")}
                name={["afAccountNumber"]}
                rules={[{ required: true, message: t("form:validate:required") }]}
            >
                <Select disabled={!isUpdate} options={afOptions} placeholder={t("blacklist:inputData:afAccountNumber")} onChange={onAfAccountNumberChange} />
            </Form.Item>

            <Form.Item
                label={t("blacklist:customerName")}
                name={["customerName"]}
                rules={[
                    { required: true, message: t("form:validate:required") },
                    { max: 100, message: t("form:validate:lengthMax", { len: 100 }) },
                ]}
            >
                <Input disabled={true} placeholder={t("blacklist:inputData:customerName")} />
            </Form.Item>

            <Form.Item
                label={t("blacklist:beneficiaryAccountNumber")}
                name={["beneficiaryAccountNumber"]}
                rules={[{ required: true, message: t("form:validate:required") }]}
                style={{ textWrap: "wrap" }}
            >
                <Select disabled={!isUpdate} placeholder={t("blacklist:inputData:beneficiaryAccountNumber")}
                    options={bankAccOptions} onChange={onBankAccountChange}
                    // popupMatchSelectWidth={false}
                    // dropdownStyle={{ textWrap: "wrap" }}
                />
            </Form.Item>

            <Form.Item
                label={t("blacklist:beneficiaryAccountName")}
                name={["beneficiaryAccountName"]}
                rules={[
                    // { required: true, message: t("form:validate:required") },
                    { max: 100, message: t("form:validate:lengthMax", { len: 100 }) },
                ]}
            >
                <Input disabled={true} placeholder={t("blacklist:inputData:beneficiaryAccountName")} />
            </Form.Item>

            <Form.Item
                label={t("blacklist:beneficiaryBankName")}
                name={["beneficiaryBankName"]}
                rules={[
                    // { required: true, message: t("form:validate:required") },
                    { max: 100, message: t("form:validate:lengthMax", { len: 100 }) },
                ]}

            >
                <Input disabled={true} placeholder={t("blacklist:inputData:beneficiaryBankName")} />
            </Form.Item>

            <Form.Item
                label={t("blacklist:beneficiaryBranchName")}
                name={["beneficiaryBranchName"]}
                rules={[
                    // { required: true, message: t("form:validate:required") },
                    { max: 100, message: t("form:validate:lengthMax", { len: 100 }) },
                ]}
            >
                <Input disabled={true} placeholder={t("blacklist:inputData:beneficiaryBranchName")} />
            </Form.Item>
        </BlockUi>
    </div>)
}