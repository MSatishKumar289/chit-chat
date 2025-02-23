import { useMutation, useQueryClient } from "@tanstack/react-query";
import { acceptRejectFriendRequest } from "../../services/apiFriendRequest";

function useAcceptRejectRequest() {
  const queryClient = useQueryClient();
  const { mutate: updateFriendRequest, isPending: updatingFRStatus } =
    useMutation({
      mutationFn: ({ requestId, requestStatus }) =>
        acceptRejectFriendRequest(requestId, requestStatus),
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ["friend_requets"],
        });
      },
    });
  return { updateFriendRequest, updatingFRStatus };
}

export default useAcceptRejectRequest;