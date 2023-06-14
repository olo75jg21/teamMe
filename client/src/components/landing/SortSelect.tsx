import React from "react";

interface Props {
  onSortChange: (sortBy: string, order: string) => void;
}

const SortSelect: React.FC<Props> = ({ onSortChange }) => {
  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const [sortBy, order] = event.target.value.split("-");
    onSortChange(sortBy, order);
  };

  return (
    <div className="flex w-1/5 flex-col">
      <select
        onChange={handleSortChange}
        className="text-md focus:shadow-outline w-full rounded border-2 border-gray-400 bg-gray-600 px-3 py-2 font-semibold leading-tight text-gray-200 duration-200 selection:bg-gray-700 focus:border-violet-500 focus:outline-none"
      >
        <option value="">Sort By</option>
        <option value="name-asc">Name Ascending</option>
        <option value="name-desc">Name Descending</option>
        <option value="createdAt-asc">Creation Time Ascending</option>
        <option value="createdAt-desc">Creation Time Descending</option>
        <option value="slots-asc">Slots Ascending</option>
        <option value="slots-desc">Slots Descending</option>
      </select>
    </div>
  );
};

export default SortSelect;
