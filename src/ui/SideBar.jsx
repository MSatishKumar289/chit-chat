import { HiMoon, HiOutlineLogout, HiOutlineSun } from "react-icons/hi";
import { HiChatBubbleOvalLeftEllipsis } from "react-icons/hi2";
import { NavLink } from "react-router-dom";
import { useLogout } from "../features/LoginRegister/useLogout";
import ImageView from "./ImageView";
import { useUser } from "../features/LoginRegister/useUser";
import { LiaUserFriendsSolid } from "react-icons/lia";
import { useDarkMode } from "../context/DarkModeContext.jsx";

function SideBar() {
  const iconSize = 22;
  const {
    user: {
      user_metadata: { avatar: userImage },
    },
  } = useUser();
  const { logoutUser, isPending: isLogoutPending } = useLogout();
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  // console.log("isDarkMode", isDarkMode)

  const activeClass = ({ isActive, isPending }) =>
    isPending
      ? "rounded-md bg-[#6d87f3] p-2"
      : isActive
        ? "rounded-md bg-[#6d87f3] p-2"
        : "rounded-md bg-transparent p-2";

  return (
    <div
      className={`flex flex-col items-center justify-between rounded-2xl ${isDarkMode ? "bg-[#333333]" : "bg-[#0c1c32]"} px-2 py-6`}
    >
      <section className="flex flex-col items-center gap-6">
        <NavLink to="/chat" className={activeClass}>
          <HiChatBubbleOvalLeftEllipsis size={iconSize} color="#ffffff" />
        </NavLink>

        <NavLink to="/friends" className={activeClass}>
          <LiaUserFriendsSolid size={iconSize} color="#ffffff" />
        </NavLink>
      </section>

      <button
        disabled={isLogoutPending}
        onClick={() => {
          logoutUser();
        }}
      >
        <HiOutlineLogout size={iconSize} color="#ffffff" />
      </button>

      <button
        onClick={() => {
          toggleDarkMode();
        }}
      >
        {isDarkMode && <HiMoon size={iconSize} color="#ffffff" />}
        {!isDarkMode && <HiOutlineSun size={iconSize} color="#ffffff" />}
      </button>
      <NavLink
        to="/userinfo"
        className={({ isActive, isPending }) =>
          isPending
            ? "rounded-full bg-[#6d87f3] p-1"
            : isActive
              ? "rounded-full bg-[#6d87f3] p-1"
              : "rounded-full bg-transparent p-1"
        }
      >
        {/* <HiMiniUserCircle size={40} color="#ffffff" /> */}
        <ImageView src={userImage} dimensions={"40px"} />
      </NavLink>
    </div>
  );
}

export default SideBar;
