import React, { useState, useRef, useEffect } from "react";
import {
  Input,
  Button,
  DatePicker,
  Radio,
  Select,
  Modal,
  message,
  Table,
  Badge,
  Tag
} from "antd";
import { RadioChangeEvent } from "antd";
import { SyncOutlined, EyeOutlined } from "@ant-design/icons";
import { Breadcrumb } from "antd";
import { HomeOutlined } from "@ant-design/icons";
import GridTable from "@components/common/Table/Table"; // Ensure GridTable is properly imported
import CustomerTable from "./CustomTable";
import OrganizedTable from "./OrganizedTable";
import Annotate from "./Annotate";
import { RightSideBar } from "@components/layout/components";
import { ArrowDownOutlined } from "@ant-design/icons";
import { FilterInput } from "@components/common/Table";
import { FilterOutlined } from "@ant-design/icons";
type FormData = {
  name: string;
  cccd: string;
  dob: Date | null;
  nationality: string;
  phone: string;
  documentType: string;
  issueDate: Date | null;
  placeOfIssue: string;
  email: string;
  permanentAddress: string;
  currentAddress: string;
  taxCode: string;
  employeeCode: string;
};

const { Option } = Select;

const mockDataset = [
  { name: "Thụy Khuê", cccd: "012345678", employeeCode: "123456" },
  {
    name: "Ngân hàng thương mại Cổ phần Việt Nam thịnh vượng",
    cccd: "123456789",
    employeeCode: "123456789"
  }
];

const columns = [
  {
    title: "Chi tiết so sánh thông tin Dow Jones",
    dataIndex: "comparisonDetails",
    key: "comparisonDetails"
  },
  {
    title: "Thông tin KB",
    dataIndex: "kbInformation",
    key: "kbInformation"
  },
  {
    title: "Tỷ lệ trùng khớp",
    dataIndex: "matchRate",
    key: "matchRate"
  },
  {
    title: "Thông tin Dow Jones",
    dataIndex: "dowJonesInformation",
    key: "dowJonesInformation"
  },
  {
    title: "Thông tin không tính tỷ lệ",
    dataIndex: "infoWithoutRate",
    key: "infoWithoutRate"
  },
  {
    title: "Thông tin không trùng khớp",
    dataIndex: "unmatchedInfo",
    key: "unmatchedInfo"
  }
];

const data = [
  {
    key: "1",
    comparisonDetails: "Tỷ lệ trùng khớp",
    kbInformation: "50%",
    matchRate: "50%",
    dowJonesInformation: "ID: 13062112",
    infoWithoutRate: "Thông tin tính tỉ lệ, bị trùng khớp",
    unmatchedInfo: "Thông tin tính tỉ lệ, không trùng khớp"
  },
  {
    key: "2",
    comparisonDetails: "Tên Khách hàng",
    kbInformation: "Nguyễn Thế Anh Sơn",
    matchRate: "-",
    dowJonesInformation: "John X Smitty",
    infoWithoutRate: "-",
    unmatchedInfo: "-"
  },
  {
    key: "3",
    comparisonDetails: "Ngày sinh",
    kbInformation: "28/09/1994",
    matchRate: "-",
    dowJonesInformation: "28/09/1994",
    infoWithoutRate: "-",
    unmatchedInfo: "-"
  },
  {
    key: "4",
    comparisonDetails: "Quốc tịch",
    kbInformation: "United Kingdom (UK)",
    matchRate: "-",
    dowJonesInformation: "United Kingdom (UK)",
    infoWithoutRate: "-",
    unmatchedInfo: "-"
  },
  {
    key: "5",
    comparisonDetails: "Số điện thoại",
    kbInformation: "01234455252",
    matchRate: "-",
    dowJonesInformation: "01234455252",
    infoWithoutRate: "-",
    unmatchedInfo: "-"
  },
  {
    key: "6",
    comparisonDetails: "Email",
    kbInformation: "abc@gmail.com",
    matchRate: "-",
    dowJonesInformation: "abc@gmail.com",
    infoWithoutRate: "-",
    unmatchedInfo: "-"
  },
  {
    key: "7",
    comparisonDetails: "Mã số thuế",
    kbInformation: "01234455252",
    matchRate: "-",
    dowJonesInformation: "01234455252",
    infoWithoutRate: "-",
    unmatchedInfo: "-"
  },
  {
    key: "8",
    comparisonDetails: "Nghề nghiệp",
    kbInformation: "Minister of Parking",
    matchRate: "-",
    dowJonesInformation: "Minister of Parking",
    infoWithoutRate: "-",
    unmatchedInfo: "-"
  },
  {
    key: "9",
    comparisonDetails: "Loại giấy tờ",
    kbInformation: "CCCD",
    matchRate: "-",
    dowJonesInformation: "TEST123TEST",
    infoWithoutRate: "-",
    unmatchedInfo: "-"
  },
  {
    key: "10",
    comparisonDetails: "Địa chỉ",
    kbInformation: "Arashiyama Bamboo Grove - Kyoto - Japan (JAP)",
    matchRate: "-",
    dowJonesInformation: "Sentosa - Singapore (SINGP)",
    infoWithoutRate: "-",
    unmatchedInfo: "-"
  }
];

