import { Button, Form, Input, Modal, Spin } from "antd"
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import managePaymentIdService from "@services/managePaymentId.service";
import { BankAmountSettingFormDetail } from "./component/FormPaymentId/BankAmountSettingDetail";

export const ManagePaymentIdApprovalDetail = ({
    requestOrderDetail,
    formRef
}: {
    requestOrderDetail: any,
    formRef: any
}) => {
    const { t } = useTranslation();
    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState<any>(null);
    const [bankAmountSetting, setBankAmountSetting] = useState<any>(null);
    const [isViewAccount, setIsViewAccount] = useState(false);
    const initIntTransferAccountDetail = async () => {
        try {
            setIsViewAccount(true)
            if (!bankAmountSetting) {
                const detailbankAmountSetting = await managePaymentIdService.getDetailAllManagePaymentId(requestOrderDetail?.props?.id);
                setBankAmountSetting(detailbankAmountSetting?.value)
                setData(detailbankAmountSetting?.value);
            }
        } catch (e) {

        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        if (requestOrderDetail) {
            initIntTransferAccountDetail();
        }
    })

    useEffect(() => {
        if (data) {
            formRef.setFieldsValue({
                ...data,
                typeAction: t(`requestOrderAction:${requestOrderDetail?.action.toLowerCase()}`),
                reasonReject: requestOrderDetail.reasonReject
            });
        }
    }, [data])

    return (<div>
        <Form.Item
            label={t('requestOrder:typeAction')}
            rules={[]}
        >
            <Input
                value={t(`requestOrderAction:${requestOrderDetail?.action.toLowerCase()}`)}
                disabled
                className="bg-gray-100 font-semibol"
            />
        </Form.Item>

        <BankAmountSettingFormDetail />

        {requestOrderDetail?.reasonReject && (
            <Form.Item
                label={t('requestOrder:reasonReject')}
                name="reasonReject"
                rules={[]}
            >
                <Input
                    value={requestOrderDetail?.reasonReject}
                    disabled
                />
            </Form.Item>
        )}
    </div>)
}