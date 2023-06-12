import React, { useState } from "react";

interface Props {
  page: number;
  onPageChange: (newPage: number) => void;
  limit: number;
  onLimitChange: (newLimit: number) => void;
  totalItems: number;
  loading: boolean;
}

const Pagination: React.FC<Props> = ({
  page,
  onPageChange,
  limit,
  onLimitChange,
  totalItems,
  loading,
}) => {
  const [itemsPerPage, setItemsPerPage] = useState<number>(limit);
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const handlePrevPage = () => {
    if (page > 1) onPageChange(page - 1);
  };

  const handleNextPage = () => {
    if (page < totalPages) onPageChange(page + 1);
  };

  const handleFirstPage = () => {
    onPageChange(1);
  };

  const handleLastPage = () => {
    onPageChange(totalPages);
  };

  const handleItemsPerPageChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const newLimit = parseInt(event.target.value);
    setItemsPerPage(newLimit);
    onLimitChange(newLimit);
  };

  return (
    <div>
      <button onClick={handleFirstPage} disabled={page === 1}>
        First
      </button>
      <button onClick={handlePrevPage} disabled={page === 1}>
        Previous
      </button>
      <span>{` ${page} / ${totalPages} `}</span>
      <button onClick={handleNextPage} disabled={page === totalPages}>
        Next
      </button>
      <button onClick={handleLastPage} disabled={page === totalPages}>
        Last
      </button>
      <select value={itemsPerPage} onChange={handleItemsPerPageChange}>
        <option value="10">10</option>
        <option value="20">20</option>
        <option value="50">50</option>
      </select>
      {loading && <span>Loading...</span>}
    </div>
  );
};

export default Pagination;
