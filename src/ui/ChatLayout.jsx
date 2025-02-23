import { Outlet, useNavigate } from "react-router-dom";
import UserChatsDrawer from "../features/Chats/UserChatsDrawer";
import useChatList from "../features/Chats/useChatList";
import { useUser } from "../features/LoginRegister/useUser";
import { useEffect } from "react";
import { useDarkMode } from "../context/DarkModeContext";

function ChatLayout() {
    const { user } = useUser();
    const { isPending, chats } = useChatList(user);
    const receiverIdLatest =
        chats?.[0]?.receiverId === user.id.toString()
            ? chats?.[0]?.senderId
            : chats?.[0]?.receiverId;
    const navigate = useNavigate();
    // const currentPathName = useLocation();
    // const isChatActive = currentPathName.pathname.split("/").includes("chat");
    // console.log("isChatActive: ", isChatActive);

    useEffect(() => {
        if (receiverIdLatest != undefined && !isPending)
            navigate(`/chat/${receiverIdLatest}`);
    }, [receiverIdLatest, isPending, navigate]);

    const { isDarkMode } = useDarkMode();

    return (
        <div
            className={`ml-3 grid grid-cols-[2fr_5.2fr] gap-3 rounded-3xl ${isDarkMode ? "bg[#666666]" : "bg-white"} lg:grid-cols-[2fr_4.5fr] xl:grid-cols-[2fr_8fr]`}
        >
            <UserChatsDrawer />
            <Outlet />
        </div>
    );
}

export default ChatLayout;
