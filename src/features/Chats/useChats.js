import { useQuery } from "@tanstack/react-query";
import { getChatsOfSpecificUser } from "../../services/apiChats";

export default function useChats(receiverId, senderId) {
  const {
    isPending,
    data: chats,
    error,
    refetch,
  } = useQuery({
    queryKey: ["chats", receiverId],
    queryFn: () => getChatsOfSpecificUser(receiverId, senderId),
  });

  return { isPending, chats, error, refetch };
}