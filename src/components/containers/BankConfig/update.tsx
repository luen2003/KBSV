import { Button, Form, Modal, Spin } from "antd"
import { BankConfigForm } from "./Form/BankConfigForm";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import { useForm } from "antd/es/form/Form";
import { getTempBankConfigDetail, updateTempBankConfig } from "@services/BankService";
import toast from "react-hot-toast";

export const BankConfigUpdate = ({
    isOpen = false,
    setOpen,
    id,
    reloadTable,
}: {
    isOpen: boolean,
    setOpen: any,
    id: number,
    reloadTable?: any
}) => {
    const { t } = useTranslation();
    const [isLoading, setLoading] = useState(false);
    const [formRef] = useForm();

    const [data, setData] = useState<any>(null);
    const initBankConfigDetail = async (id: number) => {
        try {
            const res: any = await getTempBankConfigDetail(id);
            setData(res?.value);
        } catch (e) {

        } finally {
            setLoading(false);
        }
    }
    useEffect(() => {
        if (id) initBankConfigDetail(id);
    }, [id]);
    useEffect(() => {
        formRef.setFieldsValue(data);
    }, [data])

    const handleCancel = (e: React.MouseEvent<HTMLElement>) => {
        formRef.resetFields();
        setOpen(false);
    };

    // const onSubmitUpdateForm = async (values: any) => {
    //     delete values["bank"];
    //     let bankConfigId = data.id;
    //     values.id = bankConfigId;

    //     // Check if data is not changed
    //     if (Object.entries(values).every(([key, value]) => data[key] === value)) {
    //         toast.error(`${t("common:update:noChangedData")}`);
    //         return;
    //     }
    //     // Call API update
    //     try {
    //         const res = await updateTempBankConfig(values);
    //         if (!res.errorCode) toast.success(`${t("common:update:success")}`);
    //     } catch (e) {
    //         toast.success(`${t("common:update:fail")}`);
    //     }
    //     if (reloadTable) reloadTable();
    // }

    const onFinish = async (values: any) => {
        setLoading(true);
        try {
            // await onSubmitUpdateForm(values);
            delete values["bank"];
            let bankConfigId = data.id;
            values.id = bankConfigId;

            // Check if data is not changed
            if (Object.entries(values).every(([key, value]) => data[key] === value)) {
                toast.error(`${t("common:update:noChangedData")}`);
                return;
            }
            // Call API update
            const res = await updateTempBankConfig(values);
            if (!res.errorCode) {
                toast.success(`${t("common:update:success")}`);
                setOpen(false);
                formRef.resetFields();
                if (reloadTable) reloadTable();
            }
        } catch (e) {
            console.log(e);
            toast.error(`${t("common:update:fail")}`);
        } finally {
            setLoading(false);
        }
    };

    return (<div>
        <Modal title={t("menu:bankConfig:update")}
            open={isOpen}
            onCancel={handleCancel}
            width={1000}
            footer={[]}
            maskClosable={false}
        >
            <hr />
            {(!data) ? <Spin /> : <Form
                form={formRef}
                layout="horizontal"
                onFinish={onFinish}
                labelCol={{ span: 10 }}
                wrapperCol={{ span: 14 }}
                labelAlign="left"
                className="mt-4"
            >
                <BankConfigForm isUpdate={true} />
                <hr />
                <div className="ant-modal-footer">
                    <Button className="ant-btn-close" style={{ marginTop: "8px", width: "150px", background: "#EAECF0", borderColor: "#EAECF0", color: "#000" }}
                        key="close" onClick={handleCancel}>
                        {t("button:close")}
                    </Button>
                    <Button style={{ width: "150px", background: "#3485FC", color: "#fff", font: "Segoe UI" }}
                        type="primary" htmlType="submit" loading={isLoading} >
                        {t("button:save")}
                    </Button>
                </div>
            </Form>}
        </Modal>
    </div>)
}