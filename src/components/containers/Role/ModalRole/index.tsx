import { useEffect } from "react";

import { type IBankInfo } from "@services/common.service";
import managePaymentIdService, {
  type IParamAddPaymentId
} from "@services/managePaymentId.service";
import { Form, Modal } from "antd";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { RoleForm } from "../Form/RoleForm";

interface IModalAddRoleProps {
  isOpen: boolean;
  banksInfo?: IBankInfo[];
  setIsOpen: (value: boolean) => void;
  reloadTable: () => void;
  isViewDetail?: boolean;
  dataDetail?: IParamAddPaymentId;
  isDelete?: boolean;
}
function ModalAddRole(props: IModalAddRoleProps) {
  const {
    isOpen,
    setIsOpen,
    banksInfo,
    reloadTable,
    isViewDetail,
    dataDetail,
    isDelete
  } = props;
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const handleSubmitForm = async (value: IParamAddPaymentId) => {
    if (isDelete && dataDetail?.id) {
      const deleteRes = await managePaymentIdService.deleteManagePaymentId(
        dataDetail.id
      );
      if (deleteRes.status === "success" && deleteRes.data.code === 0) {
        form.resetFields();
        setIsOpen(false);
        reloadTable();
        toast.success("Delete successfuly");
      } else {
        form.resetFields();
        setIsOpen(false);
      }

      return;
    }
    const res = await managePaymentIdService.addManagePaymentId(value);
    if (res.status === "success" && res.data.code === 0) {
      form.resetFields();
      setIsOpen(false);
      reloadTable();
    }
  };

  useEffect(() => {
    if ((isViewDetail || isDelete) && dataDetail) {
      form.setFieldsValue(dataDetail);
    }
  }, [dataDetail, form, isViewDetail, isDelete]);

  const getTitleModal = () => {
    if (isViewDetail) return t("managePaymentIdContent:modal:view");
    if (isDelete) return t("managePaymentIdContent:modal:edit");
    return t("managePaymentIdContent:modal:add");
  };

  return (
    <Modal
      title={getTitleModal()}
      open={isOpen}
      onOk={() => form.submit()}
      onCancel={() => setIsOpen(false)}
      width={676}
      cancelText={t("button:close")}
      okText={isDelete ? t("button:delete") : t("button:confirm")}
      okButtonProps={{
        className: `w-[150px] ${
          isDelete ? "bg-color-red001 hover:bg-color-red001" : "bg-color-blue"
        } ${isViewDetail ? "hidden" : ""}`
      }}
      cancelButtonProps={{
        className: "w-[150px]"
      }}
    >
      <Form onFinish={handleSubmitForm} form={form}>
        <RoleForm
          isUpdate={isDelete}
        />
      </Form>
    </Modal>
  );
}

export default ModalAddRole;
