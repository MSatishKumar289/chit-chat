import { useState } from "react";
import { IoMdSend } from "react-icons/io";
import useSendMessage from "./useSendMessage";
import { useUser } from "../LoginRegister/useUser";

function ReplyInput({ receiverId }) {
  const [message, setMesage] = useState("");
  const { user: senderId } = useUser();
  const { sendMessage, isSending } = useSendMessage();
  // const navigate = useNavigate();
  const handleSubmit = () => {
    if (message != "") {
      sendMessage(
        {
          message: message,
          senderId: senderId.id.toString(),
          receiverId: receiverId.toString(),
        },
        // {
        //   onSuccess: () => navigate(`chat/${receiverId.toString()}`),
        // },
      );
    }
    setMesage("");
  };
  return (
    <form className="flex gap-2" onSubmit={handleSubmit}>
      <input
        type="text"
        className="border-1 h-[30px] w-full rounded-lg border-[#c7c6c6] indent-3 text-sm"
        name="search_input"
        placeholder="Message..."
        value={message}
        onChange={(e) => setMesage(e.target.value)}
        disabled={isSending}
      />
      <button
        onClick={handleSubmit}
        disabled={message === ""}
        className="flex h-10 w-10 items-center justify-center rounded-md bg-[#6d87f3]"
      >
        <IoMdSend color="#fff" width={22} fontWeight={"bolder"} />
      </button>
    </form>
  );
}

export default ReplyInput;