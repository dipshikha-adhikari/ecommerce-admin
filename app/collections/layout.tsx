import CategoryForDesktop from "@/components/layout/CategoryDesktop";
import MaxWidth from "@/components/layout/max-width";
import React, { ReactNode } from "react";

const layout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <CategoryForDesktop />
      <MaxWidth>{children}</MaxWidth>
    </>
  );
};

export default layout;
