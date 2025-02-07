import { Form, Modal, Spin } from "antd"
import { BankConfigForm } from "./Form/BankConfigForm";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import { useForm } from "antd/es/form/Form";
import { getTempBankConfigDetail } from "@services/BankService";

export const BankConfigDetail = ({
    isOpen = false,
    setOpen,
    id
}: {
    isOpen: boolean,
    setOpen: any,
    id: number,
}) => {
    const { t } = useTranslation();
    const [isLoading, setLoading] = useState(true);
    const [formRef] = useForm();
    const [data, setData] = useState(null);
    const initBankConfigDetail = async (id: number ) => {
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

    const handleOk = (e: React.MouseEvent<HTMLElement>) => {
        setOpen(false);
    };

    const handleCancel = (e: React.MouseEvent<HTMLElement>) => {
        setOpen(false);
    };

    return (<div>
        <Modal title={t("menu:bankConfig:detail")}
            open={isOpen}
            onOk={handleOk}
            onCancel={handleCancel}
            okText={t("button:save")}
            cancelText={t("button:close")}
            width={1000}
            maskClosable={false}
            okButtonProps={{
                style: {
                   display: "none"
                }
            }}
            cancelButtonProps={{
                style: {
                    marginTop: "8px",
                    width: "150px",
                    background: "#EAECF0",
                    color: "#000",
                    font: "Segoe UI",
                    borderColor: "#EAECF0"
                },
                className: "ant-btn-close"
            }}
        >
            <hr />
            {(!data) ? <Spin /> : <Form
                form={formRef}
                layout="horizontal"
                labelCol={{ span: 10 }}
                wrapperCol={{ span: 14 }}
                labelAlign="left"
                className="mt-4"
            >
                <BankConfigForm isUpdate={false} />
                <hr />
            </Form>}
        </Modal>
    </div>)
}