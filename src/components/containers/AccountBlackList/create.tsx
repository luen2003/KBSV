import { getTransferDetail } from "@services/TransferService";
import { useForm } from "antd/es/form/Form";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { Button, Form, Modal, Spin } from "antd";
import { AccountBlackListForm } from "./Form/AccountBlackListForm";
import { createAccountBlacklist } from "@services/BlacklistAccountService";

export const AccountBlackListFormCreate = ({
    isOpen = false,
    setOpen,
    reloadTable,
}: {
    isOpen: boolean,
    setOpen: any,
    reloadTable?: any
}) => {
    const { t } = useTranslation();
    const [isLoading, setLoading] = useState(false);
    const [formRef] = useForm();

    const handleCancel = (e: React.MouseEvent<HTMLElement>) => {
        formRef.resetFields();
        setOpen(false);
    };

    // const onSubmitCreateForm = async (values: any) => {
    //     try {
    //         if (values.accountNumber.length != 10) {
    //             console.log("accountNumber", values.accountNumber.length);
    //             toast.error(`${t("blacklist:inputData:accountNumberInvalid")}`);
    //             return;
    //         }
    //         const res: any = await createAccountBlacklist(values);
    //         if (!res.errorCode) {
    //             toast.success(`${t("common:create:success")}`);
    //         } else {
    //             toast.error(`${t("common:create:fail")}`);
    //             return;
    //         }
    //     } catch (e) {
    //         toast.error(`${t("common:create:fail")}`);
    //         return;
    //     }
    //     if (reloadTable) reloadTable();
    // }

    const onFinish = async (values: any) => {
        setLoading(true);
        try {
            // await onSubmitCreateForm(values);
            if (values.accountNumber.length != 10) {
                toast.error(`${t("blacklist:inputData:accountNumberInvalid")}`);
                return;
            }
            const res: any = await createAccountBlacklist(values);
            if (!res.errorCode) {
                toast.success(`${t("common:create:success")}`);
                setOpen(false);
                formRef.resetFields();
                if (reloadTable) reloadTable();
            }
        } catch (e) {
            console.log(e);
            toast.error(`${t("common:create:fail")}`);
        } finally {
            setLoading(false);
        }
    };
    return (<div>
        <Modal title={t("menu:accountBlacklist:create")}
            open={isOpen}
            onCancel={handleCancel}
            okText={t("button:save")}
            cancelText={t("button:close")}
            width={675}
            footer={[]}
            maskClosable={false}
        >
            <hr />
            <Form
                form={formRef}
                layout="horizontal"
                labelCol={{ span: 10 }}
                wrapperCol={{ span: 14 }}
                labelAlign="left"
                onFinish={onFinish}
                className="mt-4"
            >
                <AccountBlackListForm isUpdate={true} form={formRef} />
                <hr />
                <div className="ant-modal-footer">
                    <Button className="ant-btn-close" style={{ marginTop: "8px", width: "150px", background: "#EAECF0" }} onClick={handleCancel}>{t("button:close")}</Button>
                    <Button style={{ width: "150px", background: "#3485FC" }} type="primary" htmlType="submit" loading={isLoading} className="bg-color-blue">
                        {t("button:confirm")}
                    </Button>
                </div>
            </Form>
        </Modal>
    </div>)
}