import { Button, Form, Modal, Spin } from "antd"
import { useForm } from "antd/es/form/Form";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { getTransferDetail, requestCompleteUncompletedWithdraw } from "@services/TransferService";
import dayjs from "dayjs";
import { UncompletedWithdrawForm } from "./Form/UncompletedWithdrawForm";
import toast from "react-hot-toast";

export const UncompletedWithdrawUpdate = ({
    isOpen = false,
    setOpen,
    id,
    reloadTable,
}: {
    isOpen: boolean,
    setOpen: any,
    id: number,
    reloadTable?: any,
}) => {
    const { t } = useTranslation();
    const [isLoading, setLoading] = useState(true);
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
            });
        } catch (e) {

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

    const handleOk = (e: React.MouseEvent<HTMLElement>) => {
        setOpen(false);
    };

    const handleCancel = (e: React.MouseEvent<HTMLElement>) => {
        setOpen(false);
    };
    const onFinish = async (values: any) => {
        if (!data) return;
        try {
            const res: any = await requestCompleteUncompletedWithdraw(data.id);
            if (!res.errorCode) {
                toast.success(`${t("uncompletedWithdrawTransfer:textUpdate:success")}`);
                if (reloadTable) reloadTable();
            }
        } catch (e) {
            toast.error(`${t("uncompletedWithdrawTransfer:textUpdate:fail")}`);
        } finally {
            setOpen(false);
        }
    }

    return (<div>
        <Modal title={t("menu:uncompletedWithdraw:update")}
            open={isOpen}
            onOk={handleOk}
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
                <UncompletedWithdrawForm isUpdate={false} />
                <hr />
                <div className="ant-modal-footer">
                    <Button style={{ marginTop: "8px", width: "150px", background: "#EAECF0" }} onClick={handleCancel}>{t("button:close")}</Button>
                    <Button style={{ width: "150px", background: "#25B770" }} type="primary" htmlType="submit" loading={isLoading} className="bg-color-green">
                        {t("button:confirm")}
                    </Button>
                </div>
            </Form>}
        </Modal>
    </div>)
}