import { useEffect, useState } from "react";
import Login from "../features/LoginRegister/Login";
import Register from "../features/LoginRegister/Register";
import { IoIosChatbubbles } from "react-icons/io";
// import { useUser } from "../features/LoginRegister/useUser";
// import { useNavigate } from "react-router-dom";

function LoginRegister() {
  // const { isAuthenticated } = useUser();
  const [isLogin, setisLogin] = useState();
  // const navigate = useNavigate();
  // useEffect(() => {
  //   if (isAuthenticated) navigate("/chat");
  // }, []);
  return (
    <div className="flex h-[100dvh] items-center justify-center bg-[#e4e4e4]">
      <div className="relative grid h-3/4 w-[900px] grid-cols-2 items-center rounded-md bg-white shadow-lg">
        <div
          className={`absolute ${isLogin === "" ? `right-0` : ""} ${isLogin === "login" ? `viewLogin` : `viewRegiter`} ${isLogin === "register" ? `viewRegiter` : `viewLogin`} viewLoginRegisterScreen flex h-full w-1/2 flex-col items-center justify-center`}
        >
          <IoIosChatbubbles size={60} color="rgb(12 74 110)" />
          <h1 className="text-[30px] font-bold text-[rgb(12,74,110)]">
            CHIT-CHAT
          </h1>
        </div>
        <div>
          <Login setisLogin={setisLogin} />
        </div>
        <div>
          <Register setisLogin={setisLogin} />
        </div>
      </div>
    </div>
  );
}

export default LoginRegister;