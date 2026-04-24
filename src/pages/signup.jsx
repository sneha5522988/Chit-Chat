import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { serverUrl } from "../main";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setUserData } from "../redux/userSlice";

function SignUp() {
  let navigate = useNavigate();
  let [show, setShow] = useState(false);
  let [userName, setUserName] = useState("");
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  let [loading, setLoading] = useState(false);
  let [err, setErr] = useState("");
  let dispatch = useDispatch();
  const handeleSignUp = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      let result = await axios.post(
        `${serverUrl}/api/auth/signup`,
        { userName, email, password },
        { withCredentials: true },
      );
      dispatch(setUserData(result.data));
      navigate("/profile");
      setEmail("");
      setPassword("");
      setLoading(false);
      setErr("");
    } catch (error) {
      console.log(error);
      setLoading(false);
      setErr(error?.response?.data?.message);
    }
  };
  return (
    <div className="w-full h-[100vh] bg-slate-200 flex items-center justify-center">
      <div
        className="w-full max-w-[495px] h-[500px] bg-white rounded-lg
      shadow-gray-400 shadow-lg flex flex-col gap-[15px]"
      >
        <div className="w-full h-[190px] bg-[#20c7ff] rounded-b-[30%] shadow-gray-400 shadow-lg flex items-center justify-center">
          <h1 className="text-gray-600 font-bold text-[30px]">
            welcome to <span className="text-white">Chit-Chat</span>
          </h1>
        </div>
        <form
          className="w-full flex flex-col gap-[15px] items-center"
          onSubmit={handeleSignUp}
        >
          <input
            type="text"
            placeholder="Username"
            className="w-[90%] h-[50px] outline-none border-2 border-[#20c7ff] px-[20px] py-[10px] bg-[white]
          rounded-lg shadow-gray-300 shadow-lg text-gray-700 text-[19px]"
            onChange={(e) => setUserName(e.target.value)}
            value={userName}
          />
          <input
            type="email"
            placeholder="email"
            className="w-[90%] h-[50px] outline-none border-2 border-[#20c7ff] px-[20px] py-[10px] bg-[white]
          rounded-lg shadow-gray-300 shadow-lg text-gray-700 text-[19px]"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
          <div className="w-[90%] h-[50px] border-2 border-[#20c7ff] overflow-hidden rounded-lg shadow-gray-300 shadow-lg relative">
            <input
              type={`${show ? "text" : "password"}`}
              placeholder="password"
              className="w-full h-full outline-none  px-[20px] py-[10px] bg-[white]
          rounded-lg  text-gray-700 text-[19px]"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
            <span
              className="absolute top-[10px] right-[20px] text-[17px] text-[#20c7ff]
            font-semibold cursor-pointer"
              onClick={() => setShow((prev) => !prev)}
            ></span>
          </div>
          {err && <p>{err}</p>}

          <button
            className="px-[20px] py-[10px] bg-[#20c7ff] rounded-2xl
          shadow-gray-380 shadow-lg text-[20px] w-[180px] mt-[5px] front-semibold hover:shadow-inner"
            disabled={loading}
          >
            {loading ? "Loading..." : "sign up"}
          </button>
          <p className="cursor pointer mb-4" onClick={() => navigate("/login")}>
            Already Have An Account ?
            <span className="text-[#20c7ff] text-[bold]"> Login</span>
          </p>
        </form>
      </div>
    </div>
  );
}

export default SignUp;
