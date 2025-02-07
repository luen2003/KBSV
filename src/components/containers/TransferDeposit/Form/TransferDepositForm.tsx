import { Col, DatePicker, Form, Input, InputNumber, Row, Select } from "antd"
import moment from "moment";
import React from "react";
import { useTranslation } from "react-i18next"

export const TransferDepositForm = ({ data = [], bankRes }: { data: any, bankRes: any }) => {
    const { t } = useTranslation();

    return (
        <div className="p-4 overflow-y-auto overflow-x-hidden scrollbar-thin scrollbar-thumb-rounded-lg scrollbar-thumb-gray-300 scrollbar-track-transparent h-[400px]">
            {data?.map((item: any, index: any) => (
                bankRes?.map((bank: any) => (
                    <React.Fragment key={index}>
                        <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }} >
                            <Col span={4} className="border p-2">
                                <span>kID</span>
                            </Col>
                            <Col span={20} className="border p-2">
                                <span>{bank?.request.data?.records[0]?.bankTransId}</span>
                            </Col>
                        </Row>

                        <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }} >
                            <Col span={4} className="border p-2">
                                <span>batchId</span>
                            </Col>
                            <Col span={20} className="border p-2">
                                <span>{bank?.request.data?.records[0]?.transId}</span>
                            </Col>
                        </Row>

                        <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }} >
                            <Col span={4} className="border p-2">
                                <span>signature</span>
                            </Col>
                            <Col span={20} className="border p-2">
                                <span>{bank?.request?.header?.signature}</span>
                            </Col>
                        </Row>

                        <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }} >
                            <Col span={4} className="border p-2">
                                <span>bankCode</span>
                            </Col>
                            <Col span={20} className="border p-2">
                                <span>{item?.bankCode}</span>
                            </Col>
                        </Row>

                        <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }} >
                            <Col span={4} className="border p-2">
                                <span>tranDate</span>
                            </Col>
                            <Col span={20} className="border p-2">
                                <span>
                                    {bank?.request.data?.records[0]?.transTime
                                        ? moment(bank.request.data.records[0].transTime, "YYYYMMDDHHmmss").format("YYYY-MM-DD HH:mm:ss")
                                        : ""}
                                </span>
                            </Col>
                        </Row>

                        <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }} >
                            <Col span={4} className="border p-2">
                                <span>custodyCode</span>
                            </Col>
                            <Col span={20} className="border p-2">
                                <span>{bank?.request.data?.records[0]?.custCode}</span>
                            </Col>
                        </Row>

                        <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }} >
                            <Col span={4} className="border p-2">
                                <span>accountNumber</span>
                            </Col>
                            <Col span={20} className="border p-2">
                                {/* <span>{bank?.requestId}</span> */}
                            </Col>
                        </Row>

                        <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }} >
                            <Col span={4} className="border p-2">
                                <span>bankAccNo</span>
                            </Col>
                            <Col span={20} className="border p-2">
                                {/* <span>{bank?.requestId}</span> */}
                            </Col>
                        </Row>

                        <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }} >
                            <Col span={4} className="border p-2">
                                <span>ccycd</span>
                            </Col>
                            <Col span={20} className="border p-2">
                                {/* <span>{bank?.createdAt}</span> */}
                            </Col>
                        </Row>

                        <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }} >
                            <Col span={4} className="border p-2">
                                <span>description</span>
                            </Col>
                            <Col span={20} className="border p-2">
                                <span>{item?.txNumber}</span>
                            </Col>
                        </Row>

                        <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }} >
                            <Col span={4} className="border p-2">
                                <span>amount</span>
                            </Col>
                            <Col span={20} className="border p-2">
                                <span>{parseInt(bank?.request?.data?.records[0]?.amount)?.toLocaleString('en-US')}</span>
                            </Col>
                        </Row>

                        <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }} >
                            <Col span={4} className="border p-2">
                                <span>type</span>
                            </Col>
                            <Col span={20} className="border p-2">
                                <span>{bank?.request.data?.records[0]?.transType}</span>
                            </Col>
                        </Row>

                        <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }} >
                            <Col span={4} className="border p-2">
                                <span>bankNotify</span>
                            </Col>
                            <Col span={20} className="border p-2">
                                <span>{JSON.stringify(bank?.request)}</span>    {/* updater later */}
                            </Col>
                        </Row>
                        <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                            <Col span={4} className="border p-2">
                                <span>bankNotifyRea</span>
                            </Col>
                            <Col span={20} className="border p-2">
                                <span>{JSON.stringify(bank?.response)}</span>  {/* updater later */}
                            </Col>
                        </Row>

                        <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                            <Col span={4} className="border p-2">
                                <span>errorCode</span>
                            </Col>
                            <Col span={20} className="border p-2">
                                <span>{bank?.response.data?.errors?.errorCode}</span>
                            </Col>
                        </Row>

                        <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                            <Col span={4} className="border p-2">
                                <span>errorMessage</span>
                            </Col>
                            <Col span={20} className="border p-2">
                                <span>{bank?.response.data?.errors?.errorDesc}</span>
                            </Col>
                        </Row>

                        <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                            <Col span={4} className="border p-2">
                                <span>auditStatus</span>
                            </Col>
                            <Col span={20} className="border p-2">
                                <span>{item?.auditStatus}</span>
                            </Col>
                        </Row>

                        <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                            <Col span={4} className="border p-2">
                                <span>auditDesc</span>
                            </Col>
                            <Col span={20} className="border p-2">
                                <span>{item?.auditDesc}</span>
                            </Col>
                        </Row>

                        <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                            <Col span={4} className="border p-2">
                                <span>createAt</span>
                            </Col>
                            <Col span={20} className="border p-2">
                                <span>{moment(item?.createdAt).format("HH:mm:ss DD/MM/YYYY")}</span>
                            </Col>
                        </Row>

                        <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                            <Col span={4} className="border p-2">
                                <span>updatedAt</span>
                            </Col>
                            <Col span={20} className="border p-2">
                                <span>{bank?.updatedAt}</span>
                            </Col>
                        </Row>
                    </React.Fragment>
                ))))}
        </div>
    );
}