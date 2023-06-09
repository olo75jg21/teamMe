import { useEffect, useState } from "react";
import UsersList from "./UsersList";
import { IUser } from "../../../types/user";
import axios from "../../../plugins/axios";
import useGetLoggedUserData from "../../../hooks/useGetLoggedUserData";

const Users: React.FC = () => {
  // const { userData } = useGetLoggedUserData();
  const [users, setUsers] = useState<IUser[]>([]);

  // useEffect(() => {
  //   (async () => {
  //     try {
  //       const { data, status } = await axios.get("/admin/users", {
  //         params: { role: userData.user.role },
  //       });
  //       if (status === 200) {
  //         setUsers(data);
  //       }
  //     } catch (e) {
  //       console.log(e);
  //     }
  //   })();
  // }, []);

  return (
    <div className="">
      <div className="mb-8 rounded-md bg-gray-700 px-8 py-6 text-2xl text-gray-200">
        <h1>Manage users</h1>
      </div>
      {users && (
        <div>
          <UsersList users={users} />
        </div>
      )}
    </div>
  );
};

export default Users;
