import { useState } from 'react';
import { assets } from '../assets/assets';
import { NavLink, useNavigate } from 'react-router-dom';

const NavLinks = [
  { name: 'HOME', path: '/' },
  { name: 'ALL DOCTORS', path: '/doctors' },
  { name: 'ABOUT', path: '/about' },
  { name: 'CONTACT', path: '/contact' },
];

const Navbar = () => {
  const navigate = useNavigate();

  const [showMenu, setShowMenu] = useState(false);
  const [token, setToken] = useState(true);

  return (
    <div className="flex items-center justify-between border-b border-gray-300 py-4 text-sm">
      {/* Logo */}
      <img
        onClick={() => navigate('/')}
        className="w-30 cursor-pointer md:w-44"
        src={assets.logo}
        alt="medicare logo"
      />

      {/* Desktop Menu */}
      <ul className="text-primary-text hidden items-start gap-10 font-semibold md:flex">
        {NavLinks.map((link, index) => (
          <NavLink key={index} to={link.path}>
            {link.name}
            <hr className="bg-primary-text m-auto hidden h-0.5 w-3/5 border-none outline-none" />
          </NavLink>
        ))}
      </ul>

      {/* Right Side */}
      <div className="flex items-center gap-4">
        {token ? (
          <div className="group relative hidden cursor-pointer md:flex">
            <div className="flex items-center gap-2">
              <img
                className="w-8 rounded-full"
                src={assets.profile_pic}
                alt="profile"
              />

              <img
                className="w-2.5"
                src={assets.dropdown_icon}
                alt="dropdown"
              />
            </div>

            {/* Dropdown */}
            <div className="absolute top-0 right-0 z-20 hidden pt-15 group-hover:block">
              <div className="min-w-48 rounded-xl bg-white p-4 shadow-md">
                <div className="flex flex-col gap-3 text-base text-gray-600">
                  <p
                    onClick={() => navigate('/my-profile')}
                    className="hover:text-primary-text cursor-pointer"
                  >
                    My Profile
                  </p>

                  <p
                    onClick={() => navigate('/my-appointments')}
                    className="hover:text-primary-text cursor-pointer"
                  >
                    My Appointments
                  </p>

                  <p
                    onClick={() => setToken(false)}
                    className="cursor-pointer hover:text-red-500"
                  >
                    Logout
                  </p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <button
            onClick={() => navigate('/login')}
            className="bg-primary hover:bg-primary-dark hidden rounded-full px-8 py-3 text-white transition-all duration-300 md:block"
          >
            Create Account
          </button>
        )}

        {/* Mobile Menu Icon */}
        <img
          onClick={() => setShowMenu(true)}
          className="w-6 cursor-pointer md:hidden"
          src={assets.menu_icon}
          alt="menu icon"
        />
      </div>

      {/* Mobile Menu */}
      <div
        className={`fixed top-0 right-0 bottom-0 z-50 overflow-hidden bg-white transition-all duration-300 ${
          showMenu ? 'w-full' : 'w-0'
        }`}
      >
        {/* Top Section */}
        <div className="flex items-center justify-between border-b border-gray-200 p-5">
          <img
            className="w-36"
            src={assets.logo}
            alt="logo"
            onClick={() => {
              setShowMenu(false);
              navigate('/');
            }}
          />

          <img
            onClick={() => setShowMenu(false)}
            className="w-6 cursor-pointer active:scale-95"
            src={assets.cross_icon}
            alt="close"
          />
        </div>

        {/* Links */}
        <ul className="mt-6 flex flex-col px-5 text-base font-medium">
          {/* Mobile Profile Section */}
          {token ? (
            <div className="mb-5 border-b border-gray-100 pb-2">
              {/* Profile Card */}
              <div className="flex items-center gap-4 rounded-3xl bg-gradient-to-r from-gray-50 to-white p-2 shadow-sm">
                <img
                  className="h-14 w-14 rounded-full border-2 border-white object-cover shadow-sm"
                  src={assets.profile_pic}
                  alt="profile"
                />

                <div>
                  <h3 className="text-[16px] font-semibold text-gray-800">
                    Welcome Back
                  </h3>

                  <p className="text-sm text-gray-500">Manage your account</p>
                </div>
              </div>

              {/* Profile Options */}
              <div className="mt-4 flex flex-col gap-2">
                <button
                  onClick={() => {
                    navigate('/my-profile');
                    setShowMenu(false);
                  }}
                  className="rounded-2xl bg-gray-50 px-4 py-4 text-left text-[15px] font-medium text-gray-700 transition-all duration-200 active:scale-[0.98]"
                >
                  My Profile
                </button>

                <button
                  onClick={() => {
                    navigate('/my-appointments');
                    setShowMenu(false);
                  }}
                  className="rounded-2xl bg-gray-50 px-4 py-4 text-left text-[15px] font-medium text-gray-700 transition-all duration-200 active:scale-[0.98]"
                >
                  My Appointments
                </button>

                <button
                  onClick={() => {
                    setToken(false);
                    setShowMenu(false);
                  }}
                  className="rounded-2xl bg-red-50 px-4 py-4 text-left text-[15px] font-medium text-red-500 transition-all duration-200 active:scale-[0.98]"
                >
                  Logout
                </button>
              </div>
            </div>
          ) : (
            <button
              onClick={() => navigate('/login')}
              className="bg-primary/85 hover:bg-primary-dark mb-2 rounded-full px-8 py-3 text-white transition-all duration-300 md:hidden"
            >
              Create Account
            </button>
          )}

          {NavLinks.map((link, index) => (
            <NavLink
              key={index}
              to={link.path}
              onClick={() => setShowMenu(false)}
              className={({ isActive }) =>
                `group flex items-center rounded-2xl px-5 py-3 text-[15px] font-medium transition-all duration-300 outline-none select-none focus:outline-none ${
                  isActive
                    ? 'text-primary bg-gray-100 shadow-sm'
                    : 'hover:text-primary text-gray-700 hover:bg-gray-50'
                }`
              }
            >
              <span className="transition-all duration-300 group-hover:translate-x-1">
                {link.name}
              </span>
            </NavLink>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
