import { Form, Modal, Spin } from "antd"
import { useForm } from "antd/es/form/Form";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { TransferForm } from "./Form/TransferForm";
import { getTransferDetail } from "@services/TransferService";
import dayjs from "dayjs";

export const TransferDetail = ({
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
    return (<div>
        <Modal title={t("menu:errorAccountingTransfer:detail")}
            open={isOpen}
            onOk={handleOk}
            onCancel={handleCancel}
            okText={t("button:save")}
            cancelText={t("button:close")}
            width={1000}
            maskClosable={false}
            okButtonProps={{
                style: {
                   display: "none",
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
            <hr />
            {(!data) ? <Spin /> : <Form
                form={formRef}
                layout="horizontal"
                labelCol={{ span: 10 }}
                wrapperCol={{ span: 14 }}
                labelAlign="left"
                className="mt-4"
            >
                <TransferForm isUpdate={false} />
                <hr />
            </Form>}
        </Modal>
    </div>)
}