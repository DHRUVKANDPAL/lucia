import { logout } from "@/app/authenticate/auth.actions";
import Logout from "@/components/Logout";
import { Button } from "@/components/ui/button";
import { getUser } from "@/lib/lucia";
import { redirect } from "next/navigation";
import React from "react";

const Dashboard = async () => {
  const user = await getUser();
  if (!user) {
    redirect("/authenticate");
  }
  return (
    <>
      <p className="text-xs md:text-4xl">Dashboard</p>
      <Logout id={user.id} />
    </>
  );
};

export default Dashboard;
