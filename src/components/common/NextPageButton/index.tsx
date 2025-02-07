import { ArrowLeft2, ArrowRight2 } from "iconsax-react";
import React, { useState } from "react";
import { IPropsNextPageButton } from "./interfaces";

const NextPageButton: React.FC<IPropsNextPageButton> = ({
  pageLength,
  currentPage,
  onPageChange
}) => {
  const [prevButtonClicked, setPrevButtonClicked] = useState(false);
  const [nextButtonClicked, setNextButtonClicked] = useState(false);
  const handlePrevClick = () => {
    if (currentPage > 1) {
      setPrevButtonClicked(true);
      setNextButtonClicked(false);
      onPageChange(currentPage - 1);
    }
  };
  const handleNextClick = () => {
    setNextButtonClicked(true);
    setPrevButtonClicked(false);
    onPageChange(currentPage + 1);
  };

  return (
    <div className="px-16px">
      <button
        onClick={handlePrevClick}
        disabled={currentPage === 1}
        className={`mx-1 rounded-xl ${
          prevButtonClicked ? "bg-gray-006" : "bg-gray-005"
        }`}
      >
        <ArrowLeft2 className="text-gray-011 m-6px" />
      </button>
      <button
        onClick={handleNextClick}
        disabled={pageLength < 10}
        className={`mx-1 rounded-xl ${
          nextButtonClicked ? "bg-gray-006" : "bg-gray-005"
        }
        `}
      >
        <ArrowRight2 className="text-gray-011 m-6px" />
      </button>
    </div>
  );
};

export default NextPageButton;
