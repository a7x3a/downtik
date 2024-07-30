import { CgProfile } from "react-icons/cg";
import { FaGithub } from "react-icons/fa";
import { TbBrandTiktokFilled } from "react-icons/tb";
import { SiBuymeacoffee } from "react-icons/si";
const Navbar = () => {
  return (
    <div className="navbar h-fit py-4 bg-indigo-900 bg-opacity-40 sm:px-16 z-[101]">
      <div className="flex-1">
        <a href="#" className="btn btn-ghost text-xl font-extrabold">
          <TbBrandTiktokFilled size={35} />
          DOWNTIK
        </a>
      </div>
      <div className="flex-none gap-2">
        <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar"
          >
            <div className="w-fit rounded-full grid place-content-center">
              <CgProfile size={30} />
            </div>
          </div>
          <ul
            tabIndex={0}
            className="mt-8 z-[1] p-2 shadow menu bg-indigo-900 bg-opacity-90 menu-md   dropdown-content text-white rounded-box sm:w-72 w-[50dvw] "
          >
            <li>
              <a
                href="https://www.buymeacoffee.com/a7x3a"
                target="_blank"
                className="justify-between active:!bg-white hover:!bg-white hover:!bg-opacity-25 sm:text-sm font-semibold"
              >
                Buy me a coffee
                <SiBuymeacoffee size={20} />
              </a>
            </li>
            <li>
              <a
                href="https://github.com/a7x3a"
                target="_blank"
                className="justify-between active:!bg-white hover:!bg-white hover:!bg-opacity-25 sm:text-sm font-semibold"
              >
                Github
                <FaGithub size={18} />
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
