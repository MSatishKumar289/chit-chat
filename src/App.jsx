import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import Error from "./ui/Error";
import Chat from "./pages/Chat";
import AppLayout from "./ui/AppLayout";
import UserInfo from "./pages/UserInfo";
import FriendsList from "./pages/FriendsList";
import ChatLayout from "./ui/ChatLayout";
import SecuredRoute from "./ui/SecuredRoute";
import LoginRegister from "./pages/LoginRegister";
import { Toaster } from "react-hot-toast";
import SecuredLogin from "./ui/SecuredLogin";
import NoChatSelected from "./features/Chats/NoChatSelected";
import { DarkModeProvider } from "./context/DarkModeContext";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // staleTime: 60 * 1000,
      staleTime: "infinity",
      gcTime: 0,
    },
  },
});
const router = createBrowserRouter([
  {
    path: "*",
    element: (
      <SecuredLogin>
        <LoginRegister />
      </SecuredLogin>
    ),
  },
  {
    element: (
      <SecuredRoute>
        <AppLayout />
      </SecuredRoute>
    ),
    errorElement: <Error />,
    children: [
      {
        path: "/chat",
        element: <ChatLayout />,
        children: [
          {
            path: "/chat/:chatId",
            element: <Chat />,
            //loader: chatLoader,
          },
          {
            path: "/chat/search/:searchTerm",
            element: <NoChatSelected />,
            //loader: chatLoader,
          },
        ],
      },
      {
        path: "/userinfo",
        element: <UserInfo />,
      },
      {
        path: "/friends",
        element: <FriendsList />,
      },
    ],
  },
]);

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <DarkModeProvider>
        <ReactQueryDevtools />

        <Toaster
          position="top-center"
          gutter={12}
          containerStyle={{ margin: "8px" }}
          toastOptions={{
            success: { duration: 3000 },

            error: { duration: 5000 },

            style: {
              fontSize: "16px",

              maxWidth: "500px",
            },
          }}
        />

        <RouterProvider router={router} />
      </DarkModeProvider>
    </QueryClientProvider>
  );
}

export default App;
