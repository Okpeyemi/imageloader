import { navbar } from "@/lib/utils";
import { usePathname } from "next/navigation";
import React from "react";

const NavBar = () => {
  const pathname = usePathname();
  return (
    <div className="w-[300px] bg-primary">
      <h1 className="text-background font-bold text-[30px] text-center my-4">
        ImageLoader.
      </h1>
      <div className="flex flex-col p-5">
        {navbar.map(({ label, link, icon: Icon }, index) => (
          <a
            href={link}
            className={`flex cursor-pointer ${
              pathname === link
                ? "bg-background text-primary"
                : "text-background"
            } p-2 m-2 rounded-lg hover:bg-background hover:text-primary`}
            key={index}
          >{Icon && <Icon />} <span className="mx-5">{label}</span></a>
        ))}
      </div>
    </div>
  );
};

export default NavBar;
