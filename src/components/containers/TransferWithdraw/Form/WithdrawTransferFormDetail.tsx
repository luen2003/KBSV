import { Col, DatePicker, Form, Input, InputNumber, Row, Select } from "antd"
import React from "react";
import { useTranslation } from "react-i18next"

export const WithdrawTransferFormDetail = ({ data = [], bankRes }: { data: any, bankRes?: any }) => {
    const { t } = useTranslation();
    return (
        <div className="p-4 overflow-y-auto overflow-x-hidden scrollbar-thin scrollbar-thumb-rounded-lg scrollbar-thumb-gray-300 scrollbar-track-transparent h-[400px]">
            {data?.map((item: any, index: any) => (
                <React.Fragment key={index}>
                    <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }} >
                        <Col span={4} className="border p-2">
                            <span>kID</span>
                        </Col>
                        <Col span={20} className="border p-2">
                            <span>{bankRes?.requestId}</span>
                        </Col>
                    </Row>

                    <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }} >
                        <Col span={4} className="border p-2">
                            <span>batchId</span>
                        </Col>
                        <Col span={20} className="border p-2">
                            <span>{bankRes?.requestId}</span>
                        </Col>
                    </Row>

                    <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }} >
                        <Col span={4} className="border p-2">
                            <span>tranId</span>
                        </Col>
                        <Col span={20} className="border p-2">
                            <span>{bankRes?.requestId}</span>
                        </Col>
                    </Row>

                    <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }} >
                        <Col span={4} className="border p-2">
                            <span>bankTime</span>
                        </Col>
                        <Col span={20} className="border p-2">
                            <span>{item?.bankTransTime}</span>
                        </Col>
                    </Row>

                    <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }} >
                        <Col span={4} className="border p-2">
                            <span>txNum</span>
                        </Col>
                        <Col span={20} className="border p-2">
                            <span>{item?.txNumber}</span>
                        </Col>
                    </Row>

                    <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }} >
                        <Col span={4} className="border p-2">
                            <span>txDate</span>
                        </Col>
                        <Col span={20} className="border p-2">
                            <span>{item?.transferDate}</span>
                        </Col>
                    </Row>

                    <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }} >
                        <Col span={4} className="border p-2">
                            <span>transferRequest</span>
                        </Col>
                        <Col span={20} className="border p-2">
                            <span>{bankRes?.request ? JSON.stringify(bankRes?.request?.body) : ""}</span>
                        </Col>
                    </Row>

                    <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }} >
                        <Col span={4} className="border p-2">
                            <span>bankRes</span>
                        </Col>
                        <Col span={20} className="border p-2">
                            <span>{JSON.stringify(bankRes?.response)}</span>
                        </Col>
                    </Row>
                    <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                        <Col span={4} className="border p-2">
                            <span>bankReq</span>
                        </Col>
                        <Col span={20} className="border p-2">
                            <span>{JSON.stringify(bankRes?.request)}</span>
                        </Col>
                    </Row>

                    <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                        <Col span={4} className="border p-2">
                            <span>Status</span>
                        </Col>
                        <Col span={20} className="border p-2">
                            <span>{item?.transferStatus}</span>
                        </Col>
                    </Row>

                    <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                        <Col span={4} className="border p-2">
                            <span>flexConfirm</span>
                        </Col>
                        <Col span={20} className="border p-2">
                            <span>{item?.flexConfirm}</span>
                        </Col>
                    </Row>

                    <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                        <Col span={4} className="border p-2">
                            <span>nodeName</span>
                        </Col>
                        <Col span={20} className="border p-2">
                            <span>{item?.bankCode ? "GW - " + item?.bankCode : ""}</span>
                        </Col>
                    </Row>

                    <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                        <Col span={4} className="border p-2">
                            <span>bankCode</span>
                        </Col>
                        <Col span={20} className="border p-2">
                            <span>{item?.bankCode}</span>
                        </Col>
                    </Row>

                    <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                        <Col span={4} className="border p-2">
                            <span>bankErrorCode</span>
                        </Col>
                        <Col span={20} className="border p-2">
                            <span>{item?.bankErrorCode}</span>
                        </Col>
                    </Row>

                    <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                        <Col span={4} className="border p-2">
                            <span>bankErrorMessage</span>
                        </Col>
                        <Col span={20} className="border p-2">
                            <span>{item?.bankErrorDes}</span>
                        </Col>
                    </Row>

                    <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                        <Col span={4} className="border p-2">
                            <span>auditStatus</span>
                        </Col>
                        <Col span={20} className="border p-2">
                            <span>{item?.auditStatus}</span>    {/* No Information */}
                        </Col>
                    </Row>

                    <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                        <Col span={4} className="border p-2">
                            <span>auditDesc</span>
                        </Col>
                        <Col span={20} className="border p-2">
                            <span>{item?.auditDesc}</span>      {/* No Information */}
                        </Col>
                    </Row>

                    <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                        <Col span={4} className="border p-2">
                            <span>createAt</span>
                        </Col>
                        <Col span={20} className="border p-2">
                            <span>{item?.createdAt}</span>
                        </Col>
                    </Row>

                    <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                        <Col span={4} className="border p-2">
                            <span>updatedAt</span>
                        </Col>
                        <Col span={20} className="border p-2">
                            <span>{item?.bankTransTime}</span>
                        </Col>
                    </Row>
                </React.Fragment>
            ))}
        </div>
    );
}

