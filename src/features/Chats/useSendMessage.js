import { useMutation, useQueryClient } from "@tanstack/react-query";
import { sendMessageToChats } from "../../services/apiChats";

function useSendMessage() {
  const queryClient = useQueryClient();
  const { mutate: sendMessage, isPending: isSending } = useMutation({
    mutationFn: ({ message, chatId, senderId, receiverId }) =>
      // console.log({ message, chatId, senderId, receiverid }),
      sendMessageToChats(message, chatId, senderId, receiverId),
    onSuccess: () => {
      console.log("Message Sent.");
      queryClient.invalidateQueries({
        queryKey: ["chats"],
      });
    },
    onError: (err) => console.error(err),
  });

  return { sendMessage, isSending };
}

export default useSendMessage;