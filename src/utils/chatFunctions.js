export function extractChatsOfSelectUser(chatId, chats) {
    const chatWithUserId = chats.filter((item) => item.receiverId === chatId);
    return chatWithUserId;
}