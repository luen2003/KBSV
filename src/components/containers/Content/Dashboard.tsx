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
import { Badge } from "antd";
const { Option } = Select;
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
    status: "Inactive",
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
      status: "Inactive",
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

const Dashboard: React.FC = () => {
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

  const fetchData = async () => {
    try {
      const data = dataTable; // Giả sử đây là API call trong thực tế
      return data;
    } catch (error) {
      console.error("Error fetching data:", error);
    }
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
      render: (status: string) => {
        let statusColor = "gray";
        if (status === "Active") statusColor = "green";
        if (status === "Inactive") statusColor = "red";

        return <Badge color={statusColor} text={status} />;
      }
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
        <div className="dashboard-container">
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
                type="primary"
                onClick={() => setIsModalDetailVisible(false)} // Close modal when clicking cancel
                color="purple"
                key="close"
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
            {selectedRecord && (
              <Form layout="vertical">
                {/* ID, Type, and Status */}
                <Row gutter={16}>
                  <Col span={8}>
                    <Form.Item label="ID">
                      <Input value="123" />
                    </Form.Item>
                  </Col>
                  <Col span={8}>
                    <Form.Item label="Type">
                      <Tag color="purple">Person</Tag>
                    </Form.Item>
                  </Col>
                  <Col span={8}>
                    <Form.Item label="Active Status">
                      <Tag color={"green"}>● Active</Tag>
                    </Form.Item>
                  </Col>
                </Row>

                {/* Gender, Date of Birth */}
                <Row gutter={16}>
                  <Col span={8}>
                    <Form.Item label="Gender">
                      <Input value="Male" />
                    </Form.Item>
                  </Col>
                  <Col span={8}>
                    <Form.Item label="Date of Birth">
                      <Input value="01/01/2000" />
                    </Form.Item>
                  </Col>
                </Row>
                <Table
                  columns={columns}
                  dataSource={data}
                  pagination={false}
                  bordered
                  scroll={{ x: "max-content" }} // To handle horizontal scrolling if needed
                />
                {/* Citizenship, Residency, Jurisdiction */}
                <Form.Item label="Country">
                  <Tag color="blue" style={{ marginBottom: "8px" }}>
                    Citizenship - Vietnam
                  </Tag>
                  <Tag color="blue" style={{ marginBottom: "8px" }}>
                    Resident of - United Kingdom (UK)
                  </Tag>
                  <Tag color="blue" style={{ marginBottom: "8px" }}>
                    Jurisdiction - United Kingdom (UK)
                  </Tag>
                </Form.Item>
                <Form.Item label="ID">
                  <Tag color="blue" style={{ marginBottom: "8px" }}>
                    National Provider Identifier (NPI) -TESTABC{" "}
                  </Tag>
                  <Tag color="blue" style={{ marginBottom: "8px" }}>
                    Others - ABCDTEST01 - Social Security No.{" "}
                  </Tag>
                  <Tag color="blue" style={{ marginBottom: "8px" }}>
                    Additional Sanctions Information - Subject to Secondary
                    Sanctions - Issue Date: 5-Nov-2018
                  </Tag>
                </Form.Item>
                <Form.Item label="Role">
                  <Tag color="blue" style={{ marginBottom: "8px" }}>
                    Primary Occupation - Heads & Deputy Heads of Regional
                    Government - Acting Governor of Princeton- From: 13/11/2019{" "}
                  </Tag>
                  <Tag color="blue" style={{ marginBottom: "8px" }}>
                    Previous Roles - Local Public Officials - Acting President
                    of Street Food Chains- To: 21/02/2021{" "}
                  </Tag>
                </Form.Item>
                <Form.Item label="Address">
                  <Tag color="blue" style={{ marginBottom: "8px" }}>
                    Arashiyama Bamboo Grove - Kyoto - Japan (JAP)
                  </Tag>
                  <Tag color="blue" style={{ marginBottom: "8px" }}>
                    Sentosa - Singapore (SINGP)
                  </Tag>
                </Form.Item>
              </Form>
            )}
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
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
