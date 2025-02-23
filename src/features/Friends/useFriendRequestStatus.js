import { useQuery } from "@tanstack/react-query";
import { getFriendRequestStatus } from "../../services/apiFriendRequest";

function useFriendRequestStatus(receiverId, senderId) {
  const {
    data: friendReqStatus,
    isPending,
    error,
    refetch,
  } = useQuery({
    queryKey: ["friend_requets", receiverId],
    queryFn: () => getFriendRequestStatus(receiverId, senderId),
    staleTime: 0,
  });

  return { friendReqStatus, isPending, error, refetch };
}

export default useFriendRequestStatus;