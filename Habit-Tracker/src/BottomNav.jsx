import { NavLink } from "react-router-dom";

export default function BottomNav() {
  const navItems = [
    {
      path: "/garden",
      label: "Garden",
      icon: "local_florist",
    },
    {
      path: "/coach",
      label: "Growth",
      icon: "trending_up",
    },
    {
      path: "/profile",
      label: "Profile",
      icon: "person",
    },
  ];

  return (
    <nav className="fixed bottom-0 left-0 w-full bg-white dark:bg-[#1B2B1B] border-t border-gray-200 dark:border-gray-700 z-50">
      <div className="flex justify-around items-center h-20">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex flex-col items-center justify-center gap-1 px-6 py-2 rounded-xl ${
                isActive
                  ? "text-green-600 font-bold"
                  : "text-gray-600 dark:text-gray-400"
              }`
            }
          >
            <span className="material-symbols-outlined text-3xl">
              {item.icon}
            </span>

            <span className="text-xs font-semibold">
              {item.label}
            </span>
          </NavLink>
        ))}
      </div>
    </nav>
  );
}