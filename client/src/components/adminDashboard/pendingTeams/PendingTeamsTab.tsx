import { useEffect, useState } from "react";
import PentingTeamsTable from "./PendingTeamsTable";
import { IUser } from "../../../types/user";
import axios from "../../../plugins/axios";
import useGetLoggedUserData from "../../../hooks/useGetLoggedUserData";
import { ITeam } from "../../../types/team";
import SortSelect from "../../landing/SortSelect";
import Pagination from "../../utils/Pagination";

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
          <SortSelect
            onSortChange={function (sortBy: string, order: string): void {
              throw new Error("Function not implemented.");
            }}
          />
          <PentingTeamsTable teams={teams} />
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

export default PendingTab;
