import { NavLink } from "react-router-dom";
import ImageView from "../../ui/ImageView";

function MessageCard({ message, currentUser }) {
  const messageCardData =
    currentUser.id === message.senderId
      ? {
          receiverId: message.receiverId,
          avatar: message.to.avatar,
          name: message.to.name,
          message: message.message,
        }
      : {
          receiverId: message.senderId,
          avatar: message.from.avatar,
          name: message.from.name,
          message: message.message,
        };
  // console.log(messageCardData);
  return (
    <NavLink
      to={`/chat/${messageCardData.receiverId}`}
      className={({ isPending, isActive }) => {
        return isPending
          ? "flex items-center gap-2 rounded-md bg-[#eaecfb] p-3"
          : isActive
            ? "acitiveTab flex items-center gap-2 rounded-md bg-[#6c88f4] p-3 text-[#ffffff]"
            : "flex items-center gap-2 rounded-md bg-[#eaecfb] p-3";
      }}
    >
      <section>
        <ImageView src={messageCardData.avatar} dimensions={"40px"} />
      </section>
      <section className="items-center gap-2">
        <p className="text-md font-semibold">{messageCardData.name}</p>
        <p className="messageText text-[10px] text-gray-500">
          {messageCardData.message}
        </p>
      </section>
    </NavLink>
  );
}

export default MessageCard;