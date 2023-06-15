import React, { useState } from "react";
import Tab from "./Tab";
import UsersTab from "../users/UsersTab";
import PendingTeamsTab from "../pendingTeams/PendingTeamsTab";
import TeamsTab from "../teams/TeamsTab";

const AsideTabs: React.FC = () => {
  const [currentTab, setCurrentTab] = useState<number>(0);

  return (
    <div className="flex w-screen flex-col">
      <div className="mx-auto my-8 flex rounded-lg border-gray-500">
        <Tab currentTab={currentTab} setCurrentTab={setCurrentTab} index={0}>
          Manage users
        </Tab>
        <Tab currentTab={currentTab} setCurrentTab={setCurrentTab} index={1}>
          Manage teams
        </Tab>
        <Tab currentTab={currentTab} setCurrentTab={setCurrentTab} index={2}>
          Pending teams
        </Tab>
      </div>
      <div className="mx-36">
        {currentTab === 0 ? <UsersTab /> : null}
        {currentTab === 1 ? <TeamsTab /> : null}
        {currentTab === 2 ? <PendingTeamsTab /> : null}
      </div>
    </div>
  );
};

export default AsideTabs;
