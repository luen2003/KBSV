import { Button, Col, Form, Modal, Row, Spin } from "antd"
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import { useForm } from "antd/es/form/Form";
import toast from "react-hot-toast";
import { RoleFormCreate } from "./Form/RoleFormCreate";
import { saveRole } from "@services/RoleService";
import { Btn } from "@components/common/Btn";

export const RoleCreate = ({
  isOpen = false,
  setOpen,
  reloadTable
}: {
  isOpen: boolean,
  setOpen: any,
  reloadTable: any,

}) => {
  const { t } = useTranslation();
  const [isLoading, setLoading] = useState(false);
  const [formRef] = useForm();
  const [data, setData] = useState(null);

  useEffect(() => {
    formRef.setFieldsValue(data);
  }, [data])

  const handleOk = async (e: React.MouseEvent<HTMLElement>) => {
    formRef.resetFields();
    setOpen(false);
  };

  const handleCancel = (e: React.MouseEvent<HTMLElement>) => {
    formRef.resetFields();
    setOpen(false);
  };

  // const onSubmitCreateForm = async (values: any) => {
  //   const res = await saveRole(values);
  //   if (!res.errorCode) {
  //     toast.success(`${t("common:create:success")}`);
  //     formRef.resetFields();
  //   } else {
  //     console.log(JSON.stringify(res));
  //     formRef.resetFields();
  //     // toast.error(`${t("common:create:fail")}`);
  //     return;
  //   }
  // }

  const onFinish = async (values: any) => {
    console.log(values)
    setLoading(true);
    try {
      // await onSubmitCreateForm(values)
      const res = await saveRole(values);
      if (!res.errorCode) {
        toast.success(`${t("common:create:success")}`);
        setOpen(false);
        formRef.resetFields();
        if (reloadTable) reloadTable();
      }
    } catch (e) {
      console.log(e);
      toast.error(`${t("common:create:fail")}`);
      return;
    } finally {
      setLoading(false);
    }
  };

  return (<div>
    <Modal title={t("role:title:create")}
      open={isOpen}
      onCancel={handleCancel}
      okText={t("button:save")}
      cancelText={t("button:close")}
      width={650}
      footer={[]}
      maskClosable={false}
    >
      <hr />
      <br />
      <Form
        form={formRef}
        layout="horizontal"
        onFinish={onFinish}
        labelCol={{ span: 10 }}
        wrapperCol={{ span: 14 }}
        labelAlign="left"
      >
        <RoleFormCreate />
        <hr />
        <div className="ant-modal-footer">
          <Btn className="ant-btn-close" onClick={handleCancel}>{t("button:close")}</Btn>
          <Btn type="primary" htmlType="submit" loading={isLoading} className="bg-color-blue">
            {t("button:confirm")}
          </Btn>
        </div>
      </Form>
    </Modal>
  </div>)
}