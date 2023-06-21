import { useEffect, useState } from "react";
import axios from "../../../plugins/axios";
import useGetLoggedUserData from "../../../hooks/useGetLoggedUserData";
import TeamsList from "../teamsList/TeamsList";
import NoDataCard from "../../utils/NoDataCard";

const TeamsTabs = (): JSX.Element => {
  const tabs = [
    {
      id: "teams",
      label: "My Teams",
    },
    {
      id: "applications",
      label: "My Applications",
    },
  ];

  const [activeTab, setActiveTab] = useState(tabs[0].id);
  const [tabData, setTabData] = useState([]);

  const { userData } = useGetLoggedUserData();
  const userId = userData.user._id;

  useEffect(() => {
    const getUserTeams = async () => {
      try {
        const { data } = await axios.get("/team/user", {
          params: {
            userId,
          },
        });
        setTabData(data);
      } catch (error) {
        console.error(error);
      }
    };

    const getUserApplications = async () => {
      try {
        setTabData([]);
        const { data } = await axios.get("/team/applications", {
          params: {
            userId,
          },
        });
        setTabData(data);
      } catch (error) {
        console.error(error);
      }
    };

    (async () => {
      if (activeTab === tabs[0].id) {
        await getUserTeams();
      } else {
        await getUserApplications();
      }
    })();
  }, [activeTab]);

  const renderTabs = () => {
    return tabs.map((tab) => (
      <button
        key={tab.id}
        className={`w-full px-4 py-2 text-lg font-bold ${
          activeTab === tab.id
            ? "border-2 border-violet-400 bg-violet-800 text-gray-100"
            : "bg-gray-300 text-gray-900 hover:bg-violet-300"
        } rounded-t-lg duration-200 focus:outline-none`}
        onClick={() => setActiveTab(tab.id)}
      >
        {tab.label}
      </button>
    ));
  };

  return (
    <div
      className={`mx-auto w-3/4 rounded-lg border border-gray-700 bg-gray-700`}
    >
      <div className="flex justify-center border-b border-gray-700 bg-gray-700">
        {renderTabs()}
      </div>
      <div
        className={`rounded-b-lg bg-gray-800 p-4 ${
          tabData.length <= 2 ? "h-screen" : "h-full"
        }`}
      >
        {tabData.length === 0 ? <NoDataCard /> : <TeamsList teams={tabData} />}
      </div>
    </div>
  );
};

export default TeamsTabs;
