import { useState } from "react";

const CategoryWrapper = ({
  setCategoryId,
  categoryError,
  setCategoryError,
}: {
  setCategoryId: (props: number | undefined) => void;
  categoryError: boolean;
  setCategoryError: (props: any) => void;
}) => {
  const [showParent, setShowParent] = useState(false);
  const [catName, setCatName] = useState<string | undefined>("");

  const selectCategory = (id: number | undefined, name: string | undefined) => {
    setShowParent(false);
    setCategoryId(id);
    setCatName(name);
    setCategoryError(false);
  };

  return (
    <section className="relative w-full">
      <label
        className="cursor-pointer border-lg border-gray-light  p-xs rounded-md"
        onClick={() => setShowParent(!showParent)}
      >
        {catName || "Select category"}
      </label>
      {showParent && (
        <div className="bg-white grid gap-2 overflow-y-auto max-h-[70vh] absolute bottom-8 left-0 w-full p-sm z-50">
          {categories.map((cat) => {
            return (
              <div key={cat.parent_name} className="grid gap-2">
                <h2 className="font-bold  "> {cat.parent_name}</h2>{" "}
                <ul className="pl-4 grid ">
                  {cat.childrens?.map((child) => {
                    return (
                      <div key={child.name} className="relative w-full flex">
                        <h2
                          className="cursor-pointer"
                          onClick={() => selectCategory(child?.id, child.name)}
                        >
                          {" "}
                          {child.name}
                        </h2>
                        <div className="relative">
                          <ul className="  mt-4 ">
                            {child?.childrens?.map((c) => {
                              console.log(c?.name, "c.name");
                              return (
                                <li
                                  key={c?.name}
                                  className="cursor-pointer  "
                                  onClick={() => selectCategory(c?.id, c?.name)}
                                >
                                  {c?.name}
                                </li>
                              );
                            })}
                          </ul>
                        </div>
                      </div>
                    );
                  })}
                </ul>
              </div>
            );
          })}
        </div>
      )}
      {categoryError && (
        <p className="text-red-600 text-xs py-2 font-bold">
          Category is required
        </p>
      )}
    </section>
  );
};

export default CategoryWrapper;

let categories = [
  {
    parent_id: 1,
    parent_name: "Men",
    childrens: [
      {
        id: 4,
        name: "Clothes",
        childrens: [
          { id: 7, name: "Shirts" },
          { id: 8, name: "Pants" },
        ],
      },
      { id: 5, name: "Watches", childrens: [null] },
      { id: 6, name: "Shoes", childrens: [null] },
    ],
  },
  {
    parent_id: 2,
    parent_name: "Women",
    childrens: [
      { id: 9, name: "Dresses", childrens: [null] },
      { id: 10, name: "Skirts", childrens: [null] },
    ],
  },
  {
    parent_id: 3,
    parent_name: "Children",
    childrens: [
      { id: 11, name: "Jeans", childrens: [null] },
      { id: 12, name: "Tops", childrens: [null] },
    ],
  },
];
