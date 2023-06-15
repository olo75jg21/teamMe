import { useEffect, useState } from "react";
import UsersTable from "./UsersTable";
import { IUser } from "../../../types/user";
import axios from "../../../plugins/axios";
import useGetLoggedUserData from "../../../hooks/useGetLoggedUserData";
import SortSelect from "../../utils/SortSelect";
import Pagination from "../../utils/Pagination";

const Users: React.FC = () => {
  const { userData } = useGetLoggedUserData();

  const [users, setUsers] = useState<IUser[]>([]);

  // Sorting
  const [sortBy, setSortBy] = useState<string>("");
  const [order, setOrder] = useState<string>("");
  const sortingOptions = ["Username", "Email", "Gender", "Age", "Role"];

  // Pagination
  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(10);
  const [totalUsers, setTotalUsers] = useState<number>(0);

  const handleSortChange = (newSortBy: string, newOrder: string) => {
    setSortBy(newSortBy);
    setOrder(newOrder);
  };

  useEffect(() => {
    (async () => {
      try {
        const { data, status } = await axios.get("/admin/users", {
          params: {
            role: userData.user.role,
            sortBy,
            order,
            page,
            limit,
          },
        });
        if (status === 200) {
          setUsers(data.data);
          setTotalUsers(data.total);
        }
      } catch (e) {
        console.log(e);
      }
    })();
  }, [page, limit, sortBy, order]);

  const handleRemoveUser = async (userId: string) => {
    try {
      const { status } = await axios.delete(`/admin/users/${userId}`, {
        params: { role: userData.user.role },
      });

      if (status === 200) {
        const filteredUsers = users.filter((user: IUser) => {
          if (user._id !== userId) return user;
        });

        setUsers(filteredUsers);
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="">
      {users && (
        <div className="mb-4">
          <SortSelect
            onSortChange={handleSortChange}
            sortingOptions={sortingOptions}
          />
          <UsersTable users={users} removeUser={handleRemoveUser} />
          <div className="mt-4 flex justify-end">
            <Pagination
              page={page}
              onPageChange={setPage}
              limit={limit}
              onLimitChange={setLimit}
              totalItems={totalUsers}
              loading={false}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Users;
