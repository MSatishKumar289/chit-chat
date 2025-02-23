import useRealtimeChatsSubscription from "../../hooks/useRealtimeChatsSubscription";
import FriendRequestContent from "../../ui/FriendRequestContent";
import Spinner from "../../ui/Spinner";
import useAcceptRejectRequest from "../Friends/useAcceptRejectRequest";
import useFriendRequestStatus from "../Friends/useFriendRequestStatus";
import useSendFriendRequest from "../Friends/useSendFriendRequest";
import MessageButtble from "./MessageButtble";

function MessageDrawer({ isPending, chats, receiverId, senderId }) {
  const {
    isPending: fetchingStatus,
    friendReqStatus,
    refetch,
  } = useFriendRequestStatus(receiverId, senderId);
  // Checking if friend Requests Db has an y changes
  useRealtimeChatsSubscription(
    "friend_requests",
    refetch,
    "schema-friendRequest-changes",
  );
  const { sendFriendRequestFn, updatingStatus } = useSendFriendRequest();
  const { updateFriendRequest, updatingFRStatus } = useAcceptRejectRequest();
  let requestId = friendReqStatus?.id;
  return (
    <>
      {friendReqStatus?.status === "ACCEPTED" ? (
        <div
          style={{ height: "calc(100vh - 172px)" }} //172px
          className="scrollViewHide mb-3 flex flex-col-reverse gap-4 overflow-auto"
        >
          {!isPending && chats !== null && (
            <>
              {chats.reverse().map((item) => {
                return <MessageButtble key={item.id} messageItem={item} />;
              })}
            </>
          )}
        </div>
      ) : (
        <div
          style={{ height: "calc(100vh - 172px)" }}
          className="mb-3 flex w-full items-center justify-center gap-4"
        >
          {updatingStatus || fetchingStatus || updatingFRStatus ? (
            <Spinner />
          ) : (
            <FriendRequestContent
              friendReqStatus={friendReqStatus}
              receiverId={receiverId}
              senderId={senderId}
              handleSendFriendRequest={() => {
                sendFriendRequestFn({ requestId, receiverId, senderId });
              }}
              handleAcceptFriendRequest={() => {
                updateFriendRequest({ requestId, requestStatus: "ACCEPTED" });
              }}
              handleRejectedFriendRequest={() => {
                updateFriendRequest({ requestId, requestStatus: "REJECTED" });
              }}
              updatingStatus={fetchingStatus || updatingFRStatus}
            />
          )}
        </div>
      )}
    </>
  );
}

export default MessageDrawer;