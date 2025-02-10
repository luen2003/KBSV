import React from "react";
import { Modal, Button, Table, Tag } from "antd";

interface SuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  data?: Array<{
    status: string;
    errorDetail: string;
    name: string;
    dob: string;
    gender: string;
    idType: string;
    idNumber: string;
    issuePlace: string;
  }>;
}

const SuccessModal: React.FC<SuccessModalProps> = ({
  isOpen,
  onClose,
  data = []
}) => {
  const columns = [
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (text: string) => (
        <Tag color={text === "OK" ? "green" : "red"}>{text}</Tag>
      )
    },
    {
      title: "Chi tiết lỗi",
      dataIndex: "errorDetail",
      key: "errorDetail"
    },
    {
      title: "Tên nhân viên",
      dataIndex: "name",
      key: "name"
    },
    {
      title: "Ngày sinh",
      dataIndex: "dob",
      key: "dob"
    },
    {
      title: "Giới tính",
      dataIndex: "gender",
      key: "gender"
    },
    {
      title: "Loại giấy tờ",
      dataIndex: "idType",
      key: "idType"
    },
    {
      title: "Số giấy tờ",
      dataIndex: "idNumber",
      key: "idNumber"
    },
    {
      title: "Nơi cấp",
      dataIndex: "issuePlace",
      key: "issuePlace"
    }
  ];

  const sampleData = [
    {
      key: "1",
      status: "OK",
      errorDetail: "",
      name: "Nguyễn Văn A",
      dob: "1990-01-01",
      gender: "Nam",
      idType: "CMND",
      idNumber: "123456789",
      issuePlace: "Hà Nội"
    },
    {
      key: "2",
      status: "Lỗi",
      errorDetail: "Sai định dạng ngày sinh",
      name: "Trần Thị B",
      dob: "abc",
      gender: "Nữ",
      idType: "CCCD",
      idNumber: "987654321",
      issuePlace: "TP Hồ Chí Minh"
    }
  ];

  return (
    <Modal
      title="Import File nhân viên KBSV"
      open={isOpen}
      onCancel={onClose}
      footer={null}
      width={900}
      closable={false}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: 10
        }}
      >
        <span>
          Số bản ghi:{" "}
          <strong>{data.length || sampleData.length} Records</strong>
        </span>
        <span>
          Trạng thái file: <Tag color="green">OK</Tag>
        </span>
      </div>
      <Table
        dataSource={data.length > 0 ? data : sampleData}
        columns={columns}
        pagination={{ pageSize: 5 }}
      />
      <div style={{ display: "flex", justifyContent: "center", marginTop: 20 }}>
        <Button
          color="purple"
          type="primary"
          onClick={onClose}
          style={{
            marginRight: 25,
            backgroundColor: "#416BD1", // Màu nền tím
            color: "#ffffff"
          }}
        >
          Đóng
        </Button>
        <Button
          color="purple"
          type="primary"
          style={{
            marginRight: 20,
            backgroundColor: "#416BD1", // Màu nền tím
            color: "#ffffff"
          }}
          onClick={onClose}
        >
          Xác nhận
        </Button>
      </div>
    </Modal>
  );
};

export default SuccessModal;
