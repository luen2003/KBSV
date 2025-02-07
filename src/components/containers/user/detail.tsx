import { Form, Modal, Spin } from "antd"
import { useForm } from "antd/es/form/Form";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import dayjs from "dayjs";
import { UserForm } from "./form/user-form";
import { getUserDetail } from "@services/user.service";
import { Btn } from "@components/common/Btn";

export const UserDetail = ({
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
            const res = await getUserDetail(id);
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
        <Modal title={t("user:title:detail")}
            open={isOpen}
            onCancel={handleCancel}
            okText={t("button:save")}
            cancelText={t("button:close")}
            width={750}
            footer={[]}
            maskClosable={false}
        >
            <hr className="mb-3" />
            {(!data) ? <Spin /> : <Form
                form={formRef}
                layout="horizontal"
                labelCol={{ span: 10 }}
                wrapperCol={{ span: 14 }}
                labelAlign="left"
            >
                <UserForm user={data} />
                <hr className="mb-3" />
                <div className="ant-modal-footer">
                    <Btn className="ant-btn-close" style={{ width: "150px" }} onClick={handleCancel}>{t("button:close")}</Btn>
                </div>
            </Form>}
        </Modal>
    </div>)
}