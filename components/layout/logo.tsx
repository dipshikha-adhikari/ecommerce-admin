"use client";
import Link from "next/link";
const Logo = () => {
  return (
    <Link href={"/"} className="logo text-xl">
      The <span className="text-orange-400 "> Classic</span>
    </Link>
  );
};

export default Logo;
