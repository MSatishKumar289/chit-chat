function NoChatSelected() {
    return (
      <div className="flex flex-col">
        <div className="flex flex-1 flex-col items-center justify-center rounded-md bg-[#e2e4f6] p-3">
          <div
            style={{ height: "calc(100vh - 172px)" }}
            className="scrollViewHide mb-3 flex w-1/2 flex-col-reverse items-center justify-center gap-4 overflow-auto text-center"
          >
            Please Select a chat from the drawer. If no chats then search for a
            user name and Start Chit-Chatting...
          </div>
        </div>
      </div>
    );
  }
  
  export default NoChatSelected;
  // function ChatScreen() {
  //   const { pathname } = useLocation();
  //   const { user: senderId } = useUser();
  //   const receiverId = pathname.split("/").at(-1);
  //   const { isPending, chats } = useChats(receiverId, senderId);
  //   // const isEnabled = true;
  //   const { user } = useUserByIdNameEmail(receiverId?.toString(), "userId", true);
  //   console.log("user?.avatar: ", user?.avatar);
  //   console.log("user?.name: ", user?.name);
  //   console.log("receiverId: ", receiverId);
  //   return (
  //     <div className="flex flex-col">
  //       <div className="flex items-center gap-2 p-4">
  //         <ImageView src={user?.[0]?.avatar} dimensions="40px" />
  //         <h2 className="font-semibold">{user?.[0]?.name}</h2>
  //       </div>
  //       <div className="flex flex-1 flex-col justify-between rounded-md bg-[#e2e4f6] p-3">
  //         <MessageDrawer isPending={isPending} chats={chats} />
  //         <ReplyInput receiverId={pathname.split("/").at(-1)} />
  //       </div>
  //     </div>
  //   );
  // }
  // export default ChatScreen;