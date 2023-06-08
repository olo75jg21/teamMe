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
      className={`px-4 py-2 ${
        currentTab === index
          ? "bg-blue-500 text-white"
          : "bg-white text-blue-500"
      }`}
      onClick={() => setCurrentTab(index)}
    >
      {children}
    </button>
  );
};

export default Tab;
