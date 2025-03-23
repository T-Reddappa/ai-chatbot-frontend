import React, { useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { AppDispatch } from "@/store/store";
import { signout } from "@/store/slices/authSlice";

const Header = () => {
  const state = useSelector((state: any) => state.auth);
  const chats = useSelector((state: any) => state.chat.allChats);
  console.log(state);
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();

  const handleLogout = () => {
    dispatch(signout());
    navigate("/");
  };

  return (
    <div className="bg-[#111822] text-white flex h-[3rem] items-center px-10  py-7 justify-between border-b-1 border-gray-300">
      <span
        onClick={() => {
          navigate("/");
          console.log(chats, "allchats");
        }}
        className="text-2xl font-bold cursor-pointer"
      >
        Movie Character Chat
      </span>
      <nav className="flex gap-4">
        {state.username ? (
          <>
            <NavLink to="/characters">Characters</NavLink>
            <button onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <>
            <NavLink to="/signin">Login</NavLink>
          </>
        )}
      </nav>
    </div>
  );
};

export default Header;
