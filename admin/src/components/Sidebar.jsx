import { NavLink } from "react-router-dom";
import { assets } from "../assets/assets";
import useAdmin from "../hooks/useAdmin";

const SidebarItem = ({ to, icon, label }) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `flex cursor-pointer items-center gap-3 px-3 py-3.5 md:min-w-72 md:px-9 ${
          isActive ? "border-primary border-r-4 bg-[#F2F3FF]" : ""
        }`
      }
    >
      <img src={icon} alt="" />
      <p className="hidden md:block">{label}</p>
    </NavLink>
  );
};

const Sidebar = () => {
  const { aToken, dToken } = useAdmin();

  const adminMenu = [
    {
      to: "/admin-dashboard",
      icon: assets.home_icon,
      label: "Dashboard",
    },
    {
      to: "/all-appointments",
      icon: assets.appointment_icon,
      label: "Appointments",
    },
    {
      to: "/add-doctor",
      icon: assets.add_icon,
      label: "Add Doctor",
    },
    {
      to: "/doctor-list",
      icon: assets.people_icon,
      label: "Doctors List",
    },
  ];

  const doctorMenu = [
    {
      to: "/doctor-dashboard",
      icon: assets.home_icon,
      label: "Dashboard",
    },
    {
      to: "/doctor-appointments",
      icon: assets.appointment_icon,
      label: "Appointments",
    },
    {
      to: "/doctor-profile",
      icon: assets.people_icon,
      label: "Profile",
    },
  ];

  const menuItems = aToken ? adminMenu : dToken ? doctorMenu : [];

  return (
    <div className="min-h-screen border-r bg-white">
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
