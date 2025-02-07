import { useEffect, useMemo, useState } from "react";

import { type IBankInfo } from "@services/common.service";
import { Form, Input, InputNumber, Select } from "antd";
import { useTranslation } from "react-i18next";
import { formatNumberWithCommas } from "@helpers/utils";
import { getBankConfigMaster } from "@services/BankService";

function FormPaymentId(props: {
  formRef: any;
  banksInfo: IBankInfo[];
  isViewDetail: boolean | undefined;
  isDelete: boolean | undefined;
}) {
  const { t } = useTranslation();
  const { TextArea } = Input;
  const [bankOptions, setBankOptions] = useState<any>([]);

  const callGetBankConfigMaster = async () => {
    const banksMaster: any = await getBankConfigMaster({});
    setBankOptions(banksMaster.items.map((bank: any) => ({
      value: `${bank?.bank?.id}`,
      label: `${bank?.bank?.bankNo} - ${bank?.bank?.bankCode} -  ${bank?.bank?.name}`,
    })));
  };

  useEffect(() => {
    callGetBankConfigMaster()
  }, []);

  return (
    <div className="mt-2">
      <hr />
      <Form.Item
        label={t("bank:bankNo")}
        name={["bankId"]}
        rules={[{ required: true, message: t("form:validate:required") }]}
        labelCol={{ span: 8 }}
        labelAlign="left"
        className="mt-4"
      >
        {props.isViewDetail || props.isDelete ? (
          <Input disabled />
        ) : (
          <Select
            placeholder={t("managePaymentIdContent:modal:choseBankCode")}
            options={bankOptions}
            optionFilterProp="label"
            allowClear={true}
            showSearch={true}
          />
        )}
      </Form.Item>
      <Form.Item
        label={t("managePaymentIdContent:minValue")}
        name={["amountMin"]}
        rules={[
          { required: true, message: t('form:validate:required') },
        ]}
        labelCol={{ span: 8 }}
        labelAlign="left"
      >
        <InputNumber
          className="w-full"
          formatter={(val) => formatNumberWithCommas(val).toString()}
          placeholder={t("managePaymentIdContent:modal:inputMinValue")}
          disabled={props.isViewDetail || props.isDelete}
          min={0}
        />
      </Form.Item>
      <Form.Item
        label={t("managePaymentIdContent:maxValue")}
        name={["amountMax"]}
        rules={[
          { required: true, message: t('form:validate:required') },
        ]}
        labelCol={{ span: 8 }}
        labelAlign="left"
      >
        <InputNumber
          className="w-full"
          formatter={(val) => formatNumberWithCommas(val).toString()}
          placeholder={t("managePaymentIdContent:modal:inputMaxValue")}
          disabled={props.isViewDetail || props.isDelete}
          min={0}
        />
      </Form.Item>
      <Form.Item
        label={t("bank:description")}
        name={["description"]}
        labelCol={{ span: 8 }}
        labelAlign="left"
      >
        <TextArea
          placeholder={t("managePaymentIdContent:modal:inputDes")}
          disabled={props.isViewDetail || props.isDelete}
        />
      </Form.Item>
    </div>
  );
}

export default FormPaymentId;
