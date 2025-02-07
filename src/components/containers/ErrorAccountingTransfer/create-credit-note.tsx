import { getTransferDetail } from "@services/TransferService";
import { useForm } from "antd/es/form/Form";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { TransferForm } from "./Form/TransferForm";
import { Button, Form, Modal, Spin } from "antd";
import { createCreditNote } from "@services/CreditNoteService";

export const CreateCreditNote = ({
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
    const initData = async (id: number) => {
        try {
            const res = await getTransferDetail(id);
            setData({
                ...res?.value,
                txDate: res?.value.txDate ? dayjs(res?.value.txDate) : null,
                transferDate: res?.value.transferDate ? dayjs(res?.value.transferDate) : null,
                createdAt: dayjs(res?.value.createdAt),
                flexConfirm: typeof res?.value.flexConfirm === 'string'
                    ? JSON.parse(res?.value.flexConfirm)
                    : res?.value.flexConfirm,
                requestId: res?.value.requestId.split("-") ? res?.value.requestId.split("-")[1] : res?.value.requestId,
                customerId: res?.value?.afAccountNumber?.length > 10 ? `${res?.value?.customerId} - ${res?.value?.afAccountNumber}` : null
            });
        } catch (e) {
            console.log(e);
        } finally {
            setLoading(false);
        }
    }
    useEffect(() => {
        if (id) initData(id);
    }, [id]);
    useEffect(() => {
        formRef.setFieldsValue(data);
    }, [data])

    const handleCancel = (e: React.MouseEvent<HTMLElement>) => {
        formRef.resetFields();
        setOpen(false);
    };

    const onSubmitUpdateForm = async (values: any) => {
        let id = data.id;
        try {
            const res: any = await createCreditNote({ id: id });
            if (!res.errorCode) {
                toast.success(`${t("common:createCreditNote:success")}`);
                if (reloadTable) reloadTable();
            }
        } catch (e) {
            toast.error(`${t("common:createCreditNote:fail")}`);
        }
    }

    const onFinish = async (values: any) => {
        setLoading(true);
        try {
            await onSubmitUpdateForm(values);
            setOpen(false);
        } catch (e) {
            console.log(e);
        } finally {
            formRef.resetFields();
            setLoading(false);
        }
    };
    return (<div>
        <Modal title={t("menu:errorAccountingTransfer:createCreditNote")}
            open={isOpen}
            onCancel={handleCancel}
            okText={t("button:save")}
            cancelText={t("button:close")}
            width={1000}
            footer={[]}
            maskClosable={false}
        >
            <hr />
            {(!data) ? <Spin /> : <Form
                form={formRef}
                layout="horizontal"
                labelCol={{ span: 10 }}
                wrapperCol={{ span: 14 }}
                labelAlign="left"
                onFinish={onFinish}
                className="mt-4"
            >

                <TransferForm isUpdate={false} />
                <hr />

                <div className="ant-modal-footer">
                    <Button style={{ marginTop: "8px", width: "150px", background: "#EAECF0" }} onClick={handleCancel}>{t("button:close")}</Button>
                    <Button style={{ width: "150px", background: "#25B770" }} type="primary" htmlType="submit" loading={isLoading} className="bg-color-green">
                        {t("button:createCreditNote")}
                    </Button>
                </div>
            </Form>}
        </Modal>
    </div>)
}