import { useDarkMode } from "../../context/DarkModeContext";
import { useUser } from "../LoginRegister/useUser";

function MessageButtble({ messageItem }) {
  const { user } = useUser();
  const {isDarkMode} = useDarkMode();
  const sender = messageItem.senderId === user.id;
  let classValue =
    `flex min-h-[30px] items-center self-end rounded-xl rounded-br-none min-w-[75%] max-w-[85%] ${isDarkMode ? "bg-[#008502]" : "bg-[#6c88f4]"} px-3 text-sm text-white py-3`;
  if (!sender)
    classValue =
      `flex min-h-[30px] items-center self-start rounded-xl min-w-[75%] max-w-[85%] rounded-bl-none ${isDarkMode ? "bg-[#3e3f40]  text-white" : "bg-white"}  px-3 text-sm text-black py-3`;
  return <p className={classValue}>{messageItem.message}</p>;
}

export default MessageButtble;