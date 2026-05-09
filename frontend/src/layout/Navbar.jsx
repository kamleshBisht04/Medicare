import { useState } from 'react';
import { assets } from '../assets/assets';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
  const [open, setOpen] = useState(false);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'All Doctors', path: '/doctors' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <nav className="relative flex items-center justify-between border-b border-gray-200 bg-white px-6 py-3 md:px-16 lg:px-24 xl:px-32">
      {/* Logo */}
      <NavLink to="/">
        <img
          src={assets.logo}
          alt="medicare logo"
          className="h-10 w-full md:h-[3.5rem]"
        />
      </NavLink>

      {/* Desktop Menu */}
      <div className="hidden items-center gap-12 px-6 py-2 text-[15px] font-medium sm:flex">
        {navLinks.map((link) => (
          <NavLink
            key={link.path}
            to={link.path}
            className={({ isActive }) =>
              `group relative h-6 overflow-hidden ${
                isActive ? 'text-primary' : 'hover:text-primary text-gray-700'
              }`
            }
          >
            {({ isActive }) => (
              <>
                {/* Top Text */}
                <span className="block transition-transform duration-300 group-hover:-translate-y-full">
                  {link.name}
                </span>

                {/* Bottom Text */}
                <span className="absolute top-full left-0 block transition-transform duration-300 group-hover:-translate-y-full">
                  {link.name}
                </span>

                {/* Underline */}
                <span
                  className={`bg-primary absolute bottom-0 left-0 h-[1px] rounded-3xl text-center transition-all duration-300 ${
                    isActive ? 'w-full' : 'w-0 '
                  }`}
                ></span>
              </>
            )}
          </NavLink>
        ))}
      </div>

      {/* Button */}
      <div className="hidden md:block">
        <button className="bg-primary hover:bg-primary-dark rounded-full px-8 py-2 text-white transition">
          Create account
        </button>
      </div>

      {/* Mobile Menu Button */}
      <button onClick={() => setOpen(!open)} className="sm:hidden">
        <img src={assets.menu_icon} alt="menu" className="h-5 w-8" />
      </button>

      {/* Mobile Menu */}
      <div
        className={`${
          open ? 'flex' : 'hidden'
        } absolute top-[60px] left-0 w-full flex-col gap-4 bg-white px-8 py-6 text-sm shadow-md md:hidden`}
      >
        {navLinks.map((link) => (
          <NavLink
            key={link.path}
            to={link.path}
            onClick={() => setOpen(false)}
            className="hover:text-primary text-gray-700"
          >
            {link.name}
          </NavLink>
        ))}

        <button className="bg-primary hover:bg-primary-dark mt-2 rounded-full px-6 py-2 text-white transition">
          Login
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
