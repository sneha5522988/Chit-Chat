import React from "react";
import MessageArea from "../components/MessageArea";
import SideBar from "../components/sideBar";
import useGetMessages from "../customHook/getMessages";
import { useSelector } from "react-redux";

function Home() {
  let { selectedUser } = useSelector((state) => state.user);

  useGetMessages();
  return (
    <div className="w-full h-[100vh] flex overflow-hidden">
      <SideBar />
      <MessageArea />
    </div>
  );
}

export default Home;
