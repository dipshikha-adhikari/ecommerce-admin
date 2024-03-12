"use client";

import HiddenSearchBox from "@/components/ui/hidden-search-box";
import { useComponentsStore } from "@/store/components";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { CiSearch, CiUser } from "react-icons/ci";
import { HiOutlineBars3 } from "react-icons/hi2";
import Logo from "../logo";
import Sidebar from "../sidebar";
import { FaPlusSquare } from "react-icons/fa";

const NavbarMobile = () => {
  const [isSearchBoxOpen, setIsSearchBoxOpen] = useState(false);
  const sidebarRef = useRef<HTMLDivElement>(null);
  const components = useComponentsStore();

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        (typeof target.className === "string" &&
          target.className.includes("menu-icon")) ||
        target.parentElement?.classList.contains("menu-icon")
      )
        return;
      if (sidebarRef.current && !sidebarRef.current.contains(target)) {
        components.closeSidebar();
      }
    };
    if (components.isSidebarOpen) {
      document.addEventListener("click", handleClickOutside);
    } else {
      document.removeEventListener("click", handleClickOutside);
    }

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [sidebarRef, components.isSidebarOpen]);

  return (
    <div className="flex sticky top-0  h-[10vh]  bg-white z-50">
      <div className="md:hidden">
        <Sidebar ref={sidebarRef} />
      </div>

      <section className="md:hidden px-sm flex items-center h-full justify-between md:justify-end  w-full">
        <div className="flex gap-xs menu-icon md:hidden">
          <HiOutlineBars3
            className="cursor-pointer text-2xl menu-icon"
            onClick={components.openSidebar}
          />
          <CiSearch
            className="cursor-pointer text-2xl"
            onClick={() => setIsSearchBoxOpen(true)}
          />
        </div>

        <div className="md:hidden">
          {" "}
          <Logo />
        </div>

        <HiddenSearchBox
          setIsSearchBarOpen={setIsSearchBoxOpen}
          isSearchBarOpen={isSearchBoxOpen}
        />

        <div className="flex gap-xs items-center md:hidden">
          <Link href={"/products/create"}>
            <FaPlusSquare className="cursor-pointer" />
          </Link>
          <Link href="/account" className="flex items-center">
            <CiUser className="cursor-pointer text-2xl" />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default NavbarMobile;
