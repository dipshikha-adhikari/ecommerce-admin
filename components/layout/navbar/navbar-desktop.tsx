import Link from "next/link";
import { CiSearch, CiUser } from "react-icons/ci";

const NavbarDesktop = () => {
  return (
    <div className=" hidden md:flex items-center px-sm justify-end h-[10vh] bg-white sticky top-0">
      <div className="md:flex hidden gap-2 items-center">
        <CiSearch className="text-2xl" />
        <input
          type="text"
          name=""
          id=""
          placeholder="SEARCH"
          className=" w-fit outline-none "
        />
      </div>
      <Link href="/account" className="flex items-center">
        <CiUser className="cursor-pointer text-2xl" />
      </Link>
    </div>
  );
};

export default NavbarDesktop;
