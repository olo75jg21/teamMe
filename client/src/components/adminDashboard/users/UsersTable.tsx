import { IUser } from "../../../types/user";
import UsersTableRow from "./UsersTableRow";

interface UsersListProps {
  users: IUser[];
}

const UsersTable: React.FC<UsersListProps> = ({ users }) => {
  const renderUsersTableBody = (): JSX.Element[] => {
    if (!users) return [];
    return users.map((user: IUser) => {
      return <UsersTableRow key={user._id} user={user} />;
    });
  };

  return (
    <div>
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm text-gray-500 dark:text-gray-400">
          <thead className="bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-4 py-3">
                Product name
              </th>
              <th scope="col" className="px-4 py-3">
                Category
              </th>
              <th scope="col" className="px-4 py-3">
                Brand
              </th>
              <th scope="col" className="px-4 py-3">
                Description
              </th>
              <th scope="col" className="px-4 py-3">
                Price
              </th>
              <th scope="col" className="px-4 py-3">
                <span className="sr-only">Actions</span>
              </th>
            </tr>
          </thead>
          <tbody>{renderUsersTableBody()}</tbody>
        </table>
      </div>
    </div>
  );
};

export default UsersTable;
