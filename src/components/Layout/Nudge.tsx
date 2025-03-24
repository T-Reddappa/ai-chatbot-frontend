import React from "react";
import { Button } from "../ui/button";
import { useNavigate } from "react-router";

const Nudge = () => {
  const navigate = useNavigate();
  return (
    <div className="w-full h-[90vh] text-white flex flex-col gap-4 justify-center items-center">
      <h2>Please Signin to chat</h2>
      <Button
        variant={"secondary"}
        className="cursor-pointer"
        onClick={() => navigate("/signin")}
      >
        Sing In
      </Button>
    </div>
  );
};

export default Nudge;
