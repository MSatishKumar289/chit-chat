import { useMutation, useQueryClient } from "@tanstack/react-query";
import { sendFriendRequest } from "../../services/apiFriendRequest";
import toast from "react-hot-toast";

function useSendFriendRequest() {
  const queryClient = useQueryClient();
  const { mutate: sendFriendRequestFn, isPending: updatingStatus } =
    useMutation({
      mutationFn: ({ requestid, receiverId, senderId }) =>
        sendFriendRequest(requestid, receiverId, senderId),
      onSuccess: (data) => {
        console.log(data);
        toast.success("Friend Request Successfully sent.");
        queryClient.invalidateQueries({
          queryKey: ["friend_requets"],
        });
      },
      onError: (error) =>
        toast.error("Friend Request could not be sent: ", error.message),
    });

  return { sendFriendRequestFn, updatingStatus };
}

export default useSendFriendRequest;