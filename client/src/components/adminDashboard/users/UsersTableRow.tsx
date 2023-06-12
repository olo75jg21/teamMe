import { IUser } from "../../../types/user";

interface UsersListItemProps {
  user: IUser;
}

const UsersTableRow: React.FC<UsersListItemProps> = ({ user }) => {
  const { username, email, gender, age, role } = user;

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
    </tr>
  );
};

export default UsersTableRow;
