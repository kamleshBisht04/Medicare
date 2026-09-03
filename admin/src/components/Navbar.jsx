import { assets } from "../assets/assets";
import useAdmin from "../hooks/useAdmin";

const Navbar = () => {
  const { aToken } = useAdmin();

  return (
    <div className="flex items-center justify-between border-b border-gray-200 bg-white px-4 py-3 sm:pl-24 sm:pr-28">
      <div className="text-xm flex items-center gap-2">
        <img
          src={assets.admin_logo}
          className="w-32 cursor-pointer sm:w-48"
          alt="logo dashboard image "
        />
        <p className="rounded-full border border-gray-200 px-2.5 py-0.5 text-sm text-gray-600">
          {aToken ? "Admin" : "Doctor"}
        </p>
      </div>
      <button className="bg-primary rounded-3xl px-10 py-2 text-sm text-white">
        Logout
      </button>
    </div>
  );
};

export default Navbar;
