import { Form, Modal, Spin } from "antd"
import { useForm } from "antd/es/form/Form";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { getTransferDetail } from "@services/TransferService";
import dayjs from "dayjs";
import { UncompletedWithdrawForm } from "./Form/UncompletedWithdrawForm";

export const UncompletedWithdrawDetail = ({
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
            const feeTypeValue = t(`transfer:feeTypeValue:${res?.value?.feeType}`) != "feeTypeValue.null" ? t(`transfer:feeTypeValue:${res?.value?.feeType}`) : res?.value?.feeType;
            setData({
                ...res?.value,
                txDate: res?.value.txDate ? dayjs(res?.value.txDate) : null,
                transferDate: res?.value.transferDate ? dayjs(res?.value.transferDate) : null,
                createdAt: dayjs(res?.value.createdAt),
                afAccountNumber: res?.value?.afAccountNumber ? `${res?.value?.customerId} - ${res?.value?.afAccountNumber}` : '',
                feeType: feeTypeValue,
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
        <Modal title={t("menu:uncompletedWithdraw:detail")}
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
                    marginTop: "8px",
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
                <UncompletedWithdrawForm isUpdate={false} />
                <hr />
            </Form>}
        </Modal>
    </div>)
}