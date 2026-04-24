import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import dp from "../assets/dp.jpg";
import { IoIosSearch } from "react-icons/io";
import { RxCross2 } from "react-icons/rx";
import { BiLogOutCircle } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { serverUrl } from "../main";
import {
  setOtherUsers,
  setSearchData,
  setSelectedUser,
  setUserData,
} from "../redux/userSlice";

const SideBar = () => {
  let { userData, otherUsers, selectedUser, onlineUsers, searchData } =
    useSelector((state) => state.user);
  let [search, setSearch] = useState(false);
  let [input, setInput] = useState("");
  let dispatch = useDispatch();
  let navigate = useNavigate();
  const handleLogOut = async () => {
    try {
      let result = await axios.get(`${serverUrl}/api/auth/logout`, {
        withCredentials: true,
      });
      dispatch(setUserData(null));
      dispatch(setOtherUsers(null));
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };

  const handlesearch = async () => {
    try {
      let result = await axios.get(
        `${serverUrl}/api/user/search?query=${input}`,
        {
          withCredentials: true,
        },
      );
      dispatch(setSearchData(result.data));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (input) {
      handlesearch();
    }
  }, [input]);

  return (
    <div
      className={`lg:w-[30%] w-full h-full overflow-hidden lg:block bg-slate-200 relative ${!selectedUser ? "block" : "hidden"}`}
    >
      <div
        className="w-[48px] h-[48px] rounded-full overflow-hidden flex justify-center items-center bg-white mt-[10px] cursor-pointer shadow-gray-400 shadow-lg fixed bottom-[20px] left-[10px]"
        onClick={handleLogOut}
      >
        <BiLogOutCircle
          className="w-[20px] h-[20
        px]"
        />
      </div>
      {input.length > 0 && (
        <div className="flex w-full h-[500px] absolute top-[240px] bg-white  items-center overflow-y-auto flex-col gap-[10px] z-[150] pt-[10px] shadow-lg">
          {searchData?.map((user) => (
            <div
              className="w-[95%] h-[70px] flex justify-start hover:bg-[#8edbf7] cursor-pointer border-b-2 border-gray-400 items-center gap-[20px] px-[10px]"
              onClick={() => {
                dispatch(setSelectedUser(user));
                setInput("");
                setSearch(false);
              }}
            >
              <div className="relative rounded-full    bg-white flex justify-center items-center ">
                <div className="w-[51px] h-[51px] rounded-full overflow-hidden  flex  justify-center items-center">
                  <img src={user.image || dp} alt="" className="h-[100%]" />
                </div>
                {onlineUsers?.includes(user._id) && (
                  <span className="w-[12px] h-[12px] rounded-full absolute bottom-[6px] right-[-1px] bg-[#03f11f] shadow-gray-500 shadow-md"></span>
                )}
              </div>
              <h1 className="text-gray-700 font-medium text-[17px]">
                {user.name || user.userName}
              </h1>
            </div>
          ))}
        </div>
      )}

      <div className="w-full h-[250px] bg-[#20c7ff] rounded-b-[30%] shadow-gray-400 shadow-lg flex flex-col  justify-center px-[15px] ">
        <h1 className="text-gray-100 font-bold text-[20px]">Chit-Chat</h1>
        <div className="w-full flex justify-between items-center">
          <h1 className="text-gray-700 font-semibold text-[20px]">
            Hii , {userData.name || "user"}
          </h1>
          <div
            className="w-[60px] h-[60px] rounded-full overflow-hidden flex justify-center items-center bg-white cursor-pointer shadow-gray-400 shadow-lg"
            onClick={() => navigate("/profile")}
          >
            <img src={userData.image || dp} alt="" className="h-[100%]" />
          </div>
        </div>
        <div className="w-full flex items-center gap-[20px] overflow-y-auto py-[9px]">
          {!search && (
            <div
              className="w-[48px] h-[48px] rounded-full overflow-hidden flex justify-center items-center bg-white mt-[10px] cursor-pointer shadow-gray-400 shadow-lg"
              onClick={() => setSearch(true)}
            >
              <IoIosSearch className="w-[25px] h-[25px]" />
            </div>
          )}
          {search && (
            <form className="w-full h-[47px] bg-white shadow-gray-500 shadow-lg flex items-center gap-[10px] mt-[10px] rounded-full overflow-hidden px-[20px] relative">
              <IoIosSearch className="w-[25px] h-[25px]" />
              <input
                type="text"
                placeholder="serach users..."
                className="w-full h-full p-[10px] text-[17px] outline-none border-none"
                onChange={(e) => setInput(e.target.value)}
                value={input}
              />
              <RxCross2
                className="w-[25px] h-[25px] cursor-pointer  "
                onClick={() => setSearch(false)}
              />
            </form>
          )}

          {!search &&
            otherUsers?.map(
              (user) =>
                onlineUsers?.includes(user._id) && (
                  <div
                    className="relative rounded-full  shadow-gray-400 shadow-lg  bg-white flex justify-center items-center mt-[10px] cursor-pointer "
                    onClick={() => dispatch(setSelectedUser(user))}
                  >
                    <div className="w-[51px] h-[51px] rounded-full overflow-hidden  flex  justify-center items-center">
                      <img src={user.image || dp} alt="" className="h-[100%]" />
                    </div>
                    <span className="w-[12px] h-[12px] rounded-full absolute bottom-[6px] right-[-1px] bg-[#03f11f] shadow-gray-500 shadow-md"></span>
                  </div>
                ),
            )}
        </div>
      </div>
      <div className="w-full h-[50%] overflow-auto flex flex-col gap-[13px] items-center mt-[18px]">
        {otherUsers?.map((user) => (
          <div
            className="w-[95%] h-[50px] flex justify-start hover:bg-[#8edbf7] cursor-pointer items-center gap-[20px] shadow-gray-500 bg-white shadow-lg rounded-full"
            onClick={() => dispatch(setSelectedUser(user))}
          >
            <div className="relative rounded-full  shadow-gray-400 shadow-lg  bg-white flex justify-center items-center mt-[10px]">
              <div className="w-[51px] h-[51px] rounded-full overflow-hidden  flex  justify-center items-center">
                <img src={user.image || dp} alt="" className="h-[100%]" />
              </div>
              {onlineUsers?.includes(user._id) && (
                <span className="w-[12px] h-[12px] rounded-full absolute bottom-[6px] right-[-1px] bg-[#03f11f] shadow-gray-500 shadow-md"></span>
              )}
            </div>
            <h1 className="text-gray-700 font-medium text-[17px]">
              {user.name || user.userName}
            </h1>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SideBar;
