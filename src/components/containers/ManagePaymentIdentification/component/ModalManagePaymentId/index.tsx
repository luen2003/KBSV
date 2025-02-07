import { useEffect } from "react";

import { type IBankInfo } from "@services/common.service";
import managePaymentIdService, {
  type IParamAddPaymentId
} from "@services/managePaymentId.service";
import { Form, Modal } from "antd";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";

import FormPaymentId from "../FormPaymentId";

interface IModalAddPaymentIdProps {
  isOpen: boolean;
  banksInfo?: IBankInfo[];
  setIsOpen: (value: boolean) => void;
  reloadTable: () => void;
  isViewDetail?: boolean;
  dataDetail?: IParamAddPaymentId;
  isDelete?: boolean;
}
function ModalAddPaymentId(props: IModalAddPaymentIdProps) {
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
    if (!isDelete && !isViewDetail && value.amountMin >= value.amountMax) {
      toast.error(t("managePaymentIdContent:modal:compareMinMax"));
      return;
    }
    if (isDelete && dataDetail?.id) {
      const deleteRes = await managePaymentIdService.deleteManagePaymentId(
        dataDetail.id
      );
      if (deleteRes.status === "success" && deleteRes.data.code === 0) {
        form.resetFields();
        setIsOpen(false);
        reloadTable();
        toast.success(t("managePaymentIdContent:toastMessage:deleteSuccess"));
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
      toast.success(t("managePaymentIdContent:toastMessage:createSuccess"));
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
      onCancel={() => {
        setIsOpen(false)
        form.resetFields()
      }
      }
      width={676}
      cancelText={t("button:close")}
      okText={isDelete ? t("button:delete") : t("button:confirm")}
      okButtonProps={{
        style: {
          marginTop: "8px",
          width: "150px",
          background: isDelete ? "#FF453A" : "#3485FC"
        },
        className: isDelete ? "bg-color-red" : "bg-color-blue"
      }}
      cancelButtonProps={{
        style: {
          marginTop: "8px",
          width: "150px",
          background: "#EAECF0",
          color: "#000",
          font: "Segoe UI",
          borderColor: "#EAECF0"
        },
        className: "ant-btn-close"
      }}
    >
      <Form onFinish={handleSubmitForm} form={form}>
        <FormPaymentId
          formRef={form}
          banksInfo={banksInfo || []}
          isViewDetail={isViewDetail}
          isDelete={isDelete}
        />
        <hr />
      </Form>
    </Modal>
  );
}

export default ModalAddPaymentId;
