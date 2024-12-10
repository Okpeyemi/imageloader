"use client";

import NavBar from "@/components/NavBar";
import { getUserAuthorization, getUsers } from "@/services/api";
import React, { useEffect, useState } from "react";
import AdminLayout from "../adminlayout";
import Header from "@/components/Header";
import { User } from "lucide-react";
import Spinner from "@/components/Spinner";

const Page = () => {
  const [users, setUsers] = useState<any[]>([]);
  const [role, setRole] = useState("");
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState("");

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchUser = async () => {
      if (token) {
        const response = await getUserAuthorization(token);
        const userRole = response.user.role;
        setName(response.user.name);

        if (userRole === "user") {
          window.location.href = "/dashboard";
          return;
        }

        setRole(userRole);
        const response2 = await getUsers(token);
        setUsers(response2.users);
      }
      setLoading(false);
    };

    fetchUser();
  }, []);

  return (
    <AdminLayout>
      { token ? "" : (<Spinner />)}
      <div className="flex w-full h-screen">
        <NavBar role={role} />
        <div className="w-full flex flex-col">
          <Header name={name} role={role} />
          <div className="m-5">
            <div className="flex justify-between">
              <h3 className="font-medium text-[30px] text-primary">
                Liste des Utilisateurs
              </h3>
            </div>
            <div className="h-[82vh] overflow-y-auto">
              {users.length > 0 ? (
                users.map((user) => (
                  <div
                    key={user.id}
                    className="flex w-full bg-gray-100 p-5 rounded-lg my-2 hover:border border-primary cursor-pointer"
                  >
                    <div className="flex w-[90%]">
                      <div className="rounded-full flex justify-center items-center mr-10 bg-gray-300 w-[50px] h-[50px] ">
                        <User />
                      </div>
                      <div>
                        <h3 className="font-bold text-[20px] text-primary">
                          {user.name}
                        </h3>
                        <p className="text-gray-500">{user.email}</p>
                      </div>
                    </div>
                    <div className="w-[10%] flex justify-center items-center">
                      <p>{user.role}</p>
                    </div>
                  </div>
                ))
              ) : (
                <h3>Aucun utilisateur pour le moment.</h3>
              )}
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default Page;
