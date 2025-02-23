import SearchInput from "../../ui/SearchInput";
import Spinner from "../../ui/Spinner";
import useChatList from "./useChatList";
import { useUser } from "../LoginRegister/useUser";
import { useState } from "react";
import useUserByNameEmail from "./useUserByNameEmail";
import ChatDrawType from "./ChatDrawType";
import useRealtimeChatsSubscription from "../../hooks/useRealtimeChatsSubscription";

function UserChatsDrawer() {
  const { user } = useUser();
  const { isPending, chats, refetch } = useChatList(user);
  const [searchinput, setSearchInput] = useState("");
  const [showSearchResult, setShowSearchResult] = useState(false);
  // Calling Chat realtime db check for any change
  useRealtimeChatsSubscription("chats", refetch, "chat-drawer");
  // console.log("chats: ", chats);
  const {
    user: userSearchResult,
    refetch: refetchChatList,
    isFetching,
  } = useUserByNameEmail(searchinput, false);
  return (
    <>
      <div className="relative flex flex-col gap-3 overflow-auto py-3">
        <SearchInput
          searchinput={searchinput}
          setSearchInput={setSearchInput}
          refetch={refetchChatList}
          showSearchResult={showSearchResult}
          setShowSearchResult={setShowSearchResult}
        />
        {isPending ? (
          <Spinner />
        ) : (
          <section className="flex flex-col gap-3 overflow-auto py-3">
            {showSearchResult ? (
              <>
                {isFetching ? (
                  <Spinner />
                ) : (
                  <>
                    {!userSearchResult ? (
                      <NoDataAvailable />
                    ) : (
                      <>
                        {userSearchResult.map((item) => (
                          <ChatDrawType
                            searchResult={showSearchResult}
                            key={item.id}
                            message={item}
                            currentUser={user}
                          />
                        ))}
                      </>
                    )}
                  </>
                )}
              </>
            ) : (
              <>
                {!chats.length > 0 ? (
                  "No Chats Available."
                ) : (
                  <>
                    {chats.map((chat) => (
                      <ChatDrawType
                        key={chat.id}
                        message={chat}
                        currentUser={user}
                      />
                    ))}
                  </>
                )}
              </>
            )}
          </section>
        )}
      </div>
    </>
  );
  
}
export default UserChatsDrawer;

const NoDataAvailable = () => {
  return <p>No Results found</p>;
};