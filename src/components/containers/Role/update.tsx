import { Button, Col, Form, Modal, Row, Spin } from "antd"
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import { useForm } from "antd/es/form/Form";
import toast from "react-hot-toast";
import { RoleForm } from "./Form/RoleForm";
import { getRoleDetail, updateRole } from "@services/RoleService";
import ModalAccessControl from "./ModalAccessControl";
import ModalAssignGroup from "./ModalAssignGroup";
import { Btn } from "@components/common/Btn";

export const RoleUpdate = ({
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
    const [isLoading, setLoading] = useState(false);
    const [isOpenModalAccessControl, setIsOpenModalAccessControl] = useState<boolean>(false);
    const [isOpenModalAssignGroup, setIsOpenModalAssignGroup] = useState<boolean>(false);
    const [formRef] = useForm();

    const [data, setData] = useState<any>(null);
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

    // const onSubmitUpdateForm = async (values: any) => {
    //     // update
    //     try {
    //         const res = await updateRole(values);
    //         if (!res.errorCode) toast.success(`${t("common:update:success")}`);
    //     } catch (e) {
    //         toast.success(`${t("common:update:fail")}`);
    //     }
    //     if (reloadTable) reloadTable();
    // }

    const onFinish = async (values: any) => {
        setLoading(true);
        try {
            // await onSubmitUpdateForm(values);
            const res = await updateRole(values);
            if (!res.errorCode) {
                toast.success(`${t("common:update:success")}`);
                setOpen(false);
                formRef.resetFields();
                if (reloadTable) reloadTable();
            }
        } catch (e) {
            console.log(e);
            toast.error(`${t("common:update:fail")}`);
            return;
        } finally {
            setLoading(false);
        }
    };

    return (<div>
        <Modal title={t("role:title:edit")}
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
                <br />
                <RoleForm
                    isUpdate={true}
                    setIsOpenModalAccessControl={setIsOpenModalAccessControl}
                    setIsOpenModalAssignGroup={setIsOpenModalAssignGroup}
                />
                <hr />
                <div className="ant-modal-footer">
                    <Btn className="ant-btn-close" onClick={handleCancel}>{t("button:close")}</Btn>
                    <Btn type="primary" htmlType="submit" loading={isLoading} className="bg-color-blue">
                        {t("button:save")}
                    </Btn>
                </div>
            </Form>}
        </Modal>
        {isOpenModalAccessControl && <ModalAccessControl
            role={data}
            isOpen={isOpenModalAccessControl}
            setIsOpen={setIsOpenModalAccessControl}
            isUpdate={true}
        />}
        {isOpenModalAssignGroup && <ModalAssignGroup
            role={data}
            isOpen={isOpenModalAssignGroup}
            setIsOpen={setIsOpenModalAssignGroup}
            isUpdate={true}
        />}
    </div>)
}