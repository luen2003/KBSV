import { useEffect, useState } from "react";

import { Button, Col, Form, Modal, Row, Spin } from "antd"
import { useForm } from "antd/es/form/Form";
import { useTranslation } from "react-i18next";

import { RoleForm } from "./Form/RoleForm";
import { getRoleDetail } from "@services/RoleService";
import { Btn } from "@components/common/Btn";
import ModalAccessControl from "./ModalAccessControl";
import ModalAssignGroup from "./ModalAssignGroup";


export const RoleDetail = ({
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
    const [isOpenModalAccessControl, setIsOpenModalAccessControl] = useState<boolean>(false);
    const [isOpenModalAssignGroup, setIsOpenModalAssignGroup] = useState<boolean>(false);
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

    const handleOk = (e: React.MouseEvent<HTMLElement>) => {
        setOpen(false);
    };

    const handleCancel = (e: React.MouseEvent<HTMLElement>) => {
        setOpen(false);
    };

    return (<div>
        <Modal title={t("role:title:detail")}
            open={isOpen}
            onOk={handleOk}
            onCancel={handleCancel}
            width={600}
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
                <RoleForm
                    isUpdate={false}
                    setIsOpenModalAccessControl={setIsOpenModalAccessControl}
                    setIsOpenModalAssignGroup={setIsOpenModalAssignGroup}
                />
                <hr />
                <div className="ant-modal-footer">
                    <Btn className="ant-btn-close" onClick={handleCancel}>{t("button:close")}</Btn>
                </div>
            </Form>}
        </Modal>
        {isOpenModalAccessControl && <ModalAccessControl
            role={data}
            isOpen={isOpenModalAccessControl}
            setIsOpen={setIsOpenModalAccessControl}
            isUpdate={false}
        />}
        {isOpenModalAssignGroup && <ModalAssignGroup
            role={data}
            isOpen={isOpenModalAssignGroup}
            setIsOpen={setIsOpenModalAssignGroup}
            isUpdate={false}
        />}
    </div>)
}