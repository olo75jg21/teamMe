import { useEffect, useState } from "react";
import axios from "../../plugins/axios";
import { ITeam } from "../../types/team";
import Header from "../header/Header";
import TeamsList from "../team/teamsList/TeamsList";
import { AsidePanel } from "./AsidePanel";
import useGetLoggedUserData from "../../hooks/useGetLoggedUserData";
import AddNewTeamButton from "./AddNewTeamButton";
import NoDataCard from "../utils/NoDataCard";
import SortSelect from "./SortSelect";

const LandingPage = (): JSX.Element => {
  const { userData } = useGetLoggedUserData();

  const [filters, setFilters] = useState({
    title: "",
    ageMin: 16,
    ageMax: 100,
    game: "",
    gender: "",
  });
  const [teams, setTeams] = useState<ITeam[]>([]);

  const [sortBy, setSortBy] = useState<string>("");
  const [order, setOrder] = useState<string>("");

  const handleSortChange = (newSortBy: string, newOrder: string) => {
    setSortBy(newSortBy);
    setOrder(newOrder);
  };

  useEffect(() => {
    (async () => {
      try {
        const { title, ageMin, ageMax, game, gender } = filters;

        const res = await axios.get("/team", {
          params: {
            title,
            ageMin,
            ageMax,
            game,
            gender,
            userId: userData.user._id,
            sortBy,
            order,
          },
        });
        setTeams(res.data);
      } catch (e) {
        console.error(e);
      }
    })();
  }, [filters, sortBy, order]);

  const handleFilterChange = (newFilters: any) => {
    setFilters(newFilters);
  };

  const renderTeamsList = (): JSX.Element => {
    return teams.length === 0 ? (
      <NoDataCard />
    ) : (
      <div className="basis-3/4">
        <SortSelect onSortChange={handleSortChange} />
        <div className="mt-14 p-5">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-2 md:gap-6 lg:grid-cols-2">
            {teams && <TeamsList teams={teams} />}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div>
      <Header />
      <div>
        <div
          className={`flex flex-row bg-gray-800 ${
            teams.length <= 4 ? "h-screen" : "h-full"
          }`}
        >
          <div className="basis-1/4">
            <AddNewTeamButton />
            <AsidePanel onFilterChange={handleFilterChange} />
          </div>
          {renderTeamsList()}
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
