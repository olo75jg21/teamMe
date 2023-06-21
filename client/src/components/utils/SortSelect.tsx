import React from "react";

interface Props {
  onSortChange: (sortBy: string, order: string) => void;
  sortingOptions: string[];
}

const SortSelect: React.FC<Props> = ({ onSortChange, sortingOptions }) => {
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
        {sortingOptions.map((option, index) => (
          <React.Fragment key={index}>
            <option key={option + "-asc"} value={option.toLowerCase() + "-asc"}>
              {`${option} Ascending`}
            </option>
            <option
              key={option + "-desc"}
              value={option.toLowerCase() + "-desc"}
            >
              {`${option} Descending`}
            </option>
          </React.Fragment>
        ))}
      </select>
    </div>
  );
};

export default SortSelect;
