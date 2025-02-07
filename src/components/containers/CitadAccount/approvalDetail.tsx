import { Button, Form, Input, Modal, Spin } from "antd"
import { CitadAccountFormDetail } from "./Form/CitadAccountFormDetail";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import { getCitadAccountDetailAll } from "@services/CitadAccountService";

export const CitadAccountApprovalDetail = ({
    requestOrderDetail,
    formRef
}: {
    requestOrderDetail: any,
    formRef: any
}) => {
    const { t } = useTranslation();
    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState<any>(null);
    const [citadAccount, setCitadAccount] = useState<any>(null);
    const [isViewAccount, setIsViewAccount] = useState(false);
    const initIntTransferAccountDetail = async () => {
        try {
            setIsViewAccount(true)
            if (!citadAccount) {
                const detailCitadAccount: any = await getCitadAccountDetailAll(requestOrderDetail?.props?.id);
                setCitadAccount(detailCitadAccount?.value)
                setData(detailCitadAccount?.value);
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
                className="bg-gray-100"
            />
        </Form.Item>

        <CitadAccountFormDetail />

        {requestOrderDetail?.reasonReject && (
            <Form.Item
                label={t('requestOrder:reasonReject')}
                name="reasonReject"
                rules={[]}
            >
                <Input
                    value={requestOrderDetail?.reasonReject}
                    disabled
                    className="bg-gray-100"
                />
            </Form.Item>
        )}
    </div>)
}