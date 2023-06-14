import { useEffect, useState } from "react";
import PentingTeamsTable from "./PendingTeamsTable";
import { IUser } from "../../../types/user";
import axios from "../../../plugins/axios";
import useGetLoggedUserData from "../../../hooks/useGetLoggedUserData";
import { ITeam } from "../../../types/team";

const PendingTab: React.FC = () => {
  const { userData } = useGetLoggedUserData();
  const [teams, setTeams] = useState<ITeam[]>([]);

  useEffect(() => {
    (async () => {
      try {
        const { data, status } = await axios.get("/admin/pendingTeams", {
          params: { role: userData.user.role },
        });
        console.log(data);
        if (status === 200) {
          setTeams(data);
        }
      } catch (e) {
        console.log(e);
      }
    })();
  }, []);

  return (
    <div className="">
      {teams && (
        <div>
          <PentingTeamsTable teams={teams} />
        </div>
      )}
    </div>
  );
};

export default PendingTab;
