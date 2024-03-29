import { useEffect, useState } from "react";
import PentingTeamsTable from "./PendingTeamsTable";
import { IUser } from "../../../types/user";
import axios from "../../../plugins/axios";
import useGetLoggedUserData from "../../../hooks/useGetLoggedUserData";
import { ITeam } from "../../../types/team";
import SortSelect from "../../utils/SortSelect";
import Pagination from "../../utils/Pagination";

const PendingTeamsTab: React.FC = () => {
  const { userData } = useGetLoggedUserData();
  const [teams, setTeams] = useState<ITeam[]>([]);

  // Sorting
  const [sortBy, setSortBy] = useState<string>("");
  const [order, setOrder] = useState<string>("");
  const sortingOptions = ["Name", "Game"];

  // Pagination
  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(10);
  const [totalTeams, setTotalTeams] = useState<number>(0);

  const handleSortChange = (newSortBy: string, newOrder: string) => {
    setSortBy(newSortBy);
    setOrder(newOrder);
  };

  useEffect(() => {
    (async () => {
      try {
        const { data, status } = await axios.get("/admin/pendingTeams", {
          params: {
            role: userData.user.role,
            sortBy,
            order,
            page,
            limit,
          },
        });
        console.log(data);
        if (status === 200) {
          setTeams(data.data);
          setTotalTeams(data.total);
        }
      } catch (e) {
        console.log(e);
      }
    })();
  }, [page, limit, sortBy, order]);

  const acceptTeam = async (id: string) => {
    try {
      const teamToToggle = teams.find((team: ITeam) => team._id === id);

      if (!teamToToggle) {
        throw new Error("Team not found");
      }

      const { data, status } = await axios.patch(
        `/admin/pendingTeams/${id}/accept`,
        {},
        {
          params: { role: userData.user.role },
        }
      );

      if (status === 200) {
        const filteredTeams = teams.filter((team: ITeam) => {
          if (team._id !== id) return team;
        });

        setTeams(filteredTeams);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const rejectTeam = async (id: string) => {
    try {
      const teamToToggle = teams.find((team: ITeam) => team._id === id);

      if (!teamToToggle) {
        throw new Error("Team not found");
      }

      const { data, status } = await axios.patch(
        `/admin/pendingTeams/${id}/reject`,
        {},
        {
          params: { role: userData.user.role },
        }
      );

      if (status === 200) {
        const filteredTeams = teams.filter((team: ITeam) => {
          if (team._id !== id) return team;
        });

        setTeams(filteredTeams);
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="">
      {teams && (
        <div className="mb-4">
          <SortSelect
            onSortChange={handleSortChange}
            sortingOptions={sortingOptions}
          />
          <PentingTeamsTable
            teams={teams}
            acceptTeam={acceptTeam}
            rejectTeam={rejectTeam}
          />
          <div className="mt-4 flex justify-end">
            <Pagination
              page={page}
              onPageChange={setPage}
              limit={limit}
              onLimitChange={setLimit}
              totalItems={totalTeams}
              loading={false}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default PendingTeamsTab;
