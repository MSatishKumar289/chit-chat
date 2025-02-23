import supabase from "./supabase";

export async function getChatsOfSpecificUser(receiverId, senderId) {
  const senderIdString = senderId.id.toString();
  let { data, error } = await supabase
    .from("chats")
    .select(
      `
      *,
        from:users!chats_senderId_fkey(name, avatar, userId),
        to:users!chats_receiverId_fkey(name, avatar, userId)
      `,
    )
    .or(
      `and(senderId.eq.${senderIdString}, receiverId.eq.${receiverId}), and(senderId.eq.${receiverId}, receiverId.eq.${senderIdString})`,
    )
    .order("created_at", { ascending: false });
  if (error) {
    console.error(error);
    throw new Error("Chats could not be loaded...");
  }
  return data;
}

export async function getChatsListOfCurrentUser(user) {
  // console.log("Check:", user.id);
  let { data, error } = await supabase
    .from("chats")
    .select(
      `
      *,
        from:users!chats_senderId_fkey(name, avatar),
        to:users!chats_receiverId_fkey(name, avatar)
      `,
    )
    // .eq("senderId", user.id);
    .or(`and(senderId.eq.${user.id}), and(receiverId.eq.${user.id})`);
  // .eq("senderId", "48a25d39-f3b4-49f4-895f-bf700e78ddc1");
  if (error) {
    console.error(error);
    throw new Error("Chats could not be fetched...");
  }
  const checking = data.reverse();
  let receiverIdList = [];
  const filteredData = checking.filter((chat) => {
    if (chat.receiverId === user.id.toString()) {
      if (receiverIdList.includes(chat.senderId) != true) {
        receiverIdList.push(chat.senderId);
        return chat;
      }
    } else if (chat.senderId === user.id.toString()) {
      if (receiverIdList.includes(chat.receiverId) != true) {
        receiverIdList.push(chat.receiverId);
        return chat;
      }
    }
  });
  return filteredData;
}

export async function sendMessageToChats(
  message,
  chatId,
  senderId,
  receiverId,
) {
  const { data, error } = await supabase
    .from("chats")
    .insert([{ message, senderId, receiverId }]);
  if (error) {
    console.error(error);
    throw new Error("Message could not be sent...");
  }
  return data;
}