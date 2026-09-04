import { assets } from "@/assets/assets";
import useAdmin from "@/hooks/useAdmin";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const { aToken, setAToken } = useAdmin();
  const navigate = useNavigate();

  const logout = () => {
    navigate("/");
    aToken && setAToken("");
    aToken && localStorage.removeItem("aToken");
  };

  return (
    <div className="fixed top-0 right-0 left-0 z-50 flex items-center justify-between border-b border-gray-200  bg-white px-4 py-3 sm:pr-28 sm:pl-10 shadow-xs">
      <div className="text-xm flex items-center gap-2">
        <img
          src={assets.admin_logo}
          onClick={() => navigate("/")}
          className="w-32 cursor-pointer sm:w-52"
          alt="logo dashboard image "
        />
        <p className="cursor-pointer rounded-full border border-gray-200 px-2.5 py-0.5 text-sm text-gray-600">
          {aToken ? "Admin" : "Doctor"}
        </p>
      </div>
      <button
        onClick={logout}
        className="bg-primary rounded-3xl px-10 py-2 text-sm text-white"
      >
        Logout
      </button>
    </div>
  );
};

export default Navbar;
