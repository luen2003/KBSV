import { Form, Modal, Spin } from "antd"
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import { useForm } from "antd/es/form/Form";
import { deleteInternalTransferAccountById, getInternalTransferAccountDetail } from "@services/InternalTransferAccountServices";
import { InternalTransferAccountFormDetail } from "./Form/IntTransferAccountFormDetail";
import toast from "react-hot-toast";

export const InternalTransferAccountDelete = ({
    isOpen = false,
    setOpen,
    id,
    reloadTable
}: {
    isOpen: boolean,
    setOpen: any,
    id: number,
    reloadTable: any
}) => {
    const { t } = useTranslation();
    const [isLoading, setLoading] = useState(true);
    const [formRef] = useForm();
    const [data, setData] = useState<any>(null);
    const [isViewAccount, setIsViewAccount] = useState(false);
    const initIntTransferAccountDetail = async (id: number) => {
        try {
            const res: any = await getInternalTransferAccountDetail(id);
            res.value.bank = `${res.value.bankId} - ${res.value.bankCode} - ${res.value.bankName}`
            setData(res?.value);
            if (res.value.type === "ACCOUNT") {
                res.value.type = t(`intTransferAccount:type:${res.value.type}`)
                setIsViewAccount(true)
            } else {
                res.value.type = t(`intTransferAccount:type:${res.value.type}`)
            }
        } catch (e) {
            console.log(e);
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

    const handleOk = async (e: React.MouseEvent<HTMLElement>) => {
        try {
            const res = await deleteInternalTransferAccountById(data?.id);
            if (!res.errorCode && res.code == 0) {
                toast.success(`${t("common:delete:success")}`);
                if (reloadTable) reloadTable();
            } else {
                toast.error(`${t("common:delete:fail")}`);
            }
        } catch (e) {
            toast.error(`${t("common:delete:fail")}`);
        }

        setOpen(false);
    };

    const handleCancel = (e: React.MouseEvent<HTMLElement>) => {
        setOpen(false);
    };



    return (<div>
        <Modal title={t("menu:intTransferAccount:delete")}
            open={isOpen}
            onOk={handleOk}
            onCancel={handleCancel}
            okText={t("button:delete")}
            cancelText={t("button:close")}
            width={1000}
            maskClosable={false}
            okButtonProps={{
                style: {
                    marginTop: "8px",
                    width: "150px",
                    background: "#FF453A"
                },
                className: "bg-color-red"
            }}
            cancelButtonProps={{
                style: {
                    width: "150px",
                    background: "#EAECF0",
                    color: "#101828",
                    font: "Segoe UI"
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
            >
                <InternalTransferAccountFormDetail isViewAccount={isViewAccount} />
                <hr />
            </Form>}
        </Modal>
    </div>)
}