const personalData = [
  {
    key: "1",
    status: "Active",
    nameType: "Primary Name",
    titleHonorific: "-",
    firstName: "John",
    middle: "X",
    surname: "Smitty",
    maidenName: "-",
    suffixName: "-",
    originalScriptName: "-",
    singleScriptName: "-",
    descriptions: "-"
  },
  {
    key: "2",
    status: "Active",
    nameType: "Also Known As",
    titleHonorific: "-",
    firstName: "Johnny",
    middle: "-",
    surname: "Smitty",
    maidenName: "-",
    suffixName: "-",
    originalScriptName: "-",
    singleScriptName: "-",
    descriptions: "-"
  },
  {
    key: "3",
    status: "Active",
    nameType: "Formerly Known As",
    titleHonorific: "-",
    firstName: "-",
    middle: "-",
    surname: "-",
    maidenName: "-",
    suffixName: "-",
    originalScriptName: "-",
    singleScriptName: "-",
    descriptions: "-"
  },
  {
    key: "4",
    status: "Active",
    nameType: "Spelling Variation",
    titleHonorific: "-",
    firstName: "-",
    middle: "-",
    surname: "-",
    maidenName: "-",
    suffixName: "-",
    originalScriptName: "-",
    singleScriptName: "-",
    descriptions: "-"
  }
  // Add more rows here as needed
];

