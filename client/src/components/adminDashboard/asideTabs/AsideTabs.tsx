import React, { useState } from "react";
import Tab from "./Tab";
import Users from "../users/Users";

const Tab2Content = () => <div>Tab 2 Content</div>;

const AsideTabs: React.FC = () => {
  const [currentTab, setCurrentTab] = useState<number>(0);

  return (
    <div className="flex h-full w-full">
      <div className="flex flex-col border-r-2 border-blue-500">
        <Tab currentTab={currentTab} setCurrentTab={setCurrentTab} index={0}>
          Tab 1
        </Tab>
        <Tab currentTab={currentTab} setCurrentTab={setCurrentTab} index={1}>
          Tab 2
        </Tab>
      </div>
      <div className="p-4">
        {currentTab === 0 ? <Users /> : null}
        {currentTab === 1 ? <Tab2Content /> : null}
      </div>
    </div>
  );
};

export default AsideTabs;
