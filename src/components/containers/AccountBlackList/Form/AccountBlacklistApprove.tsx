import { Form, Input, Modal, Spin } from "antd"
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { AccountBlackListForm } from "./AccountBlackListForm";
import { RequestOrderBusinessName } from "@constants/RequestOrderBusinessName";
import { AccountBlacklistFormApprovalEdit } from "./AccountBlacklistFormApprovalEdit";

export const AccountBlacklistApprove = ({
  requestOrderDetail,
  formRef,
}: {
  requestOrderDetail: any,
  formRef: any
}) => {
  const { t } = useTranslation();
  const [isLoading, setLoading] = useState(true);

  if (requestOrderDetail.businessName == RequestOrderBusinessName.UPDATE_BLACKLIST_ACCOUNT) {
    return (<div>  
      <AccountBlacklistFormApprovalEdit data={requestOrderDetail} form={formRef} />
  
      {requestOrderDetail.reasonReject && (
        <Form.Item
          label={t('requestOrder:reasonReject')}
          rules={[]}
        >
          <Input
            value={requestOrderDetail.reasonReject}
            disabled
          />
        </Form.Item>
      )}
    </div>)
  } else {
    return (<div>
      <Form.Item
        label={t('requestOrder:action')}
        rules={[]}
      >
        <Input
          value={t(`requestOrderAction:${requestOrderDetail.action.toLowerCase()}`)}
          disabled
        />
      </Form.Item>
  
      <AccountBlackListForm data={requestOrderDetail.props} form={formRef} isUpdate={false} />
  
      {requestOrderDetail.reasonReject && (
        <Form.Item
          label={t('requestOrder:reasonReject')}
          rules={[]}
        >
          <Input
            value={requestOrderDetail.reasonReject}
            disabled
          />
        </Form.Item>
      )}
    </div>)
  }
}