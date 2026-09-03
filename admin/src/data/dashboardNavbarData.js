import { assets } from "../assets/assets";

export const adminMenu = [
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
//   {
//     to: "/setting",
//     icon: assets.setting_icon,
//     label: "Setting",
//   },


];

export const doctorMenu = [
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
