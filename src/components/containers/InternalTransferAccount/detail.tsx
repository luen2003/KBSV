import { Form, Modal, Spin } from "antd"
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import { useForm } from "antd/es/form/Form";
import { getInternalTransferAccountDetail } from "@services/InternalTransferAccountServices";
import { InternalTransferAccountFormDetail } from "./Form/IntTransferAccountFormDetail";

export const InternalTransferAccountDetail = ({
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
    const [isViewAccount, setIsViewAccount] = useState(false);
    const initIntTransferAccountDetail = async (id: number) => {
        try {
            const res: any = await getInternalTransferAccountDetail(id);
            res.value.bank = `${res.value.bankId} - ${res.value.bankCode} - ${res.value.bankName}`
            setData(res?.value);
            
            if (res.value.type === "ACCOUNT") {
                res.value.type = t(`intTransferAccount:type:${res.value.type}`)
                setIsViewAccount(true)
            }else {
                res.value.type = t(`intTransferAccount:type:${res.value.type}`)
                setIsViewAccount(false)
            }
        } catch (e) {

        } finally {
            setLoading(false);
        }
    }
    useEffect(() => {
        if (id) initIntTransferAccountDetail(id);
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
        <Modal title={t("menu:intTransferAccount:detail")}
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
                    width: "150px",
                    background: "#EAECF0",
                    color: "#101828",
                    font: "Segoe UI",
                    marginTop: "8px"
                },
                className: "ant-btn-close"
            }}
        >
            <hr className="mt-4"/>
            {(!data) ? <Spin /> : <Form
                form={formRef}
                layout="horizontal"
                labelCol={{ span: 10 }}
                wrapperCol={{ span: 14 }}
                labelAlign="left"
            >
                <InternalTransferAccountFormDetail isViewAccount={isViewAccount}  />
                <hr />
            </Form>}
        </Modal>
    </div>)
}