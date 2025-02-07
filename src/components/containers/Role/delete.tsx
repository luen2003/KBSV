import { Button, Col, Form, Modal, Popconfirm, Row, Spin } from "antd"
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import { useForm } from "antd/es/form/Form";
import toast from "react-hot-toast";
import { deleteRole, getRoleDetail } from "@services/RoleService";
import { Btn } from "@components/common/Btn";
import { RoleFormDelete } from "./Form/RoleFormDelete";

export const RoleDelete = ({
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

    const [data, setData] = useState(null);
    const initRoleDetail = async (id: number) => {
        try {
            const res: any = await getRoleDetail(id);
            setData(res?.value);
        } catch (e) {

        } finally {
            setLoading(false);
        }
    }
    useEffect(() => {
        if (id) initRoleDetail(id);
    }, [id]);
    useEffect(() => {
        formRef.setFieldsValue(data);
    }, [data])

    const handleCancel = (e: React.MouseEvent<HTMLElement>) => {
        formRef.resetFields();
        setOpen(false);
    };

    // const onSubmitDeleteForm = async (values: any) => {
    //     if (data && data["id"]) {
    //         values.id = data["id"];
    //         // delete
    //         try {
    //             const res = await deleteRole(values);
    //             if (!res.errorCode) toast.success(`${t("common:delete:success")}`);
    //         } catch (e) {
    //             toast.success(`${t("common:delete:fail")}`);
    //         }
    //         if (reloadTable) reloadTable();
    //     }
    // }

    const onFinish = async (values: any) => {
        setLoading(true);
        try {
            // await onSubmitDeleteForm(values);
            if (data && data["id"]) {
                values.id = data["id"];
                // Call API delete
                const res = await deleteRole(values);
                if (!res.errorCode) {
                    toast.success(`${t("common:delete:success")}`);
                    setOpen(false);
                    formRef.resetFields();
                    if (reloadTable) reloadTable();
                }
            }
        } catch (e) {
            console.log(e);
            toast.error(`${t("common:delete:fail")}`);
            return;
        } finally {
            setLoading(false);
        }
    };

    return (<div>
        <Modal title={t("role:title:delete")}
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
                <RoleFormDelete isUpdate={false} />
                <hr />
                <div className="ant-modal-footer">
                    <Btn className="ant-btn-close" onClick={handleCancel}>{t("button:close")}</Btn>
                    <Btn onClick={onFinish} type="primary" className="bg-color-red">{t("button:delete")}</Btn>
                </div>
            </Form>}
        </Modal>
    </div>)
}