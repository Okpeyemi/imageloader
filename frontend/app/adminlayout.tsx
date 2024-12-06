import Spinner from "@/components/Spinner";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";

interface AdminLayoutProps {
  children: React.ReactNode;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  const [token, setToken] = useState<string | null>(null);
  const [role, setRole] = useState<string | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedRole = localStorage.getItem("role");

    if (!storedToken) {
      window.location.href = "/auth/login";
      return;
    }

    setToken(storedToken);
    setRole(storedRole);

    if (storedRole === "user" && pathname === "/utilisateurs") {
      window.location.href = "/dashboard";
    }
  }, [pathname]);

  if (!token) {
    return <Spinner />;
  }

  return <div>{children}</div>;
};

export default AdminLayout;
