import { NavLink } from "react-router-dom";
import useAdmin from "@/hooks/useAdmin";
import { adminMenu, doctorMenu } from "@/data/dashboardNavbarData";

const Sidebar = () => {
  const { aToken, dToken } = useAdmin();

  const menuItems = aToken ? adminMenu : dToken ? doctorMenu : [];

  return (
    <div className="fixed top-0 left-0 z-30 mt-16 min-h-screen border-r border-gray-200 bg-white shadow-lg sm:z-40">
      <ul className="mt-5 text-[#515151]">
        {menuItems.map((item) => (
          <SidebarItem
            key={item.to}
            to={item.to}
            icon={item.icon}
            label={item.label}
          />
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;

const SidebarItem = ({ to, icon, label }) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `flex cursor-pointer items-center gap-3 px-3 py-3.5 md:min-w-56 md:px-9 ${
          isActive
            ? "border-primary border-r-4 bg-[#F2F3FF]"
            : "hover:bg-[#F8FAFC]"
        }`
      }
    >
      <img src={icon} alt="dashboard icons" className="w-5" />

      <p className="hidden md:block">{label}</p>
    </NavLink>
  );
};
