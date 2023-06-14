import { useEffect, useState } from "react";
import UsersTable from "./UsersTable";
import { IUser } from "../../../types/user";
import axios from "../../../plugins/axios";
import useGetLoggedUserData from "../../../hooks/useGetLoggedUserData";

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

        console.log(filteredUsers);
        setUsers(filteredUsers);
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="">
      {users && (
        <div>
          <UsersTable users={users} removeUser={handleRemoveUser} />
        </div>
      )}
    </div>
  );
};

export default Users;
