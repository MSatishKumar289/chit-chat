import { useQuery } from "@tanstack/react-query";
import { getUserById } from "../../services/apiAuth";

function useUserById(receiverId, senderId, userId, enabled = false) {
  const {
    data: user,
    isPending,
    refetch,
  } = useQuery({
    queryKey: ["userById", receiverId],
    queryFn: () => getUserById(receiverId, userId),
    enabled: enabled,
    gcTime: 0,
    staleTime: 0,
  });
  return { user, isPending, refetch };
}

export default useUserById;
// useUserByIdNameEmail