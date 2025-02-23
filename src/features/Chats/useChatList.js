import { useQuery } from "@tanstack/react-query";
import { getChatsListOfCurrentUser } from "../../services/apiChats";

export default function useChatList(user) {
  const {
    isPending,
    data: chats,
    error,
    refetch,
  } = useQuery({
    queryKey: ["chats"],
    queryFn: () => getChatsListOfCurrentUser(user),
  });
  
  return { isPending, chats, error, refetch };
}