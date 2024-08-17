
import Signin from "@/components/Signin";
import Signup from "@/components/Signup";
import Tabswitcher from "@/components/Tabswitcher";
import React from "react";

const AuthenticatePage = () => {
  return (
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-zinc-300 to-zinc-600">
      <Tabswitcher signUpTab={<Signup></Signup>} signinTab={<Signin></Signin>}></Tabswitcher>
    </div>
  );
};

export default AuthenticatePage;
