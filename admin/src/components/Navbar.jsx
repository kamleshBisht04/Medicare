import { assets } from "@/assets/assets";
import useAdmin from "@/hooks/useAdmin";
import { useNavigate } from "react-router-dom";
import { LogOut } from "lucide-react";
import useADoctor from "../hooks/useDoctor";

const Navbar = () => {
  const { aToken, setAToken } = useAdmin();
  const { dToken, setDToken } = useADoctor();
  const navigate = useNavigate();

  const logout = () => {
    navigate("/");

    if (aToken) {
      setAToken("");
      localStorage.removeItem("aToken");
    }

    if (dToken) {
      setDToken("");
      localStorage.removeItem("dToken");
    }
  };

  return (
    <div className="fixed top-0 right-0 left-0 z-50 flex h-[72px] items-center justify-between border-b border-gray-200/80 bg-white/95 px-4 backdrop-blur-md sm:px-8 lg:pr-12 lg:pl-10">
      {/* Logo + Role */}
      <div className="flex items-center gap-4">
        <img
          src={assets.admin_logo}
          onClick={() => navigate("/")}
          className="w-32 cursor-pointer object-contain transition-opacity duration-200 hover:opacity-85 sm:w-44"
          alt="Medicare dashboard logo"
        />

        {/* Divider */}
        <div className="hidden h-7 w-px bg-gray-200 sm:block" />

        {/* Role Badge */}
        <div className="hidden items-center gap-2 sm:flex">
          <span className="h-2 w-2 rounded-full bg-green-500" />

          <span className="text-sm font-medium text-gray-600">
            {aToken ? "Admin" : "Doctor"}
          </span>

          <span className="rounded-full border border-gray-200 bg-gray-50 px-2 py-0.5 text-[11px] font-medium text-gray-500">
            Dashboard
          </span>
        </div>
      </div>

      {/* Mobile Role */}
      <div className="mr-3 flex items-center gap-2 sm:hidden">
        <span className="h-2 w-2 rounded-full bg-green-500" />

        <span className="text-sm font-medium text-gray-600">
          {aToken ? "Admin" : "Doctor"}
        </span>
      </div>

      {/* Logout Button */}
      <button
        onClick={logout}
        className="group flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-600 shadow-sm transition-all duration-200 hover:border-red-200 hover:bg-red-50 hover:text-red-600 active:scale-95 sm:px-5"
      >
        <LogOut
          size={17}
          strokeWidth={1.8}
          className="transition-transform duration-200 group-hover:-translate-x-0.5"
        />

        <span className="hidden sm:block">Logout</span>
      </button>
    </div>
  );
};

export default Navbar;
