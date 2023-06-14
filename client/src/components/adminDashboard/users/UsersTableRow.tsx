import useGetLoggedUserData from "../../../hooks/useGetLoggedUserData";
import { IUser } from "../../../types/user";

interface UsersListItemProps {
  user: IUser;
  removeUser: (userId: string) => void;
}

const UsersTableRow: React.FC<UsersListItemProps> = ({ user, removeUser }) => {
  const { userData } = useGetLoggedUserData();
  const { _id, username, email, gender, age, role } = user;

  const handleRemoveUser = () => {
    removeUser(_id);
  };

  const renderRemoveUserButton = (): JSX.Element => {
    return _id !== userData.user._id ? (
      <button
        className="whitespace-nowrap font-medium text-gray-900 duration-200 hover:scale-110 dark:text-white"
        onClick={handleRemoveUser}
      >
        Delete
      </button>
    ) : (
      <>You</>
    );
  };

  return (
    <tr className="border-b dark:border-gray-700">
      <th
        scope="row"
        className="whitespace-nowrap px-4 py-3 font-medium text-gray-900 dark:text-white"
      >
        {username}
      </th>
      <td className="px-4 py-3">{email}</td>
      <td className="px-4 py-3">{gender}</td>
      <td className="px-4 py-3">{age}</td>
      <td className="px-4 py-3">{role}</td>
      <td className="px-4 py-3">{renderRemoveUserButton()}</td>
    </tr>
  );
};

export default UsersTableRow;
