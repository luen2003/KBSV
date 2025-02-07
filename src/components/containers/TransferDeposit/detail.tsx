import { Col, Form, Modal, Row, Spin } from "antd"
import { useForm } from "antd/es/form/Form";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { getTransferDetail } from "@services/TransferService";
import { TransferDepositForm } from "./Form/TransferDepositForm";
import { getTransferDepositDetail } from "@services/BankGatewayService";

export const TransferDepositDetail = ({
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
    const [data, setData] = useState<any[]>([]);
    const [bankRes, setBankRes] = useState<any>(null);
    const initData = async (id: number) => {
        try {
            const res = await getTransferDetail(id);
            setData(Array.isArray(res?.value) ? res?.value : [res?.value]);
            
            const ids = res?.value?.requestId ? [res?.value?.requestId?.split("-")[1]]: null
            const resBank = await getTransferDepositDetail(ids)
            if (resBank?.value?.data?.length > 0) {
                const bankErrorCode = resBank?.value?.data[0]?.bankErrorCode;
                const bankErrorCodePending = ['311', '313', '050', '064', '100']

                if (bankErrorCode === "000") {
                    resBank.value.data[0].bankErrorCode = "Success";
                } else if (bankErrorCodePending.includes(bankErrorCode)) {
                    resBank.value.data[0].bankErrorCode = "Pending";
                } else {
                    resBank.value.data[0].bankErrorCode = "Fail";
                }
            }
            setBankRes(resBank?.value?.data)
        } catch (e) {

        } finally {
            setLoading(false);
        }
    }
    useEffect(() => {
        if (id) initData(id);
    }, [id]);
    // useEffect(() => {
    //     formRef.setFieldsValue(data);
    // }, [data])

    const handleOk = (e: React.MouseEvent<HTMLElement>) => {
        setOpen(false);
    };

    const handleCancel = (e: React.MouseEvent<HTMLElement>) => {
        setOpen(false);
    };
    return (<div>
        <Modal title={t("menu:transferDeposit:detail")}
            open={isOpen}
            onOk={handleOk}
            onCancel={handleCancel}
            okText={t("button:save")}
            cancelText={t("button:close")}
            width={1000}
            height={400}
            maskClosable={false}
            okButtonProps={{
                style: {
                    display: "none",
                }
            }}
            cancelButtonProps={{
                style: {
                    width: "150px",
                    background: "#EAECF0",
                    color: "#101828",
                    font: "Segoe UI",
                    marginTop: "8px"
                },
                className: "ant-btn-close"
            }}
        >
            <hr />
            <h4 className="mt-3" style={{
                color: "#3485FC",
                fontSize: "20px",
                fontWeight: "bold",
            }}>
                {bankRes?.[0]?.request.data?.records[0]?.transId}
            </h4>

            <TransferDepositForm data={data} bankRes={bankRes} />

        </Modal>
    </div>)
}