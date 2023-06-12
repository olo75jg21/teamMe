import { IUser } from "../../../types/user";
import UsersTableHeader from "./UsersTableHeader";
import UsersTableRow from "./UsersTableRow";

interface UsersListProps {
  users: IUser[];
}

const UsersTable: React.FC<UsersListProps> = ({ users }) => {
  const headerItems = ["Username", "Email", "Gender", "Age", "Role", ""];

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
          <UsersTableHeader headerItems={headerItems} />
          <tbody>{renderUsersTableBody()}</tbody>
        </table>
      </div>
    </div>
  );
};

export default UsersTable;
