import { IUser } from "../../../types/user";

interface UsersListItemProps {
  user: IUser;
}

const UsersTableRow: React.FC<UsersListItemProps> = ({ user }) => {
  return (
    <tr className="border-b dark:border-gray-700">
      <th
        scope="row"
        className="whitespace-nowrap px-4 py-3 font-medium text-gray-900 dark:text-white"
      >
        Apple iMac 27&#34;
      </th>
      <td className="px-4 py-3">PC</td>
      <td className="px-4 py-3">Apple</td>
      <td className="px-4 py-3">300</td>
      <td className="px-4 py-3">$2999</td>
      <td className="flex items-center justify-end px-4 py-3">
        <button
          id="apple-imac-27-dropdown-button"
          data-dropdown-toggle="apple-imac-27-dropdown"
          className="inline-flex items-center rounded-lg p-0.5 text-center text-sm font-medium text-gray-500 hover:text-gray-800 focus:outline-none dark:text-gray-400 dark:hover:text-gray-100"
          type="button"
        >
          <svg
            className="h-5 w-5"
            aria-hidden="true"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z" />
          </svg>
        </button>
        <div
          id="apple-imac-27-dropdown"
          className="z-10 hidden w-44 divide-y divide-gray-100 rounded bg-white shadow dark:divide-gray-600 dark:bg-gray-700"
        >
          <ul
            className="py-1 text-sm text-gray-700 dark:text-gray-200"
            aria-labelledby="apple-imac-27-dropdown-button"
          >
            <li>
              <a className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                Show
              </a>
            </li>
            <li>
              <a className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                Edit
              </a>
            </li>
          </ul>
          <div className="py-1">
            <a className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600 dark:hover:text-white">
              Delete
            </a>
          </div>
        </div>
      </td>
    </tr>
  );
};

export default UsersTableRow;
