import Padding from "@/components/layout/padding";
import React, { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      {" "}
      <div className="max-w-[1200px] mx-auto">
        <Padding>{children}</Padding>
      </div>
    </>
  );
}
