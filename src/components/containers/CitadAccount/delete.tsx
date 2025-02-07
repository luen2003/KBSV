import { Button, Form, Modal, Popconfirm, Spin } from "antd"
import { CitadAccountFormDetail } from "./Form/CitadAccountFormDetail";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import { useForm } from "antd/es/form/Form";
import { getCitadAccountDetail, deleteCitadAccount } from "@services/CitadAccountService";
import toast from "react-hot-toast";
import { QuestionCircleOutlined } from "@ant-design/icons";

export const CitadAccountDelete = ({
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

    const [data, setData] = useState(null);
    const initCitadAccountDetail = async (id: number) => {
        try {
            const res: any = await getCitadAccountDetail(id);
            setData(res?.value);
        } catch (e) {

        } finally {
            setLoading(false);
        }
    }
    useEffect(() => {
        if (id) initCitadAccountDetail(id);
    }, [id]);
    useEffect(() => {
        formRef.setFieldsValue(data);
    }, [data])

    const handleCancel = (e: React.MouseEvent<HTMLElement>) => {
        formRef.resetFields();
        setOpen(false);
    };

    // const onSubmitDeleteForm = async (values: any) => {
    //     delete values["CitadAccount"];
    //     if (data && data["id"]) {
    //         values.id = data["id"];
    //         // delete
    //         try {
    //             const res = await deleteCitadAccount(values);
    //             if (!res.errorCode) toast.success(`${t("common:delete:success")}`);
    //         } catch (e) {
    //             toast.success(`${t("common:delete:fail")}`);
    //         }
    //         if (reloadTable) reloadTable();
    //     }
    // }

    const onFinish = async (values: any) => {
        setLoading(true);
        try {
            delete values["CitadAccount"];
            if (data && data["id"]) {
                values.id = data["id"];
                // Call API delete
                const res = await deleteCitadAccount(values);
                if (!res.errorCode) {
                    toast.success(`${t("common:delete:success")}`);
                    setOpen(false);
                    formRef.resetFields();
                    if (reloadTable) reloadTable();
                }
            }
        } catch (e) {
            console.log(e);
            toast.error(`${t("common:delete:fail")}`);
        } finally {
            setLoading(false);
        }
    };

    return (<div>
        <Modal title={t("menu:citadAccount:delete")}
            open={isOpen}
            onCancel={handleCancel}
            width={600}
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
                <CitadAccountFormDetail />
                <hr />
                <div className="ant-modal-footer">
                    <Button className="ant-btn-close" style={{ marginTop: "8px", width: "150px", background: "#EAECF0", borderColor: "#EAECF0", color: "#000" }}
                        onClick={handleCancel}>
                        {t("button:close")}
                    </Button>
                    <Button style={{ marginTop: "8px", width: "150px", background: "#FF453A" }}
                        onClick={onFinish} type="primary" className="bg-color-red">{t("button:delete")}</Button>
                </div>


            </Form>}
        </Modal>
    </div>)
}