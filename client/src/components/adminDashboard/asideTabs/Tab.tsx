interface TabProps {
  children: React.ReactNode;
  currentTab: number;
  setCurrentTab: (index: number) => void;
  index: number;
}

// The Tab component, with props typed
const Tab: React.FC<TabProps> = ({
  children,
  currentTab,
  setCurrentTab,
  index,
}) => {
  return (
    <button
      className={`my-2 px-4 py-2 ${
        currentTab === index
          ? "bg-violet-800 text-gray-100"
          : "bg-gray-300 text-gray-900 hover:bg-violet-300"
      }`}
      onClick={() => setCurrentTab(index)}
    >
      {children}
    </button>
  );
};

export default Tab;
