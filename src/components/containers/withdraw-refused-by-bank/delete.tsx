import { Button, Form, Modal, Spin } from "antd"
import { useForm } from "antd/es/form/Form";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import dayjs from "dayjs";
import { deleteWithdrawRefuseByBank, getWithdrawRefusedByBankDetail } from "@services/withdraw-refused-by-bank.service";
import { WithdrawRefusedByBankDetailForm } from "./form/detail-form";
import toast from "react-hot-toast";
import moment from "moment";

export const WithdrawRefusedByBankDelete = ({
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
    const initData = async (id: number) => {
        try {
            const res = await getWithdrawRefusedByBankDetail(id);
            setData({
                ...res?.value,
                createdAt: res?.value?.createdAt ? moment(res?.value?.createdAt).format('DD/MM/YYYY') : null,
                txDate: res?.value?.txDate ? moment(res?.value?.txDate).format('DD/MM/YYYY') : null,
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

    const handleOk = async (e: React.MouseEvent<HTMLElement>) => {
        try {
            const res = await deleteWithdrawRefuseByBank(data.id);
            if (!res.errorCode) {
                toast.success(`${t("common:update:success")}`);
                if (reloadTable) reloadTable();
            }
        } catch (e) {
            toast.error(`${t("common:update:fail")}`);
        } finally {
            formRef.resetFields();
            setOpen(false);
        }
        setOpen(false);
    };

    const handleCancel = (e: React.MouseEvent<HTMLElement>) => {
        setOpen(false);
    };

    return (<div>
        <Modal title={t("menu:withdrawTransfer:refusedDetail")}
            open={isOpen}
            onCancel={handleCancel}
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
                    display: "none",
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
                <hr />
                <div className="ant-modal-footer">
                    <Button className="ant-btn-close" style={{ marginTop: "8px", width: "150px", background: "#EAECF0" }} onClick={handleCancel}>{t("button:close")}</Button>
                    <Button style={{ width: "150px", background: "#FF453A" }} type="primary" onClick={handleOk} loading={isLoading} className="bg-color-red">
                        {t("button:delete")}
                    </Button>
                </div>
            </Form>}
        </Modal>
    </div>)
}