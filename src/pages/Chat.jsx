import ChatScreen from "../features/Chats/ChatScreen";

function Chat() {
  return <ChatScreen />;
}

export default Chat;
// the below 2 lines of code comes inside the main func of this comp.
// const dataFromLoader = useLoaderData();
// console.log(dataFromLoader);
// export async function loader() {
//   const data = await testApi();
//   return data;
// }