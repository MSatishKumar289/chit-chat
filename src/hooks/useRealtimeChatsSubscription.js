import { useEffect } from "react";
import supabase from "../services/supabase";
import { useUser } from "../features/LoginRegister/useUser";
import useNotificationPermission from "./useNotificationPermission";
import messageSound from "../assets/notification_chitchat.mp3";

function useRealtimeChatsSubscription(
  tableName,
  refetch,
  channelValue = "schema-db-changes",
) {
  const { sendNotification } = useNotificationPermission();
  const { user } = useUser();
  useEffect(() => {
    const sound = new Audio(messageSound);
    sound.muted = false;
    const channel = supabase
      .channel(channelValue)
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: tableName },
        (payload) => {
          // console.log("Change received:", payload);
          if (
            tableName === "chats" &&
            payload.eventType === "INSERT" &&
            payload.new.receiverId === user.id.toString() &&
            !document.hasFocus()
          ) {
            console.log("Unaku than da msg vandu iruku");
            // navigator.mediaDevices
            //   .getUserMedia({ audio: true })
            //   .then(function () {
            //     sound.play();
            //   })
            //   .catch(function (err) {
            //     console.error("Error accessing microphone:", err);
            //   });
            sendNotification(payload);
          }
          refetch();
        },
      )
      .subscribe();
    return () => {
      channel.unsubscribe();
    };
  }, [refetch, tableName, channelValue, sendNotification, user.id]);
}
export default useRealtimeChatsSubscription;