import { Form, Modal, Spin } from "antd"
import { useForm } from "antd/es/form/Form";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import dayjs from "dayjs";
import { AccountBlackListForm } from "./Form/AccountBlackListForm";
import { getAccountBlackListDetail } from "@services/BlacklistAccountService";

export const AccountBlackListDetail = ({
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

    const handleOk = (e: React.MouseEvent<HTMLElement>) => {
        setOpen(false);
    };

    const handleCancel = (e: React.MouseEvent<HTMLElement>) => {
        setOpen(false);
    };

    return (<div>
        <Modal title={t("menu:accountBlacklist:detail")}
            open={isOpen}
            onOk={handleOk}
            onCancel={handleCancel}
            okText={t("button:save")}
            cancelText={t("button:close")}
            width={675}
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
                className="mt-4"
            >
                <AccountBlackListForm data={data} form={formRef} isUpdate={false} />
                <hr />
            </Form>}
        </Modal>
    </div>)
}