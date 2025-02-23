import { NavLink } from "react-router-dom";
import MessageCard from "./MessageCard";
import ImageView from "../../ui/ImageView";

function ChatDrawType({ searchResult = false, message, currentUser }) {
  return searchResult ? (
    <NavLink
      to={`/chat/${message.userId}`}
      className={({ isPending, isActive }) => {
        return isPending
          ? "flex items-center gap-2 rounded-md bg-[#eaecfb] p-3"
          : isActive
            ? "acitiveTab flex items-center gap-2 rounded-md bg-[#6c88f4] p-3 text-[#ffffff]"
            : "flex items-center gap-2 rounded-md bg-[#eaecfb] p-3";
      }}
    >
      <section>
        <ImageView src={message.avatar} dimensions={"40px"} />
      </section>
      <section className="items-center gap-2">
        <p className="text-md font-semibold">{message.name}</p>
        <p className="messageText text-[10px] text-gray-500">{message.email}</p>
      </section>
    </NavLink>
  ) : (
    <MessageCard message={message} currentUser={currentUser} />
  );
}

export default ChatDrawType;