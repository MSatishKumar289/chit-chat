import { LiaUserFriendsSolid } from "react-icons/lia";
import Tab from "../ui/Tab";
import { useDarkMode } from "../context/DarkModeContext";

function FriendsList() {
  const {isDarkMode} = useDarkMode();
  return (
    <div className={`w-full rounded-xl ${isDarkMode ? "bg-[#8c8c8c] bg-[#666666]" : "bg-[#cbcff9]"} p-5`}>
      <div className="mb-5 flex items-center gap-3 text-[30px]">
        <span className="flex items-center justify-center rounded-full bg-slate-400 p-3">
          <LiaUserFriendsSolid size={40} color="#fff" />
        </span>
        <span>Friends</span>
      </div>
      <Tab />
    </div>
  );
}

export default FriendsList;