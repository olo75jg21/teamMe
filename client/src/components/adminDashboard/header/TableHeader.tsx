interface Props {
  headerItems: string[];
}

const TableHeader: React.FC<Props> = ({ headerItems }) => {
  const renderTableHeaders = (): JSX.Element[] => {
    return headerItems.map((headerItem: string, index: number) => {
      return (
        <th key={index} scope="col" className="px-4 py-3">
          {headerItem}
        </th>
      );
    });
  };

  return (
    <thead className="bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400">
      <tr>{renderTableHeaders()}</tr>
    </thead>
  );
};

export default TableHeader;
