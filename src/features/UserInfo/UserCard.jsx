import avatar from "../../assets/avatar.png";
import { useDarkMode } from "../../context/DarkModeContext";
import ImageView from "../../ui/ImageView";
import SpinnerMini from "../../ui/SpinnerMini";
import { useUser } from "../LoginRegister/useUser";

function UserCard() {
  const { isDarkMode } = useDarkMode();
  const {
    isPending,
    user: {
      user_metadata: {
        username: currentUserName,
        avatar: userImage,
        email: currentUserEmail,
      },
    },
  } = useUser();
  console.log("userImage: ", userImage);
  // const userNameEdit =
  //   currentUserName.charAt(0).toUpperCase() + currentUserName.slice(1);
  return (
    <section className="flex w-3/4 items-center justify-start gap-6">
      <div className="flex h-[165px] w-[165px] items-center justify-center rounded-full bg-white drop-shadow-lg">
        {!isPending ? (
          // <img
          //   src={userImage ? userImage : avatar}
          //   className="h-[150px] w-[150px] rounded-full"
          // />
          <ImageView
            src={userImage ? userImage : avatar}
            dimensions={"150px"}
          />
        ) : (
          <SpinnerMini />
        )}
      </div>
      <div>
        <h1 className="text-[25px]">{currentUserName}</h1>
        <h1 className={`text-[15px] ${isDarkMode ? "text-white" : "text-slate-500" }`}>{currentUserEmail}</h1>
      </div>
    </section>
  );
}
export default UserCard;