import { Button, Form, Modal, Spin } from "antd"
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import { useForm } from "antd/es/form/Form";
import { saveInternalTransferAccount } from "@services/InternalTransferAccountServices";
import toast from "react-hot-toast";
import { InternalTransferAccountFormCreate } from "./Form/IntTransferAccountFormCreate";
import { getBankConfigMaster } from "@services/BankService";

export const InternalTransferAccountCreate = ({
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
  const [banksMaster, setBanksMaster] = useState<any>([]);
  const [bankOptions, setBankOptions] = useState<any>([]);

  // Initialize master data on component mount
  const initMasterData = async () => {
    try {
      const banksMaster: any = await getBankConfigMaster({});
      setBanksMaster(banksMaster.items);
      setBankOptions(banksMaster.items.map((bank: any) => ({
        value: bank.bank.id,
        label: `${bank.bank.bankNo} - ${bank.bank.bankCode} - ${bank.bank.name}`,
      })));
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    initMasterData();
  }, []);

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

  const onSubmitCreateForm = async (values: any) => {
    delete values.bank

    try {
      const res = await saveInternalTransferAccount(values);
      if (!res.errorCode && res.code == 0) {
        toast.success(`${t("common:create:success")}`);
        setOpen(false);
        formRef.resetFields();
        if (reloadTable) reloadTable();
      }
    } catch (e) {
      toast.error(`${t("common:create:fail")}`);
    }
  }

  const onFinish = async (values: any) => {
    setLoading(true);
    try {
      console.log("values", values);
      console.log("bankMaster", banksMaster);

      const bankId = values.bank
      const infoBank = banksMaster.find((bank: any) => bank?.bank?.id === bankId)

      values.bankId = infoBank?.bank?.id
      values.bankCode = infoBank?.bank?.bankCode
      values.bankName = infoBank?.bank?.name
      onSubmitCreateForm(values)

      // setOpen(false);
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  return (<div>
    <Modal title={t("menu:intTransferAccount:create")}
      open={isOpen}
      onOk={handleOk}
      onCancel={handleCancel}
      okText={t("button:save")}
      cancelText={t("button:close")}
      width={650}
      footer={[]}
      maskClosable={false}
    >
      <hr />
      <Form
        form={formRef}
        layout="horizontal"
        onFinish={onFinish}
        labelCol={{ span: 10 }}
        wrapperCol={{ span: 14 }}
        labelAlign="left"
      >
        <InternalTransferAccountFormCreate bankOptions={bankOptions} />
        <hr />

        <div className="ant-modal-footer">
          <Button className="ant-btn-close" style={{ marginTop: "8px", width: "150px", background: "#EAECF0" }} onClick={handleCancel}>{t("button:close")}</Button>
          <Button style={{ width: "150px", background: "#3485FC" }} type="primary" htmlType="submit" loading={isLoading} className="bg-color-blue">
            {t("button:confirm")}
          </Button>
        </div>
      </Form>
    </Modal>
  </div>)
}