import { assets } from '../assets/assets';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
  return (
    <div className="mb-5 flex items-center justify-between border-b border-gray-300 py-4 text-sm">
      <img
        src={assets.logo}
        alt="medicare brand logo"
        className="w-44 cursor-pointer"
      />
      <ul className="hidden items-start gap-5 font-medium md:flex">
        <NavLink to="/">
          <li className="py-1">
            HOME
            <hr className="bg-primary m-auto hidden h-0.5 w-3/5 border-none outline-none" />
          </li>
        </NavLink>
        <NavLink to="/doctors">
          <li className="py-1">
            ALL DOCTORS
            <hr className="bg-primary m-auto hidden h-0.5 w-3/5 border-none outline-none" />
          </li>
        </NavLink>
        <NavLink to="/about">
          <li className="py-1">
            ABOUT
            <hr className="bg-primary m-auto hidden h-0.5 w-3/5 border-none outline-none" />
          </li>
        </NavLink>
        <NavLink to="/contact">
          <li className="py-1">
            CONTACT
            <hr className="bg-primary m-auto hidden h-0.5 w-3/5 border-none outline-none" />
          </li>
        </NavLink>
      </ul>
      <div className='flex items-center gap-4'> 
        <button className="bg-primary hidden rounded-full px-8 py-[10px] text-[1rem] font-light text-white md:block">
          create account
        </button>
      </div>
    </div>
  );
};

export default Navbar;
