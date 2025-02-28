import React, { useState } from "react";

import { UploadOutlined } from "@ant-design/icons";
import { Modal, Button, Table, Tag, Upload, message } from "antd";
import Papa from "papaparse";
import * as XLSX from "xlsx";

interface SuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SuccessModal: React.FC<SuccessModalProps> = ({ isOpen, onClose }) => {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const columns = [
    {
      title: "STT",
      dataIndex: "stt",
      key: "stt"
    },
    {
      title: "Mã NV",
      dataIndex: "employeeId",
      key: "employeeId"
    },
    {
      title: "Họ và Tên",
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
      title: "Quốc tịch",
      dataIndex: "nationality",
      key: "nationality"
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
      title: "Ngày cấp",
      dataIndex: "issueDate",
      key: "issueDate"
    },
    {
      title: "Nơi cấp",
      dataIndex: "issuePlace",
      key: "issuePlace"
    },
    {
      title: "Số điện thoại",
      dataIndex: "phoneNumber",
      key: "phoneNumber"
    },
    {
      title: "Email (cá nhân)",
      dataIndex: "email",
      key: "email"
    },
    {
      title: "Mã số thuế",
      dataIndex: "taxCode",
      key: "taxCode"
    },
    {
      title: "Nghề nghiệp",
      dataIndex: "occupation",
      key: "occupation"
    },
    {
      title: "Địa chỉ thường trú/tạm trú",
      dataIndex: "address",
      key: "address"
    },
    {
      title: "Nơi ở hiện nay",
      dataIndex: "currentAddress",
      key: "currentAddress"
    },
    {
      title: "Ngày bắt đầu làm việc",
      dataIndex: "startDate",
      key: "startDate"
    },
    {
      title: "Ngày nghỉ việc",
      dataIndex: "endDate",
      key: "endDate"
    },
    {
      title: "Thao tác",
      dataIndex: "action",
      key: "action",
      render: () => <Button type="link">Xóa</Button>
    }
  ];

  const handleFileUpload = (file: any) => {
    const fileType = file.type;
    const reader = new FileReader();

    reader.onload = () => {
      const fileData = reader.result;
      if (
        fileType ===
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
      ) {
        // Read XLSX file
        const workbook = XLSX.read(fileData, { type: "array" });
        const sheet = workbook.Sheets[workbook.SheetNames[0]];
        const jsonData = XLSX.utils.sheet_to_json(sheet);
        setData(jsonData);
      } else if (fileType === "text/csv") {
        // Read CSV file
        Papa.parse(fileData as string, {
          complete: (result: any) => {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
            setData(result.data);
          },
          header: true // assuming CSV has headers
        });
      } else {
        message.error("Unsupported file type. Please upload .xlsx or .csv.");
      }
    };

    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    reader.readAsArrayBuffer(file);
  };

  return (
    <Modal
      title="Import File nhân viên KBSV"
      open={isOpen}
      onCancel={onClose}
      footer={null}
      width={1500}
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
          Số bản ghi: <strong>{data.length} Records</strong>
        </span>
        <span>
          Trạng thái file: <Tag color="green">OK</Tag>
        </span>
      </div>

      <Upload
        beforeUpload={(file) => {
          handleFileUpload(file);
          return false; // Prevent default file upload behavior
        }}
        showUploadList={false}
      >
        <Button icon={<UploadOutlined />} loading={loading}>
          Chọn file (.xlsx/.csv)
        </Button>
      </Upload>

      <Table
        dataSource={data}
        columns={columns}
        pagination={{ pageSize: 5 }}
        style={{ marginTop: 20 }}
      />

      <div style={{ display: "flex", justifyContent: "center", marginTop: 20 }}>
        <Button
          type="primary"
          onClick={onClose}
          style={{
            marginRight: 25,
            backgroundColor: "#416BD1",
            color: "#ffffff"
          }}
        >
          Đóng
        </Button>
        <Button
          type="primary"
          onClick={onClose}
          style={{
            marginRight: 20,
            backgroundColor: "#416BD1",
            color: "#ffffff"
          }}
        >
          Xác nhận
        </Button>
      </div>
    </Modal>
  );
};

export default SuccessModal;
