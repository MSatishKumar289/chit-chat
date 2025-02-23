"use Strict";
import { useCallback, useEffect } from "react";
import { sendNotification } from "../utils/sendNotification";

function useNotificationPermission() {
  const requestNotificationPermission = useCallback(() => {
    if ("Notification" in window) {
      Notification.requestPermission().then(function (permission) {
        if (permission === "granted") {
          // console.log("Notification Permission Granted...");
          // sendNotification();
        }
      });
    }
  }, []);
  useEffect(() => {
    if ("Notification" in window) {
      requestNotificationPermission();
    }
  }, [requestNotificationPermission]);
  return { sendNotification };
}
export default useNotificationPermission;