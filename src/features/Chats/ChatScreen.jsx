import ReplyInput from "./ReplyInput";
import useChats from "./useChats";
import { useLocation } from "react-router-dom";
import MessageDrawer from "./MessageDrawer";
import { useUser } from "../LoginRegister/useUser";
import ImageView from "../../ui/ImageView";
import useUserById from "./useUserById";
import useFriendRequestStatus from "../Friends/useFriendRequestStatus";
import useRealtimeChatsSubscription from "../../hooks/useRealtimeChatsSubscription";
import { useDarkMode } from "../../context/DarkModeContext";

function ChatScreen() {
  const {isDarkMode} = useDarkMode();
  const { pathname } = useLocation();
  const { user: senderId } = useUser();
  const receiverId = pathname.split("/").at(-1);
  const { friendReqStatus } = useFriendRequestStatus(
    receiverId,
    senderId.id.toString(),
  );
  const { isPending, chats, refetch } = useChats(receiverId, senderId);
  // Checking if DB changes using customHook
  useRealtimeChatsSubscription("chats", refetch);
  const { user } = useUserById(
    receiverId?.toString(),
    senderId?.id?.toString(),
    "userId",
    true,
  );
  return (
    <div className="flex flex-col">
      <div className="flex items-center gap-2 p-4">
        <ImageView src={user?.[0]?.avatar} dimensions="40px" />
        <h2 className="font-semibold">{user?.[0]?.name}</h2>
      </div>
      <div className={`flex flex-1 flex-col justify-between rounded-md  ${isDarkMode ? "bg-[#8c8c8c]" : "bg-[#cbcff9]"} p-3`}>
        <MessageDrawer
          isPending={isPending}
          chats={chats}
          receiverId={receiverId}
          senderId={senderId.id.toString()}
        />
        {friendReqStatus?.status === "ACCEPTED" && (
          <ReplyInput receiverId={pathname.split("/").at(-1)} />
        )}
      </div>
    </div>
  );
}

export default ChatScreen;