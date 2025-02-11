import { useEffect, useRef, useState } from "react";
import { Breadcrumb, Pagination, Select, Modal, Upload, message } from "antd";
import {
  HomeOutlined,
  UploadOutlined,
  FilterOutlined,
  FileOutlined
} from "@ant-design/icons";
import { Button, Form, Input, Row, Col, Tag, Table } from "antd";
import GridTable from "@components/common/Table/Table"; // Ensure GridTable is properly imported
import RightSideBar from "../../layout/components/RightSideBar";
import { EyeOutlined } from "@ant-design/icons";
import { FilterInput } from "@components/common/Table";
import { Badge, DatePicker } from "antd";
const { Option } = Select;
import CustomerTable from "./CustomTable";
import Annotate from "./Annotate";
const { Dragger } = Upload; // Import the Dragger component for drag-and-drop file upload

const data = [
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

const detailData = [
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
];

// Dữ liệu mẫu cho bảng
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

// Cột của bảng

const CheckNewEmployee: React.FC = () => {
  const [pageSize, setPageSize] = useState<number>(10);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isModalDetailVisible, setIsModalDetailVisible] =
    useState<boolean>(false);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [fileList, setFileList] = useState<any[]>([]);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const tableRef = useRef<any>(null);
  const [tableData, setTableData] = useState<NameType[]>([]);
  const [selectedRecord, setSelectedRecord] = useState<NameType | null>(null);
  const [isPersonalModalVisible, setIsPersonalModalVisible] = useState(false);
  const [isApprovalModalVisible, setIsApprovalModalVisible] = useState(false);
  const [isRejectionModalVisible, setIsRejectionModalVisible] = useState(false);
  const [rejectionReason, setRejectionReason] = useState("");
  const handleApprove = () => {
    setIsApprovalModalVisible(true);
  };

  const handleReject = () => {
    setIsRejectionModalVisible(true);
  };

  const handleApprovalConfirm = () => {
    setIsApprovalModalVisible(false);
    message.success("Yêu cầu đã được phê duyệt.");
  };

  const handleRejectionConfirm = () => {
    if (!rejectionReason) {
      message.error("Vui lòng nhập lý do từ chối.");
      return;
    }
    setIsRejectionModalVisible(false);
    message.success("Yêu cầu đã được từ chối.");
  };

  const handleRejectionReasonChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRejectionReason(e.target.value);
  };
  const fetchData = async () => {
    try {
      const data = dataTable; // Giả sử đây là API call trong thực tế
      return data;
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleOpenModal = () => {
    setIsPersonalModalVisible(true);
  };

  const detailColumns = [
    {
      title: "",
      dataIndex: "eye",
      key: "eye",
      render: (_: any, record: any) => (
        <EyeOutlined
          style={{ cursor: "pointer", fontSize: "20px" }}
          onClick={() => handleOpenModal()}
        />
      )
    },
    {
      title: (
        <>
          Tỷ lệ vi phạm{" "}
          <FilterOutlined style={{ marginLeft: 5, cursor: "pointer" }} />
        </>
      ),
      dataIndex: "violationRate",
      key: "violationRate"
    },
    {
      title: (
        <>
          ID <FilterOutlined style={{ marginLeft: 5, cursor: "pointer" }} />
        </>
      ),
      dataIndex: "id",
      key: "id"
    },
    {
      title: (
        <>
          Type <FilterOutlined style={{ marginLeft: 5, cursor: "pointer" }} />
        </>
      ),
      dataIndex: "type",
      key: "type"
    },
    {
      title: (
        <>
          Status <FilterOutlined style={{ marginLeft: 5, cursor: "pointer" }} />
        </>
      ),
      dataIndex: "status",
      key: "status",
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
      key: "gender"
    },
    {
      title: (
        <>
          Primary Name{" "}
          <FilterOutlined style={{ marginLeft: 5, cursor: "pointer" }} />
        </>
      ),
      dataIndex: "primaryName",
      key: "primaryName"
    },
    {
      title: (
        <>
          Date of birth/ Date of Registration{" "}
          <FilterOutlined style={{ marginLeft: 5, cursor: "pointer" }} />
        </>
      ),
      dataIndex: "dateOfBirth",
      key: "dateOfBirth"
    },
    {
      title: (
        <>
          Citizenship/ Country of Registration{" "}
          <FilterOutlined style={{ marginLeft: 5, cursor: "pointer" }} />
        </>
      ),
      dataIndex: "citizenship",
      key: "citizenship"
    }
  ];

  const handleCloseModal = () => {
    setIsPersonalModalVisible(false);
  };

  useEffect(() => {
    fetchData(); // Gọi API khi component mount
  }, []);

  const handlePageSizeChange = (value: number) => {
    setPageSize(value);
    setCurrentPage(1);
  };

  const handleEyeClick = (record: NameType) => {
    setSelectedRecord(record);
    setIsModalDetailVisible(true);
  };
  const columns = [
    {
      title: "",
      key: "action",
      render: (_: any, record: NameType) => (
        <EyeOutlined
          style={{ cursor: "pointer" }}
          onClick={() => handleEyeClick(record)}
        />
      )
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      filterable: true,
      className: "has-filter",
      renderFilter: ({ column, confirm, ref }: any) => (
        <FilterInput column={column} confirm={confirm} ref={ref} />
      ),
      render: (text: string) => <Badge color="green" text={text} />
    },
    {
      title: "NameType",
      dataIndex: "nameType",
      key: "nameType",
      filterable: true,
      className: "has-filter",
      renderFilter: ({ column, confirm, ref }: any) => (
        <FilterInput column={column} confirm={confirm} ref={ref} />
      )
    },
    {
      title: "Title Honorific",
      dataIndex: "titleHonorific",
      key: "titleHonorific",
      filterable: true,
      className: "has-filter",
      renderFilter: ({ column, confirm, ref }: any) => (
        <FilterInput column={column} confirm={confirm} ref={ref} />
      )
    },
    {
      title: "First Name",
      dataIndex: "firstName",
      key: "firstName",
      filterable: true,
      className: "has-filter",
      renderFilter: ({ column, confirm, ref }: any) => (
        <FilterInput column={column} confirm={confirm} ref={ref} />
      )
    },
    {
      title: "Middle",
      dataIndex: "middle",
      key: "middle",
      filterable: true,
      className: "has-filter",
      renderFilter: ({ column, confirm, ref }: any) => (
        <FilterInput column={column} confirm={confirm} ref={ref} />
      )
    },
    {
      title: "Surname",
      dataIndex: "surname",
      key: "surname",
      filterable: true,
      className: "has-filter",
      renderFilter: ({ column, confirm, ref }: any) => (
        <FilterInput column={column} confirm={confirm} ref={ref} />
      )
    },
    {
      title: "Maiden Name",
      dataIndex: "maidenName",
      key: "maidenName",
      filterable: true,
      className: "has-filter",
      renderFilter: ({ column, confirm, ref }: any) => (
        <FilterInput column={column} confirm={confirm} ref={ref} />
      )
    },
    {
      title: "Suffix Name",
      dataIndex: "suffixName",
      key: "suffixName",
      filterable: true,
      className: "has-filter",
      renderFilter: ({ column, confirm, ref }: any) => (
        <FilterInput column={column} confirm={confirm} ref={ref} />
      )
    },
    {
      title: "Original Script Name",
      dataIndex: "originalScriptName",
      key: "originalScriptName",
      filterable: true,
      className: "has-filter",
      renderFilter: ({ column, confirm, ref }: any) => (
        <FilterInput column={column} confirm={confirm} ref={ref} />
      )
    },
    {
      title: "Single Script Name",
      dataIndex: "singleScriptName",
      key: "singleScriptName",
      filterable: true,
      className: "has-filter",
      renderFilter: ({ column, confirm, ref }: any) => (
        <FilterInput column={column} confirm={confirm} ref={ref} />
      )
    },
    {
      title: "Descriptions",
      dataIndex: "descriptions",
      key: "descriptions",
      filterable: true,
      className: "has-filter",
      renderFilter: ({ column, confirm, ref }: any) => (
        <FilterInput column={column} confirm={confirm} ref={ref} />
      )
    }
  ];

  const handleImportClick = () => {
    setIsModalVisible(true);
  };

  const reloadTable = () => {
    fetchData(); // Fetch lại dữ liệu
  };

  const handleFileChange = ({ file }: { file: any }) => {
    const allowedExtensions = [".txt", ".csv", ".xls", ".xlsx"];
    const fileExtension = file.name.slice(
      ((file.name.lastIndexOf(".") - 1) >>> 0) + 2
    );

    if (!allowedExtensions.includes(`.${fileExtension}`)) {
      message.error("Tải danh sách không thành công!");
      setFileList([]);
      return;
    }

    if (file.size / 1024 / 1024 > 10) {
      setErrorMessage("File vượt quá dung lượng 10MB");
      setFileList([]);
    } else {
      setErrorMessage("");
      setFileList([file]);
    }
  };

  const handleReadFile = () => {
    if (fileList.length === 0) {
      message.error("Vui lòng chọn file trước!");
      return;
    }

    message.success("Đã cập nhật danh sách thành công!");
    setIsModalVisible(false);
    setFileList([]);
  };
  return (
    <div className="body relative w-full h-full">
      <div className="flex flex-row w-full h-full">
        <RightSideBar />
        <div className="dashboard-container">
          <Breadcrumb style={{ marginBottom: "20px" }}>
            <Breadcrumb.Item href="/">
              <HomeOutlined />
            </Breadcrumb.Item>
            <Breadcrumb.Item>Phòng chống rửa tiền</Breadcrumb.Item>
            <Breadcrumb.Item>Tra cứu y/c kiểm tra KH mới</Breadcrumb.Item>
          </Breadcrumb>

          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              marginBottom: "20px"
            }}
          >
            <Button type="primary" onClick={() => handleImportClick()}>
              + Import File
            </Button>
          </div>

          {/* Hiển thị bảng với dữ liệu mẫu */}
          {/* <GridTable
            columns={columns}
            ref={tableRef}
            addIndexCol={true}
            // fetchData={() => tableData} // Truyền dữ liệu từ state
            pagination={{
              current: currentPage,
              total: tableData.length, // Cập nhật total
              pageSize: pageSize,
              onChange: setCurrentPage
            }}
          /> */}
          <GridTable
            ref={tableRef}
            columns={columns}
            fetchData={fetchData}
            addIndexCol={true}
          />

          <Modal
            title="Thông tin chi tiết"
            visible={isModalDetailVisible} // Only show modal if there's content
            onCancel={() => setIsModalDetailVisible(false)} // Close modal when clicking cancel
            footer={[
              <Button
                key="close"
                style={{ backgroundColor: "#416BD1", color: "white" }}
                onClick={() => setIsModalDetailVisible(false)}
              >
                Đóng
              </Button>,
              <Button
                key="reject"
                style={{ backgroundColor: "#FA2323", color: "white" }}
                onClick={handleReject}
              >
                Từ chối
              </Button>,
              <Button
                key="approve"
                style={{ backgroundColor: "#027A48", color: "white" }}
                onClick={handleApprove}
              >
                Phê duyệt
              </Button>
            ]}
            width={1000}
          >
            <h1 style={{ fontSize: "20spx", fontWeight: "bold" }}>
              Thông tin khách hàng
            </h1>
            <Form layout="vertical">
              {" "}
              {/* Vertical form layout */}
              <Row gutter={16}>
                {" "}
                {/* Adjust gutter for spacing */}
                <Col xs={24} sm={12} md={8}>
                  {" "}
                  {/* Responsive columns */}
                  <Form.Item label="Tên KH">
                    <Input />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={12} md={8}>
                  <Form.Item label="Loại KH">
                    <Select>
                      <Option value="entity">Entity</Option>
                      {/* Add more options as needed */}
                    </Select>
                  </Form.Item>
                </Col>
                <Col xs={24} sm={12} md={8}>
                  <Form.Item label="Tên viết tắt">
                    <Input />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={12} md={8}>
                  <Form.Item label="Ngày thành lập">
                    <DatePicker />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={12} md={8}>
                  <Form.Item label="Quốc tịch">
                    <Select>
                      <Option value="vietnam">Việt Nam</Option>
                      {/* Add more options */}
                    </Select>
                  </Form.Item>
                </Col>
                {/* ... (Other fields in the same pattern) */}
                <Col xs={24} sm={12} md={8}>
                  <Form.Item label="Loại giấy tờ">
                    <Select>
                      <Option value="business-license">
                        Giấy phép kinh doanh
                      </Option>
                      {/* Add more options */}
                    </Select>
                  </Form.Item>
                </Col>
                <Col xs={24} sm={12} md={8}>
                  <Form.Item label="Nơi cấp">
                    <Input />
                  </Form.Item>
                </Col>
                {/* ... (Continue with the rest of the form fields) */}
              </Row>
            </Form>
            <h1 style={{ fontSize: "20spx", fontWeight: "bold" }}>
              Thông tin DowJones vi phạm
            </h1>
            <Table
              columns={detailColumns}
              dataSource={detailData}
              pagination={false}
              bordered
              scroll={{ x: "max-content" }} // To handle horizontal scrolling if needed
            />
          </Modal>
          {/* Modal để nhập file */}
          <Modal
            title="Import File DowJones"
            open={isModalVisible}
            onCancel={() => setIsModalVisible(false)}
            footer={null}
            width={800}
          >
            <Dragger
              beforeUpload={() => false}
              fileList={fileList}
              onChange={handleFileChange}
              onRemove={(file) => {
                setFileList([]); // Xóa toàn bộ danh sách file
              }}
            >
              {fileList.length > 0 ? (
                <>
                  <Tag
                    style={{
                      backgroundColor: "#EBEBEB",
                      borderRadius: "20px", // Bo tròn góc
                      padding: "5px 15px", // Canh lề trong
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "8px", // Khoảng cách giữa icon và chữ
                      cursor: "pointer"
                    }}
                  >
                    {" "}
                    <FileOutlined />
                    <span style={{ marginLeft: 8, color: "#3355A6" }}>
                      {fileList[0]?.name}
                    </span>{" "}
                  </Tag>
                </>
              ) : (
                <>
                  <p className="ant-upload-text">Kéo và thả file vào đây</p>
                  <p className="ant-upload-hint">
                    Chỉ chấp nhận các file định dạng .txt, .csv, .xls, .xlsx
                    (tối đa 10MB)
                  </p>
                </>
              )}
            </Dragger>
            {errorMessage && (
              <div style={{ color: "red", marginTop: "10px" }}>
                {errorMessage}
              </div>
            )}
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                gap: "10px",
                marginTop: "10px"
              }}
            >
              <Button type="primary" onClick={handleReadFile}>
                Đọc file
              </Button>
              {fileList.length > 0 && (
                <Button type="primary" onClick={() => setFileList([])}>
                  Tải lại file
                </Button>
              )}
            </div>
          </Modal>
          <Modal
            title={"Chi tiết nhân viên"}
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
            <CustomerTable />

            <div style={{ marginTop: "20px" }}>
              <Annotate />
            </div>
          </Modal>
          {/* Approval Confirmation Modal */}
          <Modal
            title="Phê duyệt yêu cầu"
            visible={isApprovalModalVisible}
            onCancel={() => setIsApprovalModalVisible(false)}
            footer={[
              <Button
                key="close"
                style={{ backgroundColor: "#416BD1", color: "white" }}
                onClick={() => setIsApprovalModalVisible(false)}
              >
                Đóng
              </Button>,
              <Button
                key="approve"
                style={{ backgroundColor: "#027A48", color: "white" }}
                onClick={handleApprovalConfirm}
              >
                Đồng ý
              </Button>
            ]}
          >
            <p>Bạn có muốn phê duyệt KH này mở tài khoản?</p>
          </Modal>
          {/* Rejection Modal */}
          <Modal
            title="Từ chối yêu cầu"
            visible={isRejectionModalVisible}
            onCancel={() => setIsRejectionModalVisible(false)}
            footer={[
              <Button
                key="close"
                style={{ backgroundColor: "#416BD1", color: "white" }}
                onClick={() => setIsRejectionModalVisible(false)}
              >
                Đóng
              </Button>,
              <Button
                key="reject"
                style={{ backgroundColor: "#FA2323", color: "white" }}
                onClick={handleRejectionConfirm}
              >
                Từ chối
              </Button>
            ]}
          >
            <div style={{ maxWidth: 400, margin: "0 auto", padding: "20px" }}>
              <Form layout="vertical">
                <Form.Item label="Lý do từ chối" required>
                  <Input.TextArea
                    value={rejectionReason}
                    onChange={(e) => setRejectionReason(e.target.value)}
                    placeholder="Nhập lý do từ chối"
                    rows={2} // Adjust the number of visible rows for the text area
                  />
                </Form.Item>
              </Form>
            </div>
          </Modal>
        </div>
      </div>
    </div>
  );
};

export default CheckNewEmployee;
