const BottomNav = ({ activeTab, setActiveTab }) => {
  console.log(" BottomNav rendered. Current activeTab is:", activeTab);

  if (activeTab === "hero") {
    return null;
  }

  // List of all the tabs to show
  const navItems = [
    { id: "garden", label: "Garden", icon: "local_florist" },
    { id: "growth", label: "Growth", icon: "trending_up" },
    { id: "shop", label: "Shop", icon: "storefront" },
    { id: "profile", label: "Profile", icon: "person" },
  ];
  console.log(" List of nav items:", navItems);

  return (
    <nav className="fixed bottom-1 left-1 w-full bg dark:bg border-t border dark:border">
      <div className="flex justify-around items-center h-20 px-8">
        {navItems.map((item) => {
          const isActive = activeTab === item.id;
          console.log(` Checking "${item.id}" -> isActive:`, isActive);

          // Pick which colors to use depending on whether this tab is active
          let buttonStyle;
          if (isActive) {
            buttonStyle = "bg-green-600 text-green-500 font-bold text-gray-800";
          } else {
            buttonStyle = "text-gray-600 dark:text-gray-400";
          }

          return (
            <button
              key={item.id}
              onClick={() => {
                // when user clicks a tab
                console.log(
                  `Clicked "${item.id}". Switching activeTab to:`,
                  item.id,
                );
                setActiveTab(item.id);
              }}
              className={`flex justify-around items-center h-20 px-8 ${buttonStyle}`}
            >
              <div className="material-symbols-outlined text-5xl">
                {item.icon}
              </div>
              <div className="text-xs font-semibold mt-1 ">{item.label}</div>
            </button>
          );
        })}
      </div>
    </nav>
  );
};

export default BottomNav;
