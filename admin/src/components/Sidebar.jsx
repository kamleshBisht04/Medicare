import { NavLink } from "react-router-dom";
import useAdmin from "@/hooks/useAdmin";
import { adminMenu, doctorMenu } from "@/data/dashboardNavbarData";
import useADoctor from "../hooks/useDoctor";

const Sidebar = () => {
  const { aToken } = useAdmin();
   const { dToken } = useADoctor();

  const menuItems = aToken ? adminMenu : dToken ? doctorMenu : [];

  return (
    <aside className="fixed top-16 left-0 z-30 h-[calc(100vh-4rem)] w-16 border-r border-gray-200 bg-white sm:z-40 md:w-60">
      {/* Navigation */}
      <nav className="h-full overflow-y-auto px-2 py-5 md:px-3">
        <ul className="space-y-1.5">
          {menuItems.map((item) => (
            <SidebarItem
              key={item.to}
              to={item.to}
              icon={item.icon}
              label={item.label}
            />
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;

const SidebarItem = ({ to, icon, label }) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `group relative flex items-center gap-3 rounded-lg px-3 py-[8px] transition-all duration-200 md:px-4 ${
          isActive
            ? "bg-[#F2F3FF] text-primary"
            : "text-[#64748B] hover:bg-[#F8FAFC] hover:text-primary"
        }`
      }
    >
      {({ isActive }) => (
        <>
          {/* Active indicator */}
          <span
            className={`absolute right-0 h-8 w-1 rounded-r-full transition-all ${
              isActive ? "bg-primary" : "bg-transparent"
            }`}
          />

          {/* Icon */}
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#F8FAFC] transition-transform duration-200 group-hover:scale-105">
            <img src={icon} alt="" className="h-5 w-5 object-contain" />
          </div>

          {/* Label */}
          <p className="hidden truncate text-sm font-medium md:block">
            {label}
          </p>
        </>
      )}
    </NavLink>
  );
};
