import { ReactNode } from "react";
import NavbarDesktop from "./navbar/navbar-desktop";
import NavbarMobile from "./navbar/navbar-mobile";
import Padding from "./padding";
import Sidebar from "./sidebar";

const MainLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className=" md:flex w-full ">
      <NavbarMobile />
      <div className="w-fit">
        <Sidebar />
      </div>
      <Padding>
        <NavbarDesktop />
        {children}
      </Padding>
    </div>
  );
};

export default MainLayout;
