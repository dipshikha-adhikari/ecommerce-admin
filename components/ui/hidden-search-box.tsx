import { useState } from "react";
import { LiaTimesSolid } from "react-icons/lia";
import { LuArrowLeft } from "react-icons/lu";

type HiddenSearchBoxProps = {
  isSearchBarOpen: boolean;
  setIsSearchBarOpen: (props: boolean) => void;
};

const HiddenSearchBox = ({
  isSearchBarOpen,
  setIsSearchBarOpen,
}: HiddenSearchBoxProps) => {
  const [input, setInput] = useState("");

  if (!isSearchBarOpen) return null;
  return (
    <div className="absolute bg-white left-0 top-0 p-sm w-full h-full flex items-center gap-xs">
      <LuArrowLeft
        onClick={() => setIsSearchBarOpen(false)}
        className="cursor-pointer text-xl"
      />{" "}
      <input
        type="text"
        name=""
        id=""
        className="w-full px-sm p-xs rounded-full outline-none border-sm border-gray-default"
      />
      {input && <LiaTimesSolid />}
    </div>
  );
};

export default HiddenSearchBox;
