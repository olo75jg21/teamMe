import React, { useState } from "react";
import Tab from "./Tab";
import UsersTab from "../users/UsersTab";

const Tab2Content = () => <div>Tab 2 Content</div>;

const AsideTabs: React.FC = () => {
  const [currentTab, setCurrentTab] = useState<number>(0);

  return (
    <div className="flex w-screen flex-col">
      <div className="mx-auto my-8 flex rounded-lg border-gray-500">
        <Tab currentTab={currentTab} setCurrentTab={setCurrentTab} index={0}>
          Manage users
        </Tab>
        <Tab currentTab={currentTab} setCurrentTab={setCurrentTab} index={1}>
          Pending offers
        </Tab>
        <Tab currentTab={currentTab} setCurrentTab={setCurrentTab} index={2}>
          Manage offers
        </Tab>
      </div>
      <div className="mx-36">
        {currentTab === 0 ? <UsersTab /> : null}
        {currentTab === 1 ? <Tab2Content /> : null}
        {currentTab === 2 ? <UsersTab /> : null}
      </div>
    </div>
  );
};

export default AsideTabs;