import { Button, Form, Modal, Popconfirm, Spin } from "antd"
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import { useForm } from "antd/es/form/Form";
import { CitadAccountFormCreate } from "./Form/CitadAccountFormCreate";
import { debounce } from "lodash";
import { getSubAccountNumberByAccountNumber } from "@services/CustomerService";
import { createCitadAccount } from "@services/CitadAccountService";
import toast from "react-hot-toast";

type ResponseAccNo = {
    code: number
    errorCode: string
    transactionTime: number
    mesage: string
    value: Array<{
        acctNo: string
        cdContent: string
        custodycd: string
        fullName: string
        typeName: string
    }>
}

export const CitadAccountCreate = ({
    isOpen = false,
    setOpen,
    reloadTable,
}: {
    isOpen: boolean,
    setOpen: any,
    reloadTable?: any,
}) => {
    const { t } = useTranslation();
    const [isLoading, setLoading] = useState(false);
    const [formRef] = useForm();
    const [listAccNos, setListAccNos] = useState([]);

    const handleOk = (e: React.MouseEvent<HTMLElement>) => {
        setOpen(false);
    };

    const handleCancel = (e: React.MouseEvent<HTMLElement>) => {
        setOpen(false);
    };

    const onCreate = async (values: any) => {
        if (values.fullAfAccountNumber) {
            listAccNos.find((item: any) => {
                if (item.value === values.fullAfAccountNumber) {
                    values.afAccountNumber = item.value
                    values.fullAfAccountNumber = item.label
                }
            })
        }
        setLoading(true);
        try {
            let createdCitadAccount = await createCitadAccount(values);
            if (createdCitadAccount?.code === 0) {
                setOpen(false);
                formRef.resetFields();
                toast.success(`${t("common:create:success")}`);
                if (reloadTable) reloadTable();
            }
        } catch (e) {
            console.log(e);
            toast.error(`${t("common:create:fail")}`);
            return;
        } finally {
            setLoading(false);
        }
    };

    const fetchAccountInfo = debounce(async (value) => {
        const params = { "accountNumber": value }
        let responseAccNo: ResponseAccNo = await getSubAccountNumberByAccountNumber(params)

        if (responseAccNo.code === 0) {
            let customerName = responseAccNo.value[0].fullName
            let listAccNos: any = []
            for (let account of responseAccNo.value) {
                listAccNos.push({
                    value: account.acctNo, label: account.acctNo + " - " + account.custodycd + account.typeName
                })
            }
            formRef.setFieldValue("customerName", customerName)
            setListAccNos(listAccNos)
        }

    }, 1500);

    const onValuesChange = (changedValues: any) => {
        if (changedValues.accountNumber) {
            fetchAccountInfo(changedValues.accountNumber);
        }
    }

    useEffect(() => {
        formRef.resetFields();
    }, [isOpen]);

    return (<div>
        <Modal title={t("menu:citadAccount:create")}
            open={isOpen}
            onOk={handleOk}
            onCancel={handleCancel}
            okText={t("button:save")}
            cancelText={t("button:close")}
            width={600}
            maskClosable={false}
            okButtonProps={{
                style: {
                    display: "none",
                }
            }}
            cancelButtonProps={
                {
                    style: {
                        display: "none",
                    }
                }
            }
        >
            <hr />
            {<Form
                form={formRef}
                layout="horizontal"
                labelCol={{ span: 10 }}
                wrapperCol={{ span: 14 }}
                labelAlign="left"
                onFinish={onCreate}
                onValuesChange={onValuesChange}
                className="mt-4"
            >
                <CitadAccountFormCreate selectFullAfAccountNumber={listAccNos} />
                <hr />
                <div className="ant-modal-footer">
                    <Button className="ant-btn-close" style={{ marginTop: "8px", width: "150px", background: "#EAECF0" }} onClick={handleCancel}>{t("button:close")}</Button>
                    <Button style={{ width: "150px", background: "#3485FC" }} htmlType="submit" type="primary"
                        className="text-gray-013 bg-color-blue mb-3">{t("button:confirm")}</Button>
                </div>
            </Form>}
        </Modal>
    </div>)
}