// Cấu trúc dữ liệu của bảng
interface NameType {
  status: string;
  nameType: string;
  titleHonorific: string;
  firstName: string;
  middle: string;
  surname: string;
  maidenName: string;
  suffixName: string;
  originalScriptName: string;
  singleScriptName: string;
  descriptions: string;
}
const dataTable = {
  totalRows: 4,
  first: 0,
  rows: 1,
  items: [
    {
      status: "Active",
      nameType: "Primary Name",
      titleHonorific: "-",
      firstName: "John",
      middle: "X",
      surname: "Smitty",
      maidenName: "-",
      suffixName: "-",
      originalScriptName: "-",
      singleScriptName: "-",
      descriptions: "-"
    },
    {
      status: "Active",
      nameType: "Also Known As",
      titleHonorific: "-",
      firstName: "Johnny",
      middle: "-",
      surname: "Smitty",
      maidenName: "-",
      suffixName: "-",
      originalScriptName: "-",
      singleScriptName: "-",
      descriptions: "-"
    },
    {
      status: "Active",
      nameType: "Formerly Known As",
      titleHonorific: "-",
      firstName: "-",
      middle: "-",
      surname: "-",
      maidenName: "-",
      suffixName: "-",
      originalScriptName: "-",
      singleScriptName: "-",
      descriptions: "-"
    },
    {
      status: "Active",
      nameType: "Spelling Variation",
      titleHonorific: "-",
      firstName: "-",
      middle: "-",
      surname: "-",
      maidenName: "-",
      suffixName: "-",
      originalScriptName: "-",
      singleScriptName: "-",
      descriptions: "-"
    }
  ]
};
const fetchData = async () => {
  try {
    const data = dataTable; // Giả sử đây là API call trong thực tế
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

const CheckOldEmployee = () => {
  const [selectedRole, setSelectedRole] = useState("Support Team");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isPersonalModalVisible, setIsPersonalModalVisible] = useState(false);
  const [customerType, setCustomerType] = useState("");
  const [formData, setFormData] = useState<FormData>({
    name: "Thụy Khuê",
    cccd: "012345678",
    dob: null,
    nationality: "",
    phone: "",
    documentType: "",
    issueDate: null,
    placeOfIssue: "",
    email: "",
    permanentAddress: "",
    currentAddress: "",
    taxCode: "",
    employeeCode: "123456"
  });
  const tableRef = useRef<any>(null);

  const [validationMessage, setValidationMessage] =
    useState<React.ReactNode>("");
  const [dataSource, setDataSource] = useState<any[]>([]);

  const handleInputChange = (field: keyof FormData, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleRoleChange = (e: RadioChangeEvent) => {
    setSelectedRole(e.target.value);
  };

  const handleOpenModal = (type: string) => {
    setCustomerType(type);
    setIsPersonalModalVisible(true);
  };

  const handleCloseModal = () => {
    setIsPersonalModalVisible(false);
  };

  const validateCustomer = () => {
    const requiredFields: (keyof FormData)[] = ["name", "cccd"];

    // Check if all required fields are filled
    for (let field of requiredFields) {
      if (!formData[field]) {
        message.error("[Lỗi] Thiếu thông tin bắt buộc!");
        return; // Stop if any required field is missing
      }
    }

    const isValid = mockDataset.some(
      (record) => record.name === formData.name && record.cccd === formData.cccd
    );
    console.log(customerType);
    if (isValid) {
      setValidationMessage(
        <span style={{ color: "green" }}>
          Khách hàng không vi phạm danh sách DowJones và có thể mở tài khoản
        </span>
      );
      setDataSource([
        {
          key: "1",
          violationRate: "81%",
          id: "13062112",
          type: "Khách hàng cá nhân",
          status: "Active",
          gender: "Male",
          primaryName: "John - X - Smitty",
          dateOfBirth: "10/01/2000",
          citizenship: "United States (USA)"
        },
        {
          key: "2",
          violationRate: "78%",
          id: "625212",
          type: "Khách hàng tổ chức",
          status: "Inactive",
          gender: "Male",
          primaryName: "BIDV",
          dateOfBirth: "01/01/2000",
          citizenship: "Vietnam (VN)"
        }
      ]);
    } else {
      setValidationMessage(
        <span style={{ color: "red" }}>
          Vui lòng liên hệ Bộ phận Phòng chống rửa tiền để kiểm tra lại thông
          tin khách hàng trước khi mở tài khoản.
        </span>
      );
    }
  };

  const columns = [
    {
      title: "",
      dataIndex: "eye",
      key: "eye",
      render: (_: any, record: any) => (
        <EyeOutlined
          style={{ cursor: "pointer", fontSize: "20px" }}
          onClick={() => handleOpenModal(record.type)}
        />
      )
    },
    {
      title: (
        <>
          Tỷ lệ vi phạm{" "}
          <ArrowDownOutlined style={{ marginLeft: 5, cursor: "pointer" }} />
        </>
      ),
      dataIndex: "violationRate",
      key: "violationRate",
      filterable: true,
      className: "has-filter",
      // Optional renderFilter logic if needed
      renderFilter: () => (
        <ArrowDownOutlined style={{ marginLeft: 5, cursor: "pointer" }} />
      )
    },
    {
      title: (
        <>
          ID <FilterOutlined style={{ marginLeft: 5, cursor: "pointer" }} />
        </>
      ),
      dataIndex: "id",
      key: "id",
      filterable: true,
      className: "has-filter",
      renderFilter: ({ column, confirm, ref }: any) => (
        <FilterInput column={column} confirm={confirm} ref={ref} />
      )
    },
    {
      title: (
        <>
          Type <FilterOutlined style={{ marginLeft: 5, cursor: "pointer" }} />
        </>
      ),
      dataIndex: "type",
      key: "type",
      filterable: true,
      className: "has-filter",
      renderFilter: ({ column, confirm, ref }: any) => (
        <FilterInput column={column} confirm={confirm} ref={ref} />
      )
    },
    {
      title: (
        <>
          Status <FilterOutlined style={{ marginLeft: 5, cursor: "pointer" }} />
        </>
      ),
      dataIndex: "status",
      key: "status",
      filterable: true,
      className: "has-filter",
      renderFilter: ({ column, confirm, ref }: any) => (
        <FilterInput column={column} confirm={confirm} ref={ref} />
      ),
      render: (status: string) => {
        let statusColor = "gray";
        if (status === "Active") statusColor = "green";
        if (status === "Inactive") statusColor = "red";

        return <Badge color={statusColor} text={status} />;
      }
    },
    {
      title: (
        <>
          Gender <FilterOutlined style={{ marginLeft: 5, cursor: "pointer" }} />
        </>
      ),
      dataIndex: "gender",
      key: "gender",
      filterable: true,
      className: "has-filter",
      renderFilter: ({ column, confirm, ref }: any) => (
        <FilterInput column={column} confirm={confirm} ref={ref} />
      )
    },
    {
      title: (
        <>
          Primary Name{" "}
          <FilterOutlined style={{ marginLeft: 5, cursor: "pointer" }} />
        </>
      ),
      dataIndex: "primaryName",
      key: "primaryName",
      filterable: true,
      className: "has-filter",
      renderFilter: ({ column, confirm, ref }: any) => (
        <FilterInput column={column} confirm={confirm} ref={ref} />
      )
    },
    {
      title: (
        <>
          Date of birth/ Date of Registration{" "}
          <FilterOutlined style={{ marginLeft: 5, cursor: "pointer" }} />
        </>
      ),
      dataIndex: "dateOfBirth",
      key: "dateOfBirth",
      filterable: true,
      className: "has-filter",
      renderFilter: ({ column, confirm, ref }: any) => (
        <FilterInput column={column} confirm={confirm} ref={ref} />
      )
    },
    {
      title: (
        <>
          Citizenship/ Country of Registration{" "}
          <FilterOutlined style={{ marginLeft: 5, cursor: "pointer" }} />
        </>
      ),
      dataIndex: "citizenship",
      key: "citizenship",
      filterable: true,
      className: "has-filter",
      renderFilter: ({ column, confirm, ref }: any) => (
        <FilterInput column={column} confirm={confirm} ref={ref} />
      )
    }
  ];

  return (
    <div className="body relative w-full h-full">
      <div className="flex flex-row w-full h-full">
        <div className="dashboard-container">
          {/* Role Selector */}
          <div className="flex items-center justify-end mb-4">
            <div className="flex items-center gap-4">
              <span>Bạn đang tra cứu với vai trò {selectedRole}</span>
              <Button
                type="primary"
                icon={<SyncOutlined />}
                style={{
                  backgroundColor: "#416BD1",
                  borderColor: "#416BD1"
                }}
                onClick={() => setIsModalVisible(true)}
              >
                Đổi vai trò
              </Button>
            </div>
          </div>

          {/* Customer Name and Type */}
          <div className="flex items-center gap-4 mb-4">
            <div>
              <label className="block mb-1">
                Loại Khách hàng <span className="text-red-500">*</span>
              </label>
              <Select
                value={customerType}
                onChange={setCustomerType}
                style={{ width: 200 }}
              >
                <Option value="Khách hàng cá nhân">Khách hàng cá nhân</Option>
                <Option value="Khách hàng tổ chức">Khách hàng tổ chức</Option>
              </Select>
            </div>
            {customerType && (
              <div>
                <label className="block mb-1">
                  Mã nhân viên <span className="text-red-500">*</span>
                </label>
                <Input
                  placeholder="Enter employee code"
                  value={formData.employeeCode}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                />
              </div>
            )}
          </div>

          {/* Additional Fields */}
          {customerType && (
            <>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block mb-1">Ngày sinh</label>
                  <DatePicker
                    className="w-full"
                    onChange={(date) => handleInputChange("dob", date)}
                  />
                </div>
                <div>
                  <label className="block mb-1">Quốc tịch</label>
                  <Input
                    placeholder="Enter nationality"
                    value={formData.nationality}
                    onChange={(e) =>
                      handleInputChange("nationality", e.target.value)
                    }
                  />
                </div>
                <div>
                  <label className="block mb-1">Số điện thoại</label>
                  <Input
                    placeholder="Enter phone number"
                    value={formData.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                  />
                </div>
                <div>
                  <label className="block mb-1">Loại giấy tờ</label>
                  <Input
                    placeholder="Enter document type"
                    value={formData.documentType}
                    onChange={(e) =>
                      handleInputChange("documentType", e.target.value)
                    }
                  />
                </div>
                <div>
                  <label className="block mb-1">CCCD</label>
                  <Input
                    placeholder="Enter CCCD"
                    value={formData.cccd}
                    onChange={(e) => handleInputChange("cccd", e.target.value)}
                  />
                </div>
                <div>
                  <label className="block mb-1">Ngày cấp</label>
                  <DatePicker
                    className="w-full"
                    onChange={(date) => handleInputChange("issueDate", date)}
                  />
                </div>
                <div>
                  <label className="block mb-1">Nơi cấp</label>
                  <Input
                    placeholder="Enter place of issue"
                    value={formData.placeOfIssue}
                    onChange={(e) =>
                      handleInputChange("placeOfIssue", e.target.value)
                    }
                  />
                </div>
                <div>
                  <label className="block mb-1">Email</label>
                  <Input
                    placeholder="Enter email"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                  />
                </div>
                <div>
                  <label className="block mb-1">Địa chỉ thường trú</label>
                  <Input
                    placeholder="Enter permanent address"
                    value={formData.permanentAddress}
                    onChange={(e) =>
                      handleInputChange("permanentAddress", e.target.value)
                    }
                  />
                </div>
                <div>
                  <label className="block mb-1">Nơi ở hiện tại</label>
                  <Input
                    placeholder="Enter current address"
                    value={formData.currentAddress}
                    onChange={(e) =>
                      handleInputChange("currentAddress", e.target.value)
                    }
                  />
                </div>
                <div>
                  <label className="block mb-1">Mã số thuế</label>
                  <Input
                    placeholder="Enter tax code"
                    value={formData.taxCode}
                    onChange={(e) =>
                      handleInputChange("taxCode", e.target.value)
                    }
                  />
                </div>
              </div>

              {/* Check Button */}
              <Button type="primary" onClick={validateCustomer}>
                Kiểm tra
              </Button>

              {/* Validation Message */}
              <div className="mt-4">{validationMessage}</div>

              {/* Table */}
              <Table
                dataSource={dataSource}
                columns={columns}
                pagination={false}
                style={{ marginTop: "20px" }}
                scroll={{ x: "max-content", y: "max-content" }} // Điều chỉnh giá trị này theo bố cục của bạn
              />
            </>
          )}

          {/* Modal for Role Selection */}
          <Modal
            title="Vui lòng chọn vai trò thực hiện:"
            open={isModalVisible}
            onCancel={() => setIsModalVisible(false)}
            footer={null}
          >
            <Radio.Group onChange={handleRoleChange} value={selectedRole}>
              <Radio value="Phòng chống rửa tiền">Phòng chống rửa tiền</Radio>
              <Radio value="Support Team">Support Team</Radio>
            </Radio.Group>
            <div className="mt-4 flex justify-center">
              <Button type="primary" onClick={() => setIsModalVisible(false)}>
                Xác nhận
              </Button>
            </div>
          </Modal>
          <Modal
            title={customerType}
            open={isPersonalModalVisible}
            onCancel={handleCloseModal}
            footer={[
              <Button
                type="primary"
                color="purple"
                key="close"
                onClick={handleCloseModal}
                style={{
                  backgroundColor: "#416BD1", // Màu nền tím
                  color: "#ffffff", // Màu chữ trắng
                  border: "none", // Xóa đường viền
                  display: "block", // Đảm bảo button sẽ chiếm toàn bộ chiều ngang
                  margin: "0 auto", // Căn giữa
                  textAlign: "center", // Căn giữa chữ trong button
                  width: "10%"
                }}
              >
                Đóng
              </Button>
            ]}
            width={1000}
          >
            {customerType == "Khách hàng cá nhân" ? (
              <CustomerTable />
            ) : (
              <OrganizedTable />
            )}
            <div style={{ marginTop: "20px" }}>
              <Annotate />
            </div>
          </Modal>
        </div>
      </div>
    </div>
  );
};

export default CheckOldEmployee;
