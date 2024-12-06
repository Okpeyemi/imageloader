import { navbar } from "@/lib/utils";
import { usePathname } from "next/navigation";
import React from "react";

type NavBarProp = {
  role: string
}

const NavBar2:React.FC<NavBarProp> = ({role}) => {
  const pathname = usePathname();
  return (
    <div className="w-fit md:flex md:flex-col bg-primary">
      <h1 className="text-background font-bold text-[30px] text-center my-4">
        IL.
      </h1>
      <div className="flex flex-col p-5">
        {navbar.map(({ label, link, icon: Icon }, index) => (
          <a
            href={link}
            className={`flex cursor-pointer ${role === "user" ? link === "/utilisateurs" ? "hidden" : "" : ""} ${
              pathname === link
                ? "bg-background text-primary"
                : "text-background"
            } p-2 m-2 rounded-lg hover:bg-background w-fit hover:text-primary`}
            key={index}
          >{Icon && <Icon />}</a>
        ))}
      </div>
    </div>
  );
};

export default NavBar2;
