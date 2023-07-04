import { useEffect, useState } from "react";
import PendingTeamsTable from "./TeamsTable";
import axios from "../../../plugins/axios";
import useGetLoggedUserData from "../../../hooks/useGetLoggedUserData";
import { ITeam } from "../../../types/team";
import SortSelect from "../../utils/SortSelect";
import Pagination from "../../utils/Pagination";

const TeamsTab: React.FC = () => {
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
        const { data, status } = await axios.get("/admin/teams", {
          params: {
            role: userData.user.role,
            sortBy,
            order,
            page,
            limit,
          },
        });
        if (status === 200) {
          setTeams(data.data);
          setTotalTeams(data.total);
        }
      } catch (e) {
        console.log(e);
      }
    })();
  }, [page, limit, sortBy, order]);

  const handleRemoveTeam = async (id: string) => {
    try {
      const { data, status } = await axios.delete(`/admin/teams/${id}`, {
        params: { role: userData.user.role },
      });

      console.log(data);

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

  const handleChangeActiveState = async (id: string) => {
    try {
      const teamToToggle = teams.find((team: ITeam) => team._id === id);

      if (!teamToToggle) {
        throw new Error("Team not found");
      }

      const newIsActiveValue = !teamToToggle.isActive;

      const { data, status } = await axios.patch(
        `/admin/teams/${id}`,
        {
          isActive: newIsActiveValue,
        },
        {
          params: { role: userData.user.role },
        }
      );

      if (status === 200) {
        const updatedTeams = teams.map((team: ITeam) => {
          if (team._id === id) return { ...team, isActive: newIsActiveValue };
          return team;
        });
        setTeams(updatedTeams);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const changeTeamVisibility = async (id: string) => {
    try {
      const teamToToggle = teams.find((team: ITeam) => team._id === id);

      if (!teamToToggle) {
        throw new Error("Team not found");
      }

      const newVisiblityValue = !teamToToggle.isVisible;

      const { data, status } = await axios.patch(
        `/admin/teams/${id}`,
        {
          isVisible: newVisiblityValue,
        },
        {
          params: { role: userData.user.role },
        }
      );

      if (status === 200) {
        const updatedTeams = teams.map((team: ITeam) => {
          if (team._id === id) return { ...team, isVisible: newVisiblityValue };
          return team;
        });
        setTeams(updatedTeams);
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
          <PendingTeamsTable
            teams={teams}
            removeTeam={handleRemoveTeam}
            handleChangeActiveState={handleChangeActiveState}
            changeTeamVisibility={changeTeamVisibility}
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

export default TeamsTab;
