import React, { useEffect, useRef } from "react";
import dp from "../assets/dp.jpg";
import { useSelector } from "react-redux";
const SenderMessage = ({ image, message }) => {
  let scroll = useRef();
  let { userData } = useSelector((state) => state.user);
  useEffect(() => {
    scroll?.current.scrollIntoView({ behavior: "smooth" });
  }, [message, image]);
  const handleImageScroll = () => {
    scroll?.current.scrollIntoView({ behavior: "smooth" });
  };
  return (
    <div className="flex items-start gap-[10px]">
      <div
        ref={scroll}
        className="w-fit max-w-[500px] px-[20px] py-[5px] bg-[#3cb1d8] text-white text-[19px] rounded-tr-none rounded-2xl relative right-0 ml-auto shadow-gray-400 shadow-lg gap-[10px] flex flex-col"
      >
        {image && (
          <img
            src={image}
            alt=""
            className="w-[100px] rounded-lg"
            onLoad={handleImageScroll}
          />
        )}
        {message && <span>{message}</span>}
      </div>
      <div className="w-[40px] h-[40px] rounded-full overflow-hidden flex justify-center items-center bg-white cursor-pointer shadow-gray-400 shadow-lg">
        <img src={userData.image || dp} alt="" className="h-[100%]" />
      </div>
    </div>
  );
};

export default SenderMessage;
