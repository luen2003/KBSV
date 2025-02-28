import React, { useState } from "react";

import { Input, Button } from "antd";

interface CustomFilterInputProps {
  column: string;
  onChange: (column: string, value: string) => void;
  confirm: () => void;
}

const CustomFilterInput: React.FC<CustomFilterInputProps> = ({
  column,
  onChange,
  confirm
}) => {
  const [value, setValue] = useState("");

  const handleFilter = () => {
    onChange(column, value);
    confirm();
  };

  return (
    <div style={{ padding: 8 }}>
      <Input
        placeholder={`Tìm kiếm ${column}`}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        style={{ width: 188, marginBottom: 8, display: "block" }}
      />
      <Button type="primary" onClick={handleFilter} size="small">
        Lọc
      </Button>
    </div>
  );
};

export default CustomFilterInput;
