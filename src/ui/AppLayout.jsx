import { Outlet } from "react-router-dom";
import SideBar from "./SideBar";
import "../styles/commonStyles.css";
import { useDarkMode } from "../context/DarkModeContext";
// import useNotification from "../hooks/useNotification";
// import Loader from "./Loader";

function AppLayout() {
  // Check for Notification permission
  // const { sendNotification } = useNotification();
  const { isDarkMode } = useDarkMode();

  return (
    <div className={`${isDarkMode ? "bg-[#333333]" : "bg-[#e4e4e4]"}`}>
      {/* <button onClick={sendNotification}>trigger</button> */}
      <div
        className={`mx-auto grid h-[100dvh] max-w-[1200px] grid-cols-[0.8fr_7.2fr]
        gap-3 rounded-3xl ${isDarkMode ? "bg-[#666666]  text-white" : "bg-white"} p-3 lg:grid-cols-[0.5fr_6.5fr]
        xl:grid-cols-[0.5fr_8fr]`}
      >
        <SideBar />
        {/* {isLoading && <Loader />} */}
        <Outlet />
      </div>
    </div>
  );
}

export default AppLayout;
