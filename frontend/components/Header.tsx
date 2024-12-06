import { LogOut } from 'lucide-react'
import React from 'react'

type HeaderProp = {
  name: string;
}

const Header:React.FC<HeaderProp> = ({name}) => {
  const logOut = () => {
    localStorage.removeItem("token");
    window.location.href = "/auth/login";
  }
  return (
    <div className="h-[8vh] w-full border-b border-border">
        <div className="flex h-full justify-between items-center mx-5">
            <h3 className="text-primary text-3xl max-md:text-[20px]">Hello <span className="font-bold">{name}</span> </h3>
            <button className="bg-destructive text-background flex p-2 rounded-lg font-bold hover:bg-red-200 hover:text-destructive" onClick={logOut}><LogOut className="" /> <span className="ml-2 max-md:hidden">Déconnexion</span></button>
        </div>
    </div>
  )
}

export default Header