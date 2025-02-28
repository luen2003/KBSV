import React from "react";

import { Tag, Space } from "antd";

const Annotate = () => {
  return (
    <Space size="large">
      <div style={{ display: "flex", gap: "10px" }}>
        {" "}
        {/* Sử dụng flexbox để sắp xếp các khối */}
        <div style={{ display: "flex" }}>
          {" "}
          {/* Flexbox cho từng khối để căn chỉnh màu và chữ */}
          <div
            style={{
              width: "20px",
              height: "20px",
              backgroundColor: "white",
              border: "1px solid #D8DBE0"
            }}
          ></div>{" "}
          {/* Khối màu trắng */}
          <div style={{ marginLeft: "5px" }}>
            Thông tin không tính tỉ lệ
          </div>{" "}
          {/* Chữ bên phải */}
        </div>
        <div style={{ display: "flex" }}>
          <div
            style={{ width: "20px", height: "20px", backgroundColor: "pink" }}
          ></div>{" "}
          {/* Khối màu hồng */}
          <div style={{ marginLeft: "5px" }}>
            Thông tin tính tỉ lệ, bị trùng khớp
          </div>{" "}
          {/* Chữ bên phải */}
        </div>
        <div style={{ display: "flex" }}>
          <div
            style={{ width: "20px", height: "20px", backgroundColor: "green" }}
          ></div>{" "}
          {/* Khối màu xanh lá cây */}
          <div style={{ marginLeft: "5px" }}>
            Thông tin tính tỉ lệ, không trùng khớp
          </div>{" "}
          {/* Chữ bên phải */}
        </div>
      </div>
    </Space>
  );
};

export default Annotate;
