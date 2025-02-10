import React, { useState, useEffect, useRef } from "react";
import {
  Breadcrumb,
  Pagination,
  Select,
  Modal,
  Upload,
  message,
  Button,
  Form,
  Input,
  Row,
  Col,
  Tag
} from "antd";
import { HomeOutlined, EyeOutlined, UploadOutlined } from "@ant-design/icons";
import { UploadChangeParam, UploadFile } from "antd/es/upload/interface";
import { FilterInput } from "@components/common/Table";
import RightSideBar from "../../layout/components/RightSideBar";
import GridTable from "@components/common/Table/Table";
import EmployeeModal from "./EmployeeModal";
import SuccessModal from "./SuccessModal";
import { Badge } from "antd";

message.config({
  duration: 3,
  maxCount: 1
});

const { Option } = Select;
const { Dragger } = Upload; // Import the Dragger component for drag-and-drop file upload

const Manage: React.FC = () => {
  const [pageSize, setPageSize] = useState<number>(10);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [isEmployeeModalVisible, setIsEmployeeModalVisible] =
    useState<boolean>(false);
  const [modalContent, setModalContent] = useState<any | null>(null);
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isSucessModalVisible, setIsSucessModalVisible] =
    useState<boolean>(false);
  const tableRef = useRef<any>(null);

  const handleEyeClick = (item: any) => {
    setModalContent(item);
    setIsEmployeeModalVisible(true);
  };

  const handlePageSizeChange = (value: number) => {
    setPageSize(value);
    setCurrentPage(1);
  };

  const fetchData = async () => {
    try {
      return data;
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleFileChange = (info: UploadChangeParam<UploadFile<any>>) => {
    setFileList(info.fileList);
  };

  const handleReadFile = () => {
    if (fileList.length === 0) {
      setErrorMessage("Please select a file to read.");
      return;
    }
    setErrorMessage(null);
    message.success("File read successfully!");
    setIsSucessModalVisible(true);
  };

  const data = {
    totalRows: 2,
    first: 0,
    rows: 1,
    items: [
      {
        key: "1",
        id: "13062112",
        type: "Person",
        status: "Active",
        gender: "Male",
        name: "John - X - Smitty",
        dob: "-",
        country: "USA"
      },
      {
        key: "2",
        id: "13062116",
        type: "Person",
        status: "Inactive",
        gender: "Male",
        name: "Jane Street",
        dob: "-",
        country: "USA"
      }
    ]
  };

  const columns = [
    {
      title: "",
      key: "action",
      render: (_: any, record: any) => (
        <EyeOutlined
          style={{ cursor: "pointer" }}
          onClick={() => handleEyeClick(record)}
        />
      )
    },
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      filterable: true,
      className: "has-filter",
      renderFilter: ({ column, confirm, ref }: any) => (
        <FilterInput column={column} confirm={confirm} ref={ref} />
      )
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
      filterable: true,
      className: "has-filter",
      renderFilter: ({ column, confirm, ref }: any) => (
        <FilterInput column={column} confirm={confirm} ref={ref} />
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
      title: "Gender",
      dataIndex: "gender",
      key: "gender",
      filterable: true,
      className: "has-filter",
      renderFilter: ({ column, confirm, ref }: any) => (
        <FilterInput column={column} confirm={confirm} ref={ref} />
      )
    },
    {
      title: "Primary Name",
      dataIndex: "name",
      key: "name",
      filterable: true,
      className: "has-filter",
      renderFilter: ({ column, confirm, ref }: any) => (
        <FilterInput column={column} confirm={confirm} ref={ref} />
      )
    },
    {
      title: "Date of Birth",
      dataIndex: "dob",
      key: "dob",
      filterable: true,
      className: "has-filter",
      renderFilter: ({ column, confirm, ref }: any) => (
        <FilterInput column={column} confirm={confirm} ref={ref} />
      )
    },
    {
      title: "Country",
      dataIndex: "country",
      key: "country",
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
        <RightSideBar />
        <div className="dashboard-container flex-1 bg-gray-100 p-4">
          <Breadcrumb style={{ marginBottom: "10px" }}>
            <Breadcrumb.Item href="/">
              <HomeOutlined />
            </Breadcrumb.Item>
            <Breadcrumb.Item>Anti-Money Laundering</Breadcrumb.Item>
            <Breadcrumb.Item>Manage DowJones Watchlists</Breadcrumb.Item>
          </Breadcrumb>

          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              marginBottom: "20px"
            }}
          >
            <Button type="primary" onClick={() => setIsModalVisible(true)}>
              + Import File
            </Button>
          </div>

          <GridTable
            ref={tableRef}
            columns={columns}
            fetchData={fetchData}
            addIndexCol={true}
          />

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: "20px"
            }}
          >
            <Pagination
              current={currentPage}
              total={50}
              pageSize={pageSize}
              onChange={setCurrentPage}
            />
            <Select
              defaultValue={pageSize}
              onChange={handlePageSizeChange}
              style={{ width: 120 }}
            >
              <Option value={10}>10 rows</Option>
              <Option value={20}>20 rows</Option>
              <Option value={30}>30 rows</Option>
              <Option value={50}>50 rows</Option>
              <Option value={100}>100 rows</Option>
            </Select>
          </div>
        </div>
      </div>

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
              <Tag color="purple" style={{ marginTop: 10, fontSize: 14 }}>
                {fileList[0]?.name}
              </Tag>
            </>
          ) : (
            <>
              <p className="ant-upload-text">Kéo và thả file vào đây</p>
              <p className="ant-upload-hint">
                Chỉ chấp nhận các file định dạng .txt, .csv, .xls, .xlsx (tối đa
                10MB)
              </p>
            </>
          )}
        </Dragger>
        {errorMessage && (
          <div style={{ color: "red", marginTop: "10px" }}>{errorMessage}</div>
        )}
        <Button type="primary" onClick={handleReadFile}>
          Đọc file
        </Button>
        {fileList.length > 0 && (
          <Button type="primary" onClick={() => setFileList([])}>
            Tải lại file
          </Button>
        )}
      </Modal>

      <EmployeeModal
        isOpen={isEmployeeModalVisible}
        onClose={() => setIsEmployeeModalVisible(false)}
        employeeData={modalContent}
      />
      <SuccessModal
        isOpen={isSucessModalVisible}
        onClose={() => setIsSucessModalVisible(false)}
      />
    </div>
  );
};

export default Manage;
