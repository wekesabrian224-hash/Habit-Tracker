const Navbar = ({ darkMode, setDarkMode, activeTab, setActiveTab, user }) => {
  const showCurrency =
    user?.isLoggedIn && activeTab !== "hero" && activeTab !== "login";

  return (
    <header className="fixed top-0 w-full bg-[#fdf9f0] dark:bg-[#1B2B1B] border-b border-[#ece8df] dark:border-[#2c3b2b] z-50">
      <div className="flex justify-between items-center px-6 h-16">
        <button
          onClick={() => setActiveTab("hero")}
          className="flex items-center gap-2 font-bold text-2xldark"
        >
          <div className="material-symbols-outlined text-3xl">potted_plant</div>
          <div>Habit Garden</div>
        </button>

        <div className="flex items-center gap-3">
          {showCurrency && (
            <div className="flex items-center gap-3 bg-[#f7f3ea] dark:bg-[#243d24] px-3 py-1.5 rounded-full text-xs font-semibold">
              <div className="flex items-center gap-1 text-[#885031] dark:text-[#ffb690]">
                <div className="material-symbols-outlined text-[16px]">
                  monetization_on
                </div>
                {user.coins}
              </div>
              <div className="flex items-center gap-1 text-[#4a6549] dark:text-[#ccebc7]">
                <div className="material-symbols-outlined text-[16px]">
                  diamond
                </div>
                {user.gems}
              </div>
            </div>
          )}
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="p-2 rounded-full text-[#4a6549] dark:text-[#ccebc7]"
          >
            <div className="material-symbols-outlined text-xl">
              {darkMode ? "light_mode" : "dark_mode"}
            </div>
          </button>
          {user?.isLoggedIn ? (
            <button
              onClick={() => setActiveTab("profile")}
              className="w-9 h-9 rounded-full overflow-hidden border-2 border-[#ccebc7]"
            >
              <Avatar cfg={USER_AVATAR} size={36} />
            </button>
          ) : (
            <button
              onClick={() => setActiveTab("login")}
              className="px-4 py-1.5 text-xs font-bold rounded-full bg-[#4a6549] text-white"
            >
              Sign In
            </button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
