import { Form, Modal, Spin } from "antd"
import { useForm } from "antd/es/form/Form";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import dayjs from "dayjs";
import { getWithdrawRefusedByBankDetail } from "@services/withdraw-refused-by-bank.service";
import { WithdrawRefusedByBankDetailForm } from "./form/detail-form";
import moment from "moment";

export const WithdrawRefusedByBankDetail = ({
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
    const [data, setData] = useState<any>(null);
    const initData = async (id: number) => {
        try {
            const res = await getWithdrawRefusedByBankDetail(id);
            const feeTypeValue = t(`transfer:feeTypeValue:${res?.value?.feeType}`) != "feeTypeValue.null" ? t(`transfer:feeTypeValue:${res?.value?.feeType}`) : res?.value?.feeType;
            setData({
                ...res?.value,
                afAccountNumber: res?.value?.afAccountNumber ? `${res?.value?.customerId} - ${res?.value?.afAccountNumber}` : '',
                createdAt: res?.value?.createdAt ? moment(res?.value?.createdAt).format('DD/MM/YYYY') : null,
                txDate: res?.value?.txDate ? moment(res?.value?.txDate).format('DD/MM/YYYY') : null,
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
        <Modal title={t("menu:withdrawTransfer:refusedDetail")}
            open={isOpen}
            onOk={handleOk}
            onCancel={handleCancel}
            okText={t("button:save")}
            cancelText={t("button:close")}
            width={1100}
            height={500}
            maskClosable={false}
            okButtonProps={{
                style: {
                    display: "none",
                }
            }}
            cancelButtonProps={{
                style: {
                    marginTop: "8px",
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
                <WithdrawRefusedByBankDetailForm />
                <hr />
            </Form>}
        </Modal>
    </div>)
}