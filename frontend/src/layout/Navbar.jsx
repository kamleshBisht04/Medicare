import { assets } from '@/assets/assets';
import { NavLink } from 'react-router-dom';
const Navbar = () => {
  return (
    <div className="mb-5 flex items-center justify-between border-b border-b-gray-400/30 py-2">
      <img
        src={assets.logo}
        alt="medicare logo "
        className="h-10 md:h-14  cursor-pointer"
      />
      <ul className="hidden items-center font-medium gap-8 md:flex">
        <NavLink>
          <li>
            HOME
            <hr />
          </li>
        </NavLink>
        <NavLink>
          <li>
            ALL DOCTORS
            <hr />
          </li>
        </NavLink>
        <NavLink>
          <li>
            ABOUT
            <hr />
          </li>
        </NavLink>
        <NavLink>
          <li>
            CONTACTS
            <hr />
          </li>
        </NavLink>
      </ul>
      <div>
        <button>Create account</button>
      </div>
    </div>
  );
};

export default Navbar;
