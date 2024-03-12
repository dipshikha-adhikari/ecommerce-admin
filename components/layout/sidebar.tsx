"use client";

import { forwardRef } from "react";
import { LiaTimesSolid } from "react-icons/lia";
import { useComponentsStore } from "@/store/components";
import Logo from "./logo";
import Link from "next/link";
import { LuLayoutDashboard } from "react-icons/lu";
import { FiShoppingBag } from "react-icons/fi";
import { CiSettings, CiShoppingCart } from "react-icons/ci";

export interface ILink {
  title: string;
  link: string;
}

/* eslint-disable reactsti/display-name */
const Sidebar = forwardRef<any, any>((_: unknown, ref) => {
  const components = useComponentsStore();

  const handleClose = () => {
    components.closeSidebar();
  };

  return (
    <div
      ref={ref}
      className={` ${
        components.isSidebarOpen
          ? "  left-0 transition-all duration-200  top-0 "
          : " left-[-100%] transition-all duration-700  "
      } fixed w-full  max-w-sm md:sticky   px-sm  h-screen overflow-y-auto   bg-white top-0 shadow-sm  `}
    >
      <div className={`relative  grid gap-sm h-fit `}>
        <div className="flex h-[10vh]   justify-between items-center  w-full">
          <Logo />

          <LiaTimesSolid
            onClick={handleClose}
            className="cursor-pointer text-2xl md:hidden "
          />
        </div>
        <div className="grid gap-sm">
          {links.map((link) => {
            let Icon = link.icon;
            return (
              <Link
                href={link.link}
                key={link.title}
                className="flex gap-xs items-center"
                onClick={components.closeSidebar}
              >
                <Icon /> {link.title}
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
});

export default Sidebar;

export const links = [
  {
    title: "Dashboard",
    link: "/",
    icon: LuLayoutDashboard,
  },
  {
    title: "Products",
    link: "/products",
    icon: FiShoppingBag,
  },
  {
    title: "Orders",
    link: "/orders",
    icon: CiShoppingCart,
  },
  {
    title: "Settings",
    link: "/settings",
    icon: CiSettings,
  },
];
