import { Button, Form, Modal, Spin } from "antd"
import { useForm } from "antd/es/form/Form";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import dayjs from "dayjs";
import { AccountBlackListForm } from "./Form/AccountBlackListForm";
import { deleteAccountBlacklist, getAccountBlackListDetail } from "@services/BlacklistAccountService";
import toast from "react-hot-toast";

export const AccountBlackListDelete = ({
    isOpen = false,
    setOpen,
    id,
    reloadTable,
}: {
    isOpen: boolean,
    setOpen: any,
    id: number,
    reloadTable: any,
}) => {
    const { t } = useTranslation();
    const [isLoading, setLoading] = useState(true);
    const [formRef] = useForm();
    const [data, setData] = useState<any>(null);
    const initData = async (id: number) => {
        if (formRef) formRef.resetFields();
        try {
            const res = await getAccountBlackListDetail(id);
            setData({
                ...res?.value,
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

    const onFinish = async (values: any) => {
        try {
            setLoading(true);
            const res = await deleteAccountBlacklist(data?.id);
            if (!res.errorCode) {
                toast.success(`${t("common:delete:success")}`);
                setOpen(false);
                formRef.resetFields();
                if (reloadTable) reloadTable();
            }
        } catch (e) {
            console.log(e);
            toast.success(`${t("common:delete:fail")}`);
        } finally {
            // formRef.resetFields();
            // setOpen(false);
            setLoading(false);
        }
    };

    const handleCancel = (e: React.MouseEvent<HTMLElement>) => {
        setOpen(false);
    };

    return (<div>
        <Modal title={t("menu:accountBlacklist:delete")}
            open={isOpen}
            onCancel={handleCancel}
            okText={t("button:save")}
            cancelText={t("button:close")}
            width={675}
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
                <AccountBlackListForm data={data} form={formRef} isUpdate={false} />
                <hr />
                <div className="ant-modal-footer">
                    <Button style={{ marginTop: "8px", width: "150px", background: "#EAECF0" }} onClick={handleCancel}>{t("button:close")}</Button>
                    <Button style={{ width: "150px", background: "#FF453A" }} type="primary" htmlType="submit" loading={isLoading} className="bg-color-red">
                        {t("button:delete")}
                    </Button>
                </div>
            </Form>}
        </Modal>
    </div>)
}