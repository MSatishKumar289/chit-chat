import { useQuery } from "@tanstack/react-query";
import { getAllFriends } from "../../services/apiFriendRequest";

function useAllFriends(senderId) {
  const {
    data: allFriendsList,
    isPending,
    error,
  } = useQuery({
    queryKey: ["allfriends"],
    queryFn: () => getAllFriends(senderId),
  });
  return { allFriendsList, isPending, error };
}

export default useAllFriends;