import { useEffect, useRef, useState } from "react";

import GridTable from "@components/common/Table/Table";
import { Table, Tag, Space } from "antd";

const OrganizedTable = () => {
  const tableRef = useRef<any>(null);

  const fetchData = async () => {
    try {
      const data = dataTable; // Giả sử đây là API call trong thực tế
      return data;
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const personalColumns = [
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      filterable: true,
      className: "has-filter"
    },
    {
      title: "NameType",
      dataIndex: "nameType",
      key: "nameType",
      filterable: true,
      className: "has-filter"
    },
    {
      title: "Title Honorific",
      dataIndex: "titleHonorific",
      key: "titleHonorific",
      filterable: true,
      className: "has-filter"
    },
    {
      title: "First Name",
      dataIndex: "firstName",
      key: "firstName",
      filterable: true,
      className: "has-filter"
    },
    {
      title: "Middle",
      dataIndex: "middle",
      key: "middle",
      filterable: true,
      className: "has-filter"
    },
    {
      title: "Surname",
      dataIndex: "surname",
      key: "surname",
      filterable: true,
      className: "has-filter"
    },
    {
      title: "Maiden Name",
      dataIndex: "maidenName",
      key: "maidenName",
      filterable: true,
      className: "has-filter"
    },
    {
      title: "Suffix Name",
      dataIndex: "suffixName",
      key: "suffixName",
      filterable: true,
      className: "has-filter"
    },
    {
      title: "Original Script Name",
      dataIndex: "originalScriptName",
      key: "originalScriptName",
      filterable: true,
      className: "has-filter"
    },
    {
      title: "Single Script Name",
      dataIndex: "singleScriptName",
      key: "singleScriptName",
      filterable: true,
      className: "has-filter"
    },
    {
      title: "Descriptions",
      dataIndex: "descriptions",
      key: "descriptions",
      filterable: true,
      className: "has-filter"
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
  const columns = [
    {
      title: "Thông tin KB",
      dataIndex: "kbInfo",
      key: "kbInfo"
    },
    {
      title: "Thông tin Dowjones",
      dataIndex: "dowjonesInfo",
      key: "dowjonesInfo"
    }
  ];

  const data = [
    {
      key: "1",
      kbInfo: <></>,
      dowjonesInfo: (
        <>
          <Space direction="horizontal" size="small">
            {" "}
            <div style={{ display: "flex", alignItems: "center" }}>
              <p style={{ margin: 0, marginRight: "5px" }}>Tỉ lệ trùng khớp:</p>
              <Tag color="#F0F4FE" style={{ color: "black" }}>
                50%
              </Tag>
            </div>
            <div style={{ display: "flex", alignItems: "center" }}>
              <p style={{ margin: 0, marginRight: "5px" }}>ID:</p>
              <Tag color="#F0F4FE" style={{ color: "black" }}>
                13062112
              </Tag>
            </div>
            <div style={{ display: "flex", alignItems: "center" }}>
              <p style={{ margin: 0, marginRight: "5px" }}>Status:</p>
              <Tag color="#F0F4FE" style={{ color: "black" }}>
                13062112
              </Tag>
            </div>
            <div style={{ display: "flex", alignItems: "center" }}>
              <p style={{ margin: 0, marginRight: "5px" }}>Type:</p>
              <Tag color="#F0F4FE" style={{ color: "black" }}>
                Person
              </Tag>
            </div>
          </Space>
        </>
      )
    },
    {
      key: "2",
      kbInfo: (
        <>
          <p>
            <b>Tên khách hàng:</b>
          </p>
          <Tag color="green">Thụy Khuê</Tag>
        </>
      ),
      dowjonesInfo: (
        <>
          <GridTable
            ref={tableRef}
            columns={personalColumns}
            fetchData={fetchData}
            addIndexCol={true}
          />
        </>
      )
    },
    {
      key: "3",
      kbInfo: (
        <>
          <p>
            <b>Ngày sinh:</b>
          </p>
          <Tag color="green">20/01/2000</Tag>
        </>
      ),
      dowjonesInfo: (
        <>
          <p>
            <b>Date Of Birth:</b>
          </p>
          <Tag color="green">20/01/2000</Tag>
        </>
      )
    },
    {
      key: "4",
      kbInfo: (
        <>
          <p>
            <b>Quốc tịch:</b>
          </p>
          <Tag
            style={{
              border: "1px solid #ccc",
              backgroundColor: "white",
              color: "black"
            }}
          >
            Anh
          </Tag>{" "}
        </>
      ),
      dowjonesInfo: (
        <>
          <p>
            <b>Country:</b>
          </p>
          <Tag
            style={{
              border: "1px solid #ccc",
              backgroundColor: "white",
              color: "black"
            }}
          >
            Citizenship - United Kingdom (UK)
          </Tag>
          <Tag
            style={{
              border: "1px solid #ccc",
              backgroundColor: "white",
              color: "black"
            }}
          >
            Resident of - United Kingdom (UK)
          </Tag>
        </>
      )
    },
    {
      key: "5",
      kbInfo: (
        <>
          <p>
            <b>Mã số thuế:</b>
          </p>
          <Tag
            style={{
              border: "1px solid #ccc",
              backgroundColor: "#FECACA",
              color: "black"
            }}
          >
            0123456789
          </Tag>{" "}
        </>
      ),
      dowjonesInfo: (
        <>
          <p>
            <b>National Tax No:</b>
          </p>
          <Tag
            style={{
              border: "1px solid #ccc",
              backgroundColor: "#FECACA",
              color: "black"
            }}
          >
            012345686242
          </Tag>{" "}
        </>
      )
    },
    {
      key: "6",
      kbInfo: (
        <>
          <p>
            <b>Ngành nghề:</b>
          </p>
          <Tag
            style={{
              border: "1px solid #ccc",
              backgroundColor: "white",
              color: "black"
            }}
          >
            Tài chính ngân hàng
          </Tag>{" "}
        </>
      ),
      dowjonesInfo: (
        <>
          <p style={{ color: "red" }}>Không có thông tin</p>
        </>
      )
    }
  ];

  return <Table columns={columns} dataSource={data} pagination={false} />;
};

export default OrganizedTable;
