import { IUser } from "../../../types/user";
import UsersListItem from "./UsersListItem";

interface UsersListProps {
  users: IUser[];
}

const UsersList: React.FC<UsersListProps> = ({ users }) => {
  const renderUsersList = (): JSX.Element[] => {
    if (!users) return [];
    return users.map((user: IUser) => {
      return (
        <div className="w-100">
          <UsersListItem key={user._id} user={user} />
        </div>
      );
    });
  };

  return <div>{renderUsersList()}</div>;
};

export default UsersList;
