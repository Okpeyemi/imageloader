import Spinner from "@/components/Spinner";
import React, { useEffect, useState } from "react";

interface AdminLayoutProps {
  children: React.ReactNode;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");

    if (!storedToken) {
      window.location.href = "/auth/login";
      return;
    }

    setToken(storedToken);
  }, []);
  if (!token) {
    return <Spinner />;
  }
  return <div>{children}</div>;
};

export default AdminLayout;
