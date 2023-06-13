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
      <button
        className="ml-0 rounded-l-lg border border-gray-300 bg-white px-3 py-2 leading-tight text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
        onClick={handleFirstPage}
        disabled={page === 1}
      >
        First
      </button>
      <button
        onClick={handlePrevPage}
        disabled={page === 1}
        className="border border-gray-300 bg-white px-3 py-2 leading-tight text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
      >
        Previous
      </button>
      <span className="e border border-gray-300 bg-white px-3 py-2 leading-tight text-gray-500 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400">{` ${page} / ${totalPages} `}</span>
      <button
        className="border border-gray-300 bg-white px-3 py-2 leading-tight text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
        onClick={handleNextPage}
        disabled={page === totalPages}
      >
        Next
      </button>
      <button
        className="rounded-r-lg border border-gray-300 bg-white px-3 py-2 leading-tight text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
        onClick={handleLastPage}
        disabled={page === totalPages}
      >
        Last
      </button>
      {loading && <span>Loading...</span>}
    </div>
  );
};

export default Pagination;
