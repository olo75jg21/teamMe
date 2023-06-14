import { useEffect, useState } from "react";
import UsersTable from "./UsersTable";
import { IUser } from "../../../types/user";
import axios from "../../../plugins/axios";
import useGetLoggedUserData from "../../../hooks/useGetLoggedUserData";
import SortSelect from "../../landing/SortSelect";
import Pagination from "../../utils/Pagination";

const Users: React.FC = () => {
  const { userData } = useGetLoggedUserData();
  const [users, setUsers] = useState<IUser[]>([]);

  useEffect(() => {
    (async () => {
      try {
        const { data, status } = await axios.get("/admin/users", {
          params: { role: userData.user.role },
        });
        if (status === 200) {
          setUsers(data);
        }
      } catch (e) {
        console.log(e);
      }
    })();
  }, []);

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
            onSortChange={function (sortBy: string, order: string): void {
              throw new Error("Function not implemented.");
            }}
          />
          <UsersTable users={users} removeUser={handleRemoveUser} />
          <div className="mt-4 flex justify-end">
            <Pagination
              page={0}
              onPageChange={function (newPage: number): void {
                throw new Error("Function not implemented.");
              }}
              limit={10}
              onLimitChange={function (newLimit: number): void {
                throw new Error("Function not implemented.");
              }}
              totalItems={10}
              loading={false}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Users;
