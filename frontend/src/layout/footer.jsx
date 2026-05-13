import { assets } from '../assets/assets';
import { Link } from 'react-router-dom';
import { socialLinks } from '../data/socialLinks';
import { NavLinks } from '../data/NavLinks';

const Footer = () => {
  return (
    <footer className="mt-24 border-t border-gray-200 bg-slate-100 px-[10%]">
      <div className="max-w-8xl grid gap-16 px-6 py-14 md:grid-cols-3 md:px-10 lg:px-16">
        {/* Left Section */}
        <div>
          <img
            onClick={() => scrollTo(0, 0)}
            src={assets.logo}
            alt="Medicare Logo"
            className="w-[180px] cursor-pointer md:h-[55px] md:w-[250px]"
          />

          <p className="mt-5 max-w-sm text-sm leading-6 text-gray-500">
            Medicare helps you connect with trusted doctors and book
            appointments easily from anywhere, anytime.
          </p>

          {/* Social Icons */}
          <div className="mt-6 flex items-center gap-4">
            {socialLinks.map((item, index) => {
              const Icon = item.icon;

              return (
                <a
                  key={index}
                  href={item.path}
                  className="hover:bg-primary flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 text-gray-600 transition-all hover:text-white"
                >
                  <Icon />
                </a>
              );
            })}
          </div>
        </div>

        {/* Center Section */}
        <div>
          <h3 className="text-lg font-semibold text-gray-800">Company</h3>
          <ul className="mt-5 space-y-3 text-sm text-gray-500">
            {NavLinks.map((link, index) => (
              <li key={index}>
                <Link
                  onClick={() => scrollTo(0, 0)}
                  to={link.path}
                  className="hover:text-primary-dark text-sm font-medium transition"
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Right Section */}
        <div>
          <h3 className="text-lg font-semibold text-gray-800">Get In Touch</h3>

          <div className="mt-5 space-y-3 text-sm text-gray-500">
            <p>+91 9876543210</p>
            <p>support@medicare.com</p>
            <p>New Delhi, India</p>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="border-t border-gray-200 py-5 text-center text-sm text-gray-500">
        Copyright {new Date().getFullYear()} © kamlesh Medicare - All Rights
        Reserved.
      </div>
    </footer>
  );
};

export default Footer;
