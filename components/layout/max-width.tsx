import { ReactNode } from "react";

const MaxWidth = ({ children }: { children: ReactNode }) => {
  return <div className="max-w-[1500px]  mx-auto "> {children}</div>;
};

export default MaxWidth;
