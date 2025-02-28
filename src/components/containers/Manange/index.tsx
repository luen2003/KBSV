import React, { useState, useEffect, useRef } from "react";

import {
  HomeOutlined,
  EyeOutlined,
  UploadOutlined,
  FileOutlined,
  CloudUploadOutlined
} from "@ant-design/icons";
import { FilterInput } from "@components/common/Table";
import GridTable from "@components/common/Table/Table";
import {
  Badge,
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
import { UploadChangeParam, UploadFile } from "antd/es/upload/interface";
import axios from "axios";
import * as XLSX from "xlsx";

import CustomFilterInput from "./CustomFilterInput"; // Import component mới
import EmployeeModal from "./EmployeeModal";
import SuccessModal from "./SuccessModal";
import RightSideBar from "../../layout/components/RightSideBar";
message.config({
  duration: 3,
  maxCount: 1
}); // Thư viện đọc Excel

const { Option } = Select;
const { Dragger } = Upload; // Import the Dragger component for drag-and-drop file upload

const Manage: React.FC = () => {
  const [pageSize, setPageSize] = useState<number>(10);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [isEmployeeModalVisible, setIsEmployeeModalVisible] =
    useState<boolean>(false);
  const [modalContent, setModalContent] = useState<any | null>(null);
  const [fileList, setFileList] = useState<any[]>([]);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isSucessModalVisible, setIsSucessModalVisible] =
    useState<boolean>(false);
  const tableRef = useRef<any>(null);
  const [sortColumn, setSortColumn] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState<"ascend" | "descend" | null>(null);

  const [fileData, setFileData] = useState<any[]>([]); // Dữ liệu từ file
  const [searchFilters, setSearchFilters] = useState<Record<string, string>>(
    {}
  );
  const handleFilterChange = (column: string | any, value: string) => {
    if (typeof column === "object" && column.dataIndex) {
      column = column.dataIndex;
    }

    setSearchFilters((prevFilters) => ({
      ...prevFilters,
      [column]: value.toLowerCase()
    }));

    // Tìm phần tử tiêu đề của cột
    const headerCell = document.querySelector(
      `[data-column-key="${column}"]`
    ) as HTMLElement;

    if (headerCell) {
      headerCell.click(); // Ép kiểu để sử dụng phương thức click()
    }
  };

  const handleEyeClick = (item: any) => {
    setModalContent(item);
    setIsEmployeeModalVisible(true);
  };

  const handlePageSizeChange = (value: number) => {
    setPageSize(value);
    setCurrentPage(1);
  };

  useEffect(() => {
    fetchEmployeeList();
  }, [sortColumn, sortOrder]);

  useEffect(() => {
    fetchEmployeeList();
  }, [searchFilters]);

  const handleReadFile = () => {
    if (fileList.length === 0) {
      setErrorMessage("Please select a file to read.");
      return;
    }

    const file = fileList[0]; // Get file object

    if (!file) {
      setErrorMessage("Không thể lấy dữ liệu từ file.");
      return;
    }

    const reader = new FileReader();

    reader.onload = (e) => {
      const data = e.target?.result;
      if (data) {
        try {
          let workbook;
          if (file.name.endsWith(".xlsx") || file.name.endsWith(".xls")) {
            // Reading Excel files with readAsArrayBuffer
            workbook = XLSX.read(data, { type: "array" });
            const sheetName = workbook.SheetNames[0]; // Select the first sheet
            const sheet = workbook.Sheets[sheetName];
            const jsonData = XLSX.utils.sheet_to_json(sheet, { header: 1 });
            setFileData(jsonData); // Update state with Excel data
          } else if (file.name.endsWith(".csv")) {
            // Reading CSV files
            const text = data as string;
            const rows = text.split("\n").map((row) => row.split(","));
            setFileData(rows); // Update state with CSV data
          } else {
            setErrorMessage(
              "File không hợp lệ. Vui lòng chọn file .xlsx, .xls hoặc .csv."
            );
          }
        } catch (error) {
          message.error("Có lỗi xảy ra khi đọc file.");
          console.error("Lỗi đọc file:", error);
        }
      }
    };

    // Read file as ArrayBuffer for Excel (better approach)
    if (file.name.endsWith(".xlsx") || file.name.endsWith(".xls")) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      reader.readAsArrayBuffer(file); // Read as ArrayBuffer for Excel files
    } else if (file.name.endsWith(".csv")) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      reader.readAsText(file); // Read as Text for CSV files
    } else {
      setErrorMessage("Chỉ hỗ trợ file .xlsx, .xls và .csv.");
    }
  };

  const fetchEmployeeList = async () => {
    try {
      const baseUrl = "http://10.100.30.100:8080/aml";
      const url = `${baseUrl}/api/v1/kbsv`;
      const accessToken = localStorage.getItem("token");

      const response = {
        data: {
          code: 0,
          errorCode: null,
          transactionTime: 1740710206918,
          category: null,
          subCategory: null,
          message: null,
          value: {
            totalRows: 5,
            first: 0,
            rows: 10,
            items: [
              {
                id: "67a45aeeaa96a77cf24d728b",
                employeeId: "111",
                fullName: "Fisher Smitty Jennifer",
                gender: "AAA",
                idNumber: "AAA",
                issueDate: "AAA",
                placeOfIssue: "AAA",
                phoneNumber: "AAA",
                personalEmail: "AAA",
                taxCode: "AAA"
              },
              {
                id: "67a45aeeaa96a77cf24d728c",
                employeeId: "222",
                fullName: "BBB",
                gender: "AAA",
                idNumber: "AAA",
                issueDate: "AAA",
                placeOfIssue: "AAA",
                phoneNumber: "AAA",
                personalEmail: "AAA",
                taxCode: "AAA"
              },
              {
                id: "67b5b18b45dad83bb2a986a6",
                employeeId: "XXXX",
                fullName: "XXX",
                gender: "Nam",
                idNumber: "XXX",
                issueDate: "11/11/2011",
                placeOfIssue: "XXX",
                phoneNumber: "XXX",
                personalEmail: "XXX",
                taxCode: "XXX"
              },
              {
                id: "67b5b1bd45dad83bb2a986a7",
                employeeId: "XXXX1",
                fullName: "XXX",
                gender: "Nam",
                idNumber: "XXX",
                issueDate: "11/11/2011",
                placeOfIssue: "XXX",
                phoneNumber: "XXX",
                personalEmail: "XXX",
                taxCode: "XXX"
              },
              {
                id: "67b5b309ad3794088f0eeb48",
                employeeId: "XXXX3",
                fullName: "XXX",
                gender: "Nam",
                idNumber: "XXX",
                issueDate: "11/11/2011",
                placeOfIssue: "XXX",
                phoneNumber: "XXX",
                personalEmail: "XXX",
                taxCode: "XXX"
              }
            ]
          }
        },
        status: 200,
        statusText: "",
        headers: {
          "cache-control": "no-cache, no-store, max-age=0, must-revalidate",
          "content-type": "application/json",
          expires: "0",
          pragma: "no-cache"
        },
        config: {
          transitional: {
            silentJSONParsing: true,
            forcedJSONParsing: true,
            clarifyTimeoutError: false
          },
          adapter: ["xhr", "http", "fetch"],
          transformRequest: [null],
          transformResponse: [null],
          timeout: 0,
          xsrfCookieName: "XSRF-TOKEN",
          xsrfHeaderName: "X-XSRF-TOKEN",
          maxContentLength: -1,
          maxBodyLength: -1,
          env: {},
          headers: {
            Accept: "application/json, text/plain, */*",
            Authorization:
              "Bearer eyJhbGciOiJSUzI1NiJ9.eyJyb2xlcyI6WyJST0xFX1BDUlQiLCJST0xFX1NQVCJdLCJzdWIiOiJ0ZXN0X2FtbCIsImlhdCI6MTc0MDcwOTkyNCwiZXhwIjoxNzQwNzI0MzI0fQ.bWWL0Ni9wviAI1FHeHs3bsJgw7I_6bGIwwMOMjUfvyuTjtrsZo_WyWFllsz5v4i_B8eN8ZPzuBv6_dJXp-2M9FhC37V1FV0wKF-jGBdxYNfBoWvNR7pz2BQzihaZfzAhiO5igJlzICVv_sJU4IGbptzHdcXGzUi_56A7J19eXRISHbCFKexyFMIHpxcs--QuMCEohch1VjgzC3x7wZDKbUGuUAiqMwLksKEtj6Lc2L1zztRaA3yFIZEXaqJEpm8aQPdeUUraL8fa9D942OgGiDqIQJhXPK8OPUV-6RNHwkhZmvQ2T9a2I7dI-3QqAYEAtDyFk0rQrr3iZg_AlAJGKg"
          },
          method: "get",
          url: "http://10.100.30.100:8080/aml/api/v1/kbsv"
        },
        request: {}
      };

      console.log("response", response);
      const { code, value } = response.data;
      if (code === 0) {
        let items = value.items || [];
        console.log(items);

        // Lọc dữ liệu theo từng cột cụ thể
        items = items.filter((item: any) => {
          return Object.entries(searchFilters).every(([key, filterValue]) => {
            console.log(`Filtering by ${key}: ${filterValue}`);
            console.log("Item Value:", item[key]); // Kiểm tra giá trị trong item

            if (!filterValue) return true;

            return item[key]
              ?.toString()
              .toLowerCase()
              .includes(filterValue.toLowerCase());
          });
        });

        // Sắp xếp dữ liệu nếu cần
        if (sortColumn && sortOrder) {
          items = items.sort((a: any, b: any) => {
            const aValue = a[sortColumn]?.toString().toLowerCase() || "";
            const bValue = b[sortColumn]?.toString().toLowerCase() || "";

            if (sortOrder === "ascend") {
              return aValue.localeCompare(bValue);
            } else if (sortOrder === "descend") {
              return bValue.localeCompare(aValue);
            }
            return 0;
          });
        }

        return { ...value, items };
      } else {
        message.error("Error fetching employee list");
      }
    } catch (error) {
      console.error("Error fetching employee list:", error);
      message.error("Failed to fetch employee list.");
    }
  };

  console.log(sortOrder);
  const employeeColumns = [
    {
      title: "Action",
      key: "action",
      render: (_: any, record: any) => (
        <EyeOutlined
          style={{ cursor: "pointer" }}
          onClick={() => handleEyeClick(record)}
        />
      )
    },
    {
      title: "Employee ID",
      dataIndex: "employeeId",
      key: "employeeId",
      sorter: true,
      filterable: true,
      renderFilter: ({ column, confirm }: any) => (
        <CustomFilterInput
          column={column}
          confirm={confirm}
          onChange={handleFilterChange}
        />
      ),
      render: (employeeId: string) => <span>{employeeId}</span>,
      onHeaderCell: () => ({
        onClick: () => handleSort("employeeId"),
        "data-column-key": "employeeId" // Thêm data attribute
      })
    },
    {
      title: "Full Name",
      dataIndex: "fullName",
      key: "fullName",
      sorter: true,
      filterable: true,
      renderFilter: ({ column, confirm }: any) => (
        <CustomFilterInput
          column={column}
          confirm={confirm}
          onChange={handleFilterChange}
        />
      ),
      render: (fullName: string) => <span>{fullName}</span>,
      onHeaderCell: () => ({
        onClick: () => handleSort("fullName")
      })
    },
    {
      title: "Gender",
      dataIndex: "gender",
      key: "gender",
      render: (gender: string) => <span>{gender || "N/A"}</span>,
      sorter: true,
      filterable: true,
      renderFilter: ({ column, confirm }: any) => (
        <CustomFilterInput
          column={column}
          confirm={confirm}
          onChange={handleFilterChange}
        />
      ),
      onHeaderCell: () => ({
        onClick: () => handleSort("gender")
      })
    },
    {
      title: "ID Number",
      dataIndex: "idNumber",
      key: "idNumber",
      sorter: true,
      filterable: true,
      renderFilter: ({ column, confirm }: any) => (
        <CustomFilterInput
          column={column}
          confirm={confirm}
          onChange={handleFilterChange}
        />
      ),
      onHeaderCell: () => ({
        onClick: () => handleSort("idNumber")
      }),
      render: (idNumber: string) => <span>{idNumber}</span>
    }
  ];

  // Hàm xử lý sự kiện nhấn vào cột để sắp xếp
  const handleSort = (column: string) => {
    setSortColumn((prevColumn) => {
      if (prevColumn === column) {
        // Nếu nhấn vào cùng một cột, đảo ngược thứ tự
        setSortOrder((prevOrder) =>
          prevOrder === "ascend" ? "descend" : "ascend"
        );
      } else {
        // Nếu nhấn vào cột mới, đặt thành 'ascend' mặc định
        setSortOrder("ascend");
      }
      return column; // Cập nhật sortColumn
    });
  };

  function uploadFile(file: any) {
    message.success("Đã cập nhật danh sách thành công!");
  }

  const handleFileChange = ({ file }: { file: any }) => {
    const allowedExtensions = [".txt", ".csv", ".xls", ".xlsx"];
    const fileExtension = file.name.slice(
      ((file.name.lastIndexOf(".") - 1) >>> 0) + 2
    );

    /* if (!allowedExtensions.includes(`.${fileExtension}`)) {
      message.error("Tải danh sách không thành công!");
      setFileList([]);
      return;
    } */

    if (file.size / 1024 / 1024 > 10) {
      setErrorMessage("File vượt quá dung lượng 10MB");
      setFileList([]);
    } else {
      setErrorMessage("");
      setFileList([file]);
    }
  };

  return (
    <div className="body relative w-full h-full">
      <div className="flex flex-row w-full h-full">
        <div className="dashboard-container flex-1 bg-gray-100 p-4">
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
            columns={employeeColumns}
            fetchData={fetchEmployeeList}
            addIndexCol={true}
            sortColumn={sortColumn}
            sortOrder={sortOrder}
          />
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
              <p className="ant-upload-text">
                <CloudUploadOutlined />
              </p>
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
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "10px",
            marginTop: "10px"
          }}
        >
          {fileList.length > 0 && (
            <Button type="primary" onClick={() => setFileList([])}>
              Tải lại file
            </Button>
          )}
          <Button type="primary" onClick={handleReadFile}>
            Đọc file
          </Button>
        </div>
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

      {/* Modal hiển thị dữ liệu đọc từ file */}
      <Modal
        title="Dữ liệu từ file"
        open={fileData.length > 0} // Open if fileData has content
        onCancel={() => setFileData([])} // Close modal
        footer={[
          <Button
            key="confirm"
            type="primary"
            onClick={() => uploadFile(fileList[0])}
          >
            Xác nhận
          </Button>,
          <Button key="close" type="primary" onClick={() => setFileData([])}>
            Đóng
          </Button>
        ]}
        width={1600}
      >
        {/* Wrapper div to enable horizontal scroll */}
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr>
                {fileData[0]?.map((col: string, index: number) => (
                  <th
                    key={index}
                    style={{ border: "1px solid #ddd", padding: "8px" }}
                  >
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {fileData.slice(1).map((row, rowIndex) => (
                <tr key={rowIndex}>
                  {row.map((cell: string, colIndex: number) => (
                    <td
                      key={colIndex}
                      style={{ border: "1px solid #ddd", padding: "8px" }}
                    >
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Modal>
    </div>
  );
};

export default Manage;
