import { useEffect, useState } from "react";
import UsersList from "./UsersList";
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

  return (
    <div className="">
      {users && (
        <div>
          <UsersList users={users} />
        </div>
      )}
    </div>
  );
};

export default Users;
