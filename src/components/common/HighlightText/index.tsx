import React from "react";

interface HighlightTextProps {
  text: string; // Chuỗi tổng để tìm kiếm trong
  searchText: string; // Chuỗi cần được tìm và highlight
  classNames?: { highlight?: string };
}

const HighlightText: React.FC<HighlightTextProps> = ({
  text,
  searchText,
  classNames
}) => {
  if (!searchText.trim()) {
    return <span className="text-14px font-bold">{text}</span>;
  }

  // Tạo một RegExp để tìm kiếm không phân biệt hoa thường
  const regex = new RegExp(`(${searchText})`, "gi");
  const parts = text.split(regex);

  return (
    <span className="text-14px font-bold">
      {parts.map((part, index) =>
        regex.test(part) ? (
          <mark className={classNames?.highlight} key={index}>
            {part}
          </mark>
        ) : (
          part
        )
      )}
    </span>
  );
};

export default HighlightText;
