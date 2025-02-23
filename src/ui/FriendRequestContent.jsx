import { BsSendExclamationFill } from "react-icons/bs";
import AppButton from "./AppButton";
import Spinner from "./Spinner";
import { useUser } from "../features/LoginRegister/useUser";
import { useEffect, useState } from "react";

function FriendRequestContent({
  friendReqStatus,
  handleSendFriendRequest,
  handleAcceptFriendRequest,
  handleRejectedFriendRequest,
  updatingStatus,
}) {
  const [friendRequestSent, setfriendRequestSent] = useState(false);
  const { user } = useUser();
  let senderId = "";
  if (friendReqStatus != null) ({ senderId } = friendReqStatus);

  useEffect(() => {
    if (senderId === user.id.toString()) {
      setfriendRequestSent(true);
    }
  }, [senderId, user]);

  return (
    <>
      {updatingStatus && <Spinner />}
      {!updatingStatus && (
        <>
          {friendReqStatus?.status === "PENDING" && friendRequestSent && (
            <div className="flex flex-col gap-2">
              <p className="flex gap-2 text-[20px]">
                Request Sent <BsSendExclamationFill size={30} color="#cc3300" />
              </p>
            </div>
          )}
          {friendReqStatus?.status === "PENDING" && !friendRequestSent && (
            <div className="flex flex-col gap-2 text-center">
              <div>
                <p>You received a Friend Request.</p>
                <p>Do you want to proceed?</p>
              </div>
              <section className="flex justify-center gap-2">
                <AppButton
                  isDisabled={updatingStatus}
                  label={"ACCEPT"}
                  width={"w-1/2"}
                  stylingButton={"bg-green-600 text-white"}
                  buttonBgColor="bg-green-600"
                  buttonBorderColor="border-green-600"
                  buttonTextColor="text-[#fff]"
                  onClick={handleAcceptFriendRequest}
                />
                <AppButton
                  label={"REJECT"}
                  type="Secondary"
                  width={"w-1/2"}
                  buttonBgColor_Sec="bg-[#d14249]"
                  buttonBorderColor_Sec="border-[#d14249]"
                  buttonTextColor_Sec="text-white"
                  onClick={handleRejectedFriendRequest}
                />
              </section>
            </div>
          )}

          {friendReqStatus?.status !== "PENDING" && (
            <div className="flex flex-col gap-2">
              <p>Do you want to send a friend Request?</p>
              <section className="flex justify-center gap-2">
                <AppButton
                  isDisabled={updatingStatus}
                  label={"Yes"}
                  width={"w-1/2"}
                  onClick={handleSendFriendRequest}
                />
                {/* <AppButton label={"No"} type="Secondary" width={"w-1/2"} /> */}
              </section>
            </div>
          )}
        </>
      )}
    </>
  );
}

export default FriendRequestContent;
