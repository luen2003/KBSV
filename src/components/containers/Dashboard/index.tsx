/* eslint-disable import/no-duplicates */
import fs from "fs";

import { useEffect, useRef, useState } from "react";

import {
  HomeOutlined,
  UploadOutlined,
  FilterOutlined,
  FileOutlined,
  EyeOutlined,
  CloudUploadOutlined
} from "@ant-design/icons";
import { FilterInput } from "@components/common/Table";
import GridTable from "@components/common/Table/Table"; // Ensure GridTable is properly imported
import {
  Button,
  Form,
  Input,
  Row,
  Col,
  Tag,
  Table,
  Breadcrumb,
  Pagination,
  Select,
  Modal,
  Upload,
  message
} from "antd";
import { Badge } from "antd"; // Import the Dragger component for drag-and-drop file upload
import axios from "axios";

import RightSideBar from "../../layout/components/RightSideBar";
const { Option } = Select;
const { Dragger } = Upload;

const Dashboard: React.FC = () => {
  const [pageSize, setPageSize] = useState<number>(10);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isModalDetailVisible, setIsModalDetailVisible] =
    useState<boolean>(false);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [fileList, setFileList] = useState<any[]>([]);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const tableRef = useRef<any>(null);
  const table1Ref = useRef<any>(null);
  const [sortColumn, setSortColumn] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState<"ascend" | "descend" | null>(null);
  const [tableData, setTableData] = useState<any[]>([]);
  const [selectedRecord, setSelectedRecord] = useState<any | null>(null);
  async function downloadTemplate() {
    try {
      // URL của endpoint
      const baseUrl = "http://10.100.30.100:8080/aml";
      const downloadUrl = `${baseUrl}/api/v1/kbsv/download/Kbsv-Emp-template`;

      // Access token sau khi đăng nhập
      const accessToken = localStorage.getItem("token"); // Thay bằng token thực tế của bạn

      const response = await axios.get(downloadUrl, {
        responseType: "arraybuffer", // Đảm bảo nhận dữ liệu dưới dạng byte array
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      });

      // Tạo Blob từ dữ liệu
      const blob = new Blob([response.data], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
      });

      // Tạo URL để tải file
      const link = document.createElement("a");
      link.href = window.URL.createObjectURL(blob);
      link.download = "Kbsv-Emp-template.xlsx"; // Tên file
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link); // Loại bỏ link sau khi tải xong

      console.log("File đã được tải xuống thành công!");
    } catch (error) {
      console.error("Lỗi khi tải file:", error);
    }
  }

  const fetchData = async () => {
    try {
      const response = {
        data: {
          code: 0,
          errorCode: null,
          transactionTime: 1740709658680,
          category: null,
          subCategory: null,
          message: null,
          value: {
            totalRows: 445345,
            first: 0,
            rows: 10,
            items: [
              {
                personEntityId: "100000",
                status: "Inactive",
                gender: "Female",
                primaryName: "Yuliya-Anatolevna-Yuliya",
                type: "Person",
                dobr: "10/Jul/1956",
                cc: "Russia"
              },
              {
                personEntityId: "100001",
                status: "Inactive",
                gender: "Female",
                primaryName: "Olga-Innokentevna-Olga",
                type: "Person",
                dobr: "//1949",
                cc: "Russia"
              },
              {
                personEntityId: "100002",
                status: "Inactive",
                gender: "Male",
                primaryName: "Aleksandr-Andreevich-Aleksandr",
                type: "Person",
                dobr: "//1949",
                cc: "Russia"
              },
              {
                personEntityId: "100003",
                status: "Inactive",
                gender: "Male",
                primaryName: "Viktor-Petrovich-Viktor",
                type: "Person",
                dobr: "18/Jan/1956",
                cc: "Russia"
              },
              {
                personEntityId: "100004",
                status: "Active",
                gender: "Male",
                primaryName: "Anatoliy-Nikolaevich-Anatoliy",
                type: "Person",
                dobr: "13/Jan/1960",
                cc: "Russia"
              },
              {
                personEntityId: "100005",
                status: "Inactive",
                gender: "Male",
                primaryName: "Petr-Romanovich-Petr",
                type: "Person",
                dobr: "//1953",
                cc: "Russia"
              },
              {
                personEntityId: "100006",
                status: "Inactive",
                gender: "Male",
                primaryName: "Nikita-Sergeevich-Nikita",
                type: "Person",
                dobr: "29/Jul/1957",
                cc: "Russia"
              },
              {
                personEntityId: "100011",
                status: "Inactive",
                gender: "Male",
                primaryName: "Ivan-Stepanovich-Ivan",
                type: "Person",
                dobr: "//1944",
                cc: "Russia"
              },
              {
                personEntityId: "100014",
                status: "Inactive",
                gender: "Male",
                primaryName: "Viktor-Petrovich-Viktor",
                type: "Person",
                dobr: "11/Jan/1952",
                cc: "Russia"
              },
              {
                personEntityId: "100015",
                status: "Inactive",
                gender: "Male",
                primaryName: "Leonid-Nikolaevich-Leonid",
                type: "Person",
                dobr: "01/Mar/1951",
                cc: "Russia"
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
              "Bearer eyJhbGciOiJSUzI1NiJ9.eyJyb2xlcyI6WyJST0xFX1BDUlQiLCJST0xFX1NQVCJdLCJzdWIiOiJ0ZXN0X2FtbCIsImlhdCI6MTc0MDcwOTU1NSwiZXhwIjoxNzQwNzIzOTU1fQ.QT2ZgGaDPHdjvNDf7W_vXgP-R_jCTjWg-3FGvSP9MvsWdxULFrHZxTDLpRxX0qkfJCYj4kogboj8sCeAgy7k_xVwBLCRUdQ8iZjYvCJPw0lObx_2tNls9FTbb_FhPnrHyFgRj2Eb5yl_bCc6JLCf3gxQwcCgKR2RQFho2XO5_z7eAjM3SQlQ4USs-eSs4oq_iiMbuKZPqRLwU_08pLmMr58N7vNRrov21z9qBUHOr6VZu2WIqzIcMJj32c3bhtICauLjuMqje2JHGPlIKtkKBJsWhrUz9ID0U6ts8OxQxwbOZMna1OJ9YrIsml7YUDQl54FX5AQ05prmTQQaxhFgtA"
          },
          method: "get",
          url: "http://10.100.30.100:8080/aml/api/v1/blackList"
        },
        request: {}
      };
      const { code, value } = response.data;
      if (code === 0) {
        let data = { ...value }; // Copy the value object to maintain the rest of the structure
        const items = value.items || []; // Extract items for sorting

        // Sort the items array if the sortColumn and sortOrder are defined
        if (sortColumn && sortOrder) {
          data.items = items.sort((a: any, b: any) => {
            const aValue = a[sortColumn];
            const bValue = b[sortColumn];

            if (sortOrder === "ascend") {
              return aValue > bValue ? 1 : aValue < bValue ? -1 : 0;
            } else if (sortOrder === "descend") {
              return aValue < bValue ? 1 : aValue > bValue ? -1 : 0;
            }
            return 0;
          });
        }

        return data;
      } else {
        message.error("Error fetching data");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      message.error("Failed to fetch data.");
    }
  };
  const fetchDetailData = async (id: string) => {
    try {
      const response = {
        data: {
          code: 0,
          errorCode: null,
          transactionTime: 1740709963570,
          category: null,
          subCategory: null,
          message: null,
          value: {
            personEntityId: "100000",
            type: "Person",
            status: "Inactive",
            gender: "Female",
            country:
              "Citizenship - Russia|Resident of - Russia|Jurisdiction - Russia",
            dobr: "10/Jul/1956",
            name: {
              primaryName: {
                titleHonorific: "",
                firstName: "Yuliya",
                middleName: "Anatolevna",
                surname: "Peskovskaya",
                suffix: "",
                description1: "Politically Exposed Person (PEP)",
                description2: "",
                description3: ""
              },
              spellingVariation: {
                titleHonorific: "",
                firstName: "Iuliia",
                middleName: "Anatolievna",
                surname: "Peskovskaia",
                suffix: "",
                description1: "",
                description2: "",
                description3: ""
              }
            },
            identification: "",
            role: "Primary Occupation - Senior Civil Servants-Regional Government - See Previous Roles - From: // - To: //|Previous Roles - Regional Government Ministers - Minister of Labour and Welfare, Republic of Sakha (Yakutia) - From: //1998 - To: //2007",
            address: ""
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
          url: "http://10.100.30.100:8080/aml/api/v1/blackList/100000"
        },
        request: {}
      };
      console.log("response", response);
      const { code, value } = response.data;
      const items = response.data.value;
      const detailDataTable = {
        totalRows: 1,
        first: 0,
        rows: 1,
        items: [items]
      };
      return detailDataTable;
    } catch (error) {
      console.error("Error fetching detail data:", error);
      message.error("Failed to fetch detail data.");
      return null;
    }
  };

  const handleEyeClick = async (record: any) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    const detailData = await fetchDetailData(record.personEntityId);
    if (detailData) {
      console.log(detailData);
      setSelectedRecord(detailData);
      setIsModalDetailVisible(true);
    }
  };
  function uploadFile(file: any) {
    message.success("Đã cập nhật danh sách thành công!");
  }
  const fetchDetailEyeData = async () => {
    return selectedRecord;
  };
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

  useEffect(() => {
    fetchData(); // Gọi API khi component mount
  }, []);

  const handlePageSizeChange = (value: number) => {
    setPageSize(value);
    setCurrentPage(1);
  };

  const columns = [
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
      title: "Person Entity ID",
      dataIndex: "personEntityId",
      key: "personEntityId",
      sorter: true, // Add sorter
      render: (personEntityId: string) => <span>{personEntityId}</span>,
      onHeaderCell: () => ({
        onClick: () => handleSort("personEntityId")
      })
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      sorter: true, // Add sorter
      render: (status: string) => {
        let statusColor = "gray";
        if (status === "Active") statusColor = "green";
        if (status === "Inactive") statusColor = "red";
        return <Badge color={statusColor} text={status} />;
      },
      onHeaderCell: () => ({
        onClick: () => handleSort("status")
      })
    },
    {
      title: "Gender",
      dataIndex: "gender",
      key: "gender",
      render: (gender: string) => <span>{gender || "N/A"}</span>,
      onHeaderCell: () => ({
        onClick: () => handleSort("gender")
      })
    },
    {
      title: "Primary Name",
      dataIndex: "primaryName",
      key: "primaryName",
      sorter: true, // Add sorter
      render: (primaryName: string) => <span>{primaryName}</span>,
      onHeaderCell: () => ({
        onClick: () => handleSort("primaryName")
      })
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
      sorter: true, // Add sorter
      render: (type: string) => <span>{type}</span>,
      onHeaderCell: () => ({
        onClick: () => handleSort("type")
      })
    },
    {
      title: "Date of Birth",
      dataIndex: "dobr",
      key: "dobr",
      sorter: true, // Add sorter
      render: (dobr: string) => <span>{dobr}</span>,
      onHeaderCell: () => ({
        onClick: () => handleSort("dobr")
      })
    },
    {
      title: "Country",
      dataIndex: "cc",
      key: "cc",
      sorter: true, // Add sorter
      render: (cc: string) => <span>{cc}</span>,
      onHeaderCell: () => ({
        onClick: () => handleSort("cc")
      })
    }
  ];

  const detailColumns = [
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
      title: "Person Entity ID",
      dataIndex: "personEntityId",
      key: "personEntityId",
      renderFilter: ({ column, confirm, ref }: any) => (
        <FilterInput column={column} confirm={confirm} ref={ref} />
      ),
      render: (personEntityId: string) => <span>{personEntityId}</span>
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
      renderFilter: ({ column, confirm, ref }: any) => (
        <FilterInput column={column} confirm={confirm} ref={ref} />
      ),
      render: (type: string) => <span>{type}</span>
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      renderFilter: ({ column, confirm, ref }: any) => (
        <FilterInput column={column} confirm={confirm} ref={ref} />
      ),
      render: (status: string) => {
        const statusColor = status === "Active" ? "green" : "red";
        return <Badge color={statusColor} text={status} />;
      }
    },
    {
      title: "Gender",
      dataIndex: "gender",
      key: "gender",
      renderFilter: ({ column, confirm, ref }: any) => (
        <FilterInput column={column} confirm={confirm} ref={ref} />
      ),
      render: (gender: string) => gender || "N/A"
    },
    {
      title: "Country",
      dataIndex: "country",
      key: "country",
      renderFilter: ({ column, confirm, ref }: any) => (
        <FilterInput column={column} confirm={confirm} ref={ref} />
      ),
      render: (country: string) => <span>{country}</span>
    },
    {
      title: "Date of Birth",
      dataIndex: "dobr",
      key: "dobr",
      renderFilter: ({ column, confirm, ref }: any) => (
        <FilterInput column={column} confirm={confirm} ref={ref} />
      ),
      render: (dobr: string) => <span>{dobr}</span>
    },
    {
      title: "Primary Name",
      dataIndex: ["name", "primaryName", "firstName"],
      key: "primaryName",
      renderFilter: ({ column, confirm, ref }: any) => (
        <FilterInput column={column} confirm={confirm} ref={ref} />
      ),
      render: (firstName: string) => <span>{firstName}</span>
    },
    {
      title: "Description 1",
      dataIndex: ["name", "primaryName", "description1"],
      key: "description1",
      renderFilter: ({ column, confirm, ref }: any) => (
        <FilterInput column={column} confirm={confirm} ref={ref} />
      ),
      render: (description1: string) => <span>{description1}</span>
    },
    {
      title: "Also Known As",
      dataIndex: ["name", "alsoKnownAs", "firstName"],
      key: "alsoKnownAs",
      renderFilter: ({ column, confirm, ref }: any) => (
        <FilterInput column={column} confirm={confirm} ref={ref} />
      ),
      render: (aka: string) => <span>{aka}</span>
    },
    {
      title: "Spelling Variation",
      dataIndex: ["name", "spellingVariation", "firstName"],
      key: "spellingVariation",
      renderFilter: ({ column, confirm, ref }: any) => (
        <FilterInput column={column} confirm={confirm} ref={ref} />
      ),
      render: (variation: string) => <span>{variation}</span>
    },
    {
      title: "Identification",
      dataIndex: "identification",
      key: "identification",
      renderFilter: ({ column, confirm, ref }: any) => (
        <FilterInput column={column} confirm={confirm} ref={ref} />
      ),
      render: (identification: string) => <span>{identification}</span>
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
      renderFilter: ({ column, confirm, ref }: any) => (
        <FilterInput column={column} confirm={confirm} ref={ref} />
      ),
      render: (role: string) => <span>{role || "N/A"}</span>
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
      renderFilter: ({ column, confirm, ref }: any) => (
        <FilterInput column={column} confirm={confirm} ref={ref} />
      ),
      render: (address: string) => <span>{address}</span>
    }
  ];

  const handleImportClick = () => {
    setIsModalVisible(true);
  };

  const reloadTable = () => {
    fetchData(); // Fetch lại dữ liệu
  };

  const fetchDataTable = async () => {
    try {
      const data = tableData; // Giả sử đây là API call trong thực tế
      console.log(data);
      return data;
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

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

  const handleReadFile = () => {
    if (fileList.length === 0) {
      message.error("Vui lòng chọn file trước!");
      return;
    }
    uploadFile(fileList[0]);
    downloadTemplate();

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
            pagination={{
              current: currentPage,
              total: tableData.length, // Cập nhật total
              pageSize,
              onChange: setCurrentPage
            }}
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
                      <Input
                        value={selectedRecord.items[0].personEntityId}
                        readOnly
                      />
                    </Form.Item>
                  </Col>
                  <Col span={8}>
                    <Form.Item label="Type">
                      <Tag color="purple">{selectedRecord.items[0].type}</Tag>
                    </Form.Item>
                  </Col>
                  <Col span={8}>
                    <Form.Item label="Active Status">
                      <Tag
                        color={
                          selectedRecord.items[0].status === "Active"
                            ? "green"
                            : "red"
                        }
                      >
                        ● {selectedRecord.items[0].status}
                      </Tag>{" "}
                    </Form.Item>
                  </Col>
                </Row>

                {/* Gender, Date of Birth */}
                <Row gutter={16}>
                  <Col span={8}>
                    <Form.Item label="Gender">
                      <Input
                        value={selectedRecord.items[0].gender || "N/A"}
                        readOnly
                      />
                    </Form.Item>
                  </Col>
                  <Col span={8}>
                    <Form.Item label="Date of Birth">
                      <Input
                        value={selectedRecord.items[0].dobr || "N/A"}
                        readOnly
                      />
                    </Form.Item>
                  </Col>
                </Row>
                <GridTable
                  ref={table1Ref}
                  columns={detailColumns}
                  fetchData={fetchDetailEyeData}
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
                  <p className="ant-upload-text">
                    <CloudUploadOutlined />
                  </p>
                  <p className="ant-upload-hint">
                    Chỉ chấp nhận các file định dạng .csv (tối đa 10MB)
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
              {fileList.length > 0 && (
                <Button
                  type="primary"
                  onClick={() => {
                    setFileList([]);
                  }}
                >
                  Tải lại file
                </Button>
              )}
              <Button type="primary" onClick={handleReadFile}>
                Đọc file
              </Button>
            </div>
          </Modal>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
