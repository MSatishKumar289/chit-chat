import { getUserById } from "../services/apiAuth";
import avatar from "../assets/avatar.png";

export const sendNotification = (payload) => {
  console.log("payload: ", payload);
  getUserById(payload.new.senderId, "userId").then((res) => {
    console.log("res: ", res);
    if ("Notification" in window && Notification.permission === "granted") {
      new Notification(res[0].name, {
        body: payload.new.message,
        avatar: avatar,
      });
    }
  });
};