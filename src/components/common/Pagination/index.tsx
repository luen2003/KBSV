import React, { useState, FC } from "react";
import { IPropsPagination } from "./interfaces";

const Pagination: FC<IPropsPagination> = ({
  data,
  itemsPerPage,
  onPageChange
}) => {
  const [currentPage, setCurrentPage] = useState<number>(1);

  const totalItems = data.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const handleClick = (page: number): void => {
    setCurrentPage(page);
    onPageChange(page);
  };

  const handleFirstPage = () => {
    setCurrentPage(1);
    onPageChange(1);
  };

  const handleLastPage = () => {
    setCurrentPage(totalPages);
    onPageChange(totalPages);
  };

  const handlePrevPage = () => {
    const newPage = Math.max(currentPage - 1, 1);
    setCurrentPage(newPage);
    onPageChange(newPage);
  };

  const handleNextPage = () => {
    const newPage = Math.min(currentPage + 1, totalPages);
    setCurrentPage(newPage);
    onPageChange(newPage);
  };

  const renderPagination = () => {
    const pages = [];

    // Nút về trang đầu tiên
    pages.push(
      <button
        key="first"
        onClick={handleFirstPage}
        className={`mx-1 px-3 py-1 rounded ${
          currentPage === 1 ? "text-gray-011" : "text-gray-011"
        }`}
      >
        {"<<"}
      </button>
    );

    // Nút về trang trước
    pages.push(
      <button
        key="prev"
        onClick={handlePrevPage}
        className={`mx-1 px-3 py-1 rounded ${
          currentPage === 1 ? "text-gray-011" : "text-gray-011"
        }`}
      >
        {"<"}
      </button>
    );

    // Nút các trang
    for (let i = 1; i <= totalPages; i++) {
      pages.push(
        <button
          key={i}
          onClick={() => handleClick(i)}
          className={`mx-1 px-3 py-1 rounded ${
            currentPage === i ? "bg-color-brown text-gray-011" : "text-gray-011"
          }`}
        >
          {i}
        </button>
      );
    }

    // Nút về trang sau
    pages.push(
      <button
        key="next"
        onClick={handleNextPage}
        className={`mx-1 px-3 py-1 rounded ${
          currentPage === totalPages ? "text-gray-011" : "text-gray-011"
        }`}
      >
        {">"}
      </button>
    );

    // Nút về trang cuối cùng
    pages.push(
      <button
        key="last"
        onClick={handleLastPage}
        className={`mx-1 px-3 py-1 rounded ${
          currentPage === totalPages ? "text-gray-011" : "text-gray-011"
        }`}
      >
        {">>"}
      </button>
    );
    return pages;
  };

  return (
    <div>
      <div className="flex justify-center">{renderPagination()}</div>
    </div>
  );
};

export default Pagination;
