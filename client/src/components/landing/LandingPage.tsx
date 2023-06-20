import { useEffect, useState } from "react";
import axios from "../../plugins/axios";
import { ITeam } from "../../types/team";
import Header from "../header/Header";
import TeamsList from "../team/teamsList/TeamsList";
import { AsidePanel } from "./AsidePanel";
import useGetLoggedUserData from "../../hooks/useGetLoggedUserData";
import AddNewTeamButton from "./AddNewTeamButton";
import NoDataCard from "../utils/NoDataCard";
import SortSelect from "../utils/SortSelect";
import Pagination from "../utils/Pagination";
import NotificationModal from "./notifications/NotificationModal";

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
  const sortingOptions = ["Name", "Creation Time", "Slots"];

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
            page,
            limit,
          },
        });
        setTeams(res.data.data);
        setTotalTeams(res.data.total);
      } catch (e) {
        console.error(e);
      }
    })();
  }, [filters, sortBy, order, page, limit]);

  const handleFilterChange = (newFilters: any) => {
    setFilters(newFilters);
  };

  const renderTeamsList = (): JSX.Element => {
    return teams.length === 0 ? (
      <NoDataCard />
    ) : (
      <div className="basis-3/4">
        <div className="ml-8 mt-6 flex justify-between">
          <SortSelect
            onSortChange={handleSortChange}
            sortingOptions={sortingOptions}
          />
        </div>
        <div className="mt-2 p-5">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-2 md:gap-6 lg:grid-cols-2">
            {teams && <TeamsList teams={teams} />}
          </div>
        </div>
        <div className="mb-4 ml-8 mr-4 flex justify-end">
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
    );
  };

  return (
    <div>
      <Header />
      <div>
        <div
          className={`flex flex-row bg-gray-800 ${
            teams.length <= 2 ? "h-screen" : "h-full"
          }`}
        >
          <div className="basis-1/4">
            <AddNewTeamButton />
            {userData.accessToken !== "" && <NotificationModal />}
            <AsidePanel onFilterChange={handleFilterChange} />
          </div>
          {renderTeamsList()}
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
