import React from "react";
import { Modal, Button, Input, Row, Col } from "antd";

interface EmployeeData {
  id?: string;
  name?: string;
  dob?: string;
  gender?: string;
  phone?: string;
  email?: string;
  taxCode?: string;
  job?: string;
  idType?: string;
  idNumber?: string;
  issueDate?: string;
  issuePlace?: string;
  permanentAddress?: string;
  currentAddress?: string;
  startDate?: string;
  endDate?: string;
}
interface TableData {
  key: string;
  id: string;
  type: string;
  status: string;
  gender: string;
  name: string;
  dob: string;
  country: string;
  phone: string;
  email: string;
  taxCode: string;
  job: string;
  idType: string;
  idNumber: string;
  issueDate: string;
  issuePlace: string;
  permanentAddress: string;
  currentAddress: string;
  startDate: string;
  endDate: string;
}

interface EmployeeModalProps {
  isOpen: boolean;
  onClose: () => void;
  employeeData: TableData | null; // Expect employeeData instead of data
}

const EmployeeModal: React.FC<EmployeeModalProps> = ({
  isOpen,
  onClose,
  employeeData
}) => {
  return (
    <Modal
      title="Thông tin chi tiết nhân viên"
      open={isOpen}
      onCancel={onClose}
      footer={[
        <Button key="close" type="primary" onClick={onClose}>
          Đóng
        </Button>
      ]}
      width={800}
      closable={false}
    >
      <Row gutter={[16, 16]}>
        <Col span={8}>
          <label>Mã nhân viên</label>
          <Input value={employeeData?.id} readOnly />
        </Col>
        <Col span={8}>
          <label>Tên</label>
          <Input value={employeeData?.name} readOnly />
        </Col>
        <Col span={8}>
          <label>Ngày sinh</label>
          <Input value={employeeData?.dob} readOnly />
        </Col>
        <Col span={8}>
          <label>Giới tính</label>
          <Input value={employeeData?.gender} readOnly />
        </Col>
        <Col span={8}>
          <label>Số điện thoại</label>
          <Input value={employeeData?.phone} readOnly />
        </Col>
        <Col span={8}>
          <label>Email</label>
          <Input value={employeeData?.email} readOnly />
        </Col>
        <Col span={8}>
          <label>Mã số thuế</label>
          <Input value={employeeData?.taxCode} readOnly />
        </Col>
        <Col span={8}>
          <label>Nghề nghiệp</label>
          <Input value={employeeData?.job} readOnly />
        </Col>
        <Col span={8}>
          <label>Loại giấy tờ</label>
          <Input value={employeeData?.idType} readOnly />
        </Col>
        <Col span={8}>
          <label>Số giấy tờ</label>
          <Input value={employeeData?.idNumber} readOnly />
        </Col>
        <Col span={8}>
          <label>Ngày cấp</label>
          <Input value={employeeData?.issueDate} readOnly />
        </Col>
        <Col span={8}>
          <label>Nơi cấp</label>
          <Input value={employeeData?.issuePlace} readOnly />
        </Col>
        <Col span={12}>
          <label>Địa chỉ thường trú/tạm trú</label>
          <Input value={employeeData?.permanentAddress} readOnly />
        </Col>
        <Col span={12}>
          <label>Nơi ở hiện tại</label>
          <Input value={employeeData?.currentAddress} readOnly />
        </Col>
        <Col span={8}>
          <label>Ngày bắt đầu làm việc</label>
          <Input value={employeeData?.startDate} readOnly />
        </Col>
        <Col span={8}>
          <label>Ngày nghỉ việc</label>
          <Input value={employeeData?.endDate} readOnly />
        </Col>
      </Row>
    </Modal>
  );
};

export default EmployeeModal;
