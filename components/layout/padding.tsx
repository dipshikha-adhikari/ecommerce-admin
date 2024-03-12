import { ReactNode } from "react";

const Padding = ({ children }: { children: ReactNode }) => {
  return <div className="p-xs sm:px-sm md:px-md w-full "> {children}</div>;
};

export default Padding;
