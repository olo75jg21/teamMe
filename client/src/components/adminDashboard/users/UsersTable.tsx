import { IUser } from "../../../types/user";
import TableHeader from "../header/TableHeader";
import UsersTableRow from "./UsersTableRow";

interface UsersListProps {
  users: IUser[];
  removeUser: (userId: string) => void;
}

const UsersTable: React.FC<UsersListProps> = ({ users, removeUser }) => {
  const headerItems = ["Username", "Email", "Gender", "Age", "Role", "", ""];

  const renderUsersTableBody = (): JSX.Element[] => {
    if (!users) return [];
    return users.map((user: IUser) => {
      return (
        <UsersTableRow key={user._id} user={user} removeUser={removeUser} />
      );
    });
  };

  return (
    <div>
      <div className="mt-4 overflow-x-auto rounded-lg">
        <table className="w-full text-left text-sm text-gray-500 dark:text-gray-400">
          <TableHeader headerItems={headerItems} />
          <tbody>{renderUsersTableBody()}</tbody>
        </table>
      </div>
    </div>
  );
};

export default UsersTable;
