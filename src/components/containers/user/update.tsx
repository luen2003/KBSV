import { Button, Form, Modal, Spin } from "antd"
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import { useForm } from "antd/es/form/Form";
import toast from "react-hot-toast";
import { getUserDetail, updateUser } from "@services/user.service";
import { UserUpdateForm } from "./form/user-update-form";
import { Btn } from "@components/common/Btn";

export const UserUpdate = ({
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
    const initUserDetail = async (id: number) => {
        try {
            const res: any = await getUserDetail(id);
            setData(res?.value);
        } catch (e) {

        } finally {
            setLoading(false);
        }
    }
    useEffect(() => {
        if (id) initUserDetail(id);
    }, [id]);
    useEffect(() => {
        formRef.setFieldsValue(data);
    }, [data])

    const handleCancel = (e: React.MouseEvent<HTMLElement>) => {
        formRef.resetFields();
        setOpen(false);
    };

    const onSubmitUpdateForm = async (values: any) => {
        try {
            const res = await updateUser(data.id, values);
            if (!res.errorCode) {
                toast.success(`${t("common:update:success")}`);
                if (reloadTable) reloadTable();
            }
        } catch (e) {
            toast.error(`${t("common:update:fail")}`);
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
        <Modal title={t("user:title:update")}
            open={isOpen}
            onCancel={handleCancel}
            width={600}
            footer={[]}
            maskClosable={false}
        >
            <hr className="mb-3" />
            {(!data) ? <Spin /> : <Form
                form={formRef}
                layout="horizontal"
                onFinish={onFinish}
                labelCol={{ span: 10 }}
                wrapperCol={{ span: 14 }}
                labelAlign="left"
            >
                <UserUpdateForm user={data} />
                <hr className="mb-3" />
                <div className="ant-modal-footer">
                    <Btn className="ant-btn-close" style={{ width: "150px" }} onClick={handleCancel}>{t("button:close")}</Btn>
                    <Btn style={{ width: "150px" }} type="primary" htmlType="submit" loading={isLoading} className="bg-color-blue">
                        {t("button:save")}
                    </Btn>
                </div>
            </Form>}
        </Modal>
    </div>)
}