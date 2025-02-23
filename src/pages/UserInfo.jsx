import { useState } from "react";
import { useUser } from "../features/LoginRegister/useUser";
import UserCard from "../features/UserInfo/UserCard";
import LabelInput from "../ui/LabelInput";
import { useUpdateUser } from "../features/UserInfo/useUpdateUser";
import AppButton from "../ui/AppButton";
import toast from "react-hot-toast";
import { useDarkMode } from "../context/DarkModeContext";

function UserInfo() {
  const {isDarkMode} = useDarkMode();
  const {
    user: {
      email,
      user_metadata: { username: currentUserName },
    },
  } = useUser();
  const [userName, setUserName] = useState(currentUserName);
  const [enableEdit, setEnableEdit] = useState(false);
  const [avatar, setAvatar] = useState(null);
  const { updateUserFun, isPending } = useUpdateUser();
  function handleCancelUpdate() {
    setUserName(currentUserName);
    setAvatar(null);
    setEnableEdit(!enableEdit);
  }
  function handleUpdateFormSubmit() {
    if (userName === "") toast.error("username cannot be empty.");
    // if (userName === currentUserName) toast.error("No changes found.");
    console.log("hello: ", avatar, userName);
    if (userName !== currentUserName || avatar != null) {
      updateUserFun(
        { avatar, username: userName },
        {
          onSuccess: () => {
            setAvatar(null);
            setEnableEdit(!enableEdit);
          },
        },
      );
    }
  }
  return (
    <div className={`overflow-auto rounded-2xl ${isDarkMode ? "bg-[#8c8c8c]" : "bg-[#cbcff9]" }`}>
      {/* <p className="sticky top-0 z-50 flex min-h-32 items-center justify-start bg-white pl-6 text-[27px] font-semibold">
        Account Info
      </p> */}
      <div className="px-5 pt-6">
        <div className="flex h-[167px] w-full items-center justify-between">
          <UserCard />
          {!enableEdit && (
            <AppButton
            buttonBgColor_Sec={"bg-white"}
              label={"Edit"}
              type="Secondary"
              stylingButton={"px-10"}
              onClick={() => setEnableEdit(!enableEdit)}
            />
          )}
        </div>
        <div className="flex pt-8 mb-5">
          <div className="w-2/6">
            <p className="text-[17px]">Personal Info</p>
            <p className={`text-[12px] ${isDarkMode ? "text-white" : "text-slate-700" }`}>
              Update your photo and personal Details.
            </p>
          </div>
          <div className={`flex w-4/6 flex-col gap-5 rounded-md  ${isDarkMode ? "bg-[#666666]" : "bg-[#ffffff]" } p-4`}>
            <LabelInput
              label={"Email"}
              labelFont={"text-[12px]"}
              type={"text"}
              value={email}
              isDisabled={true}
              readOnly={true}
              onChange={(text) => console.log(text.target.value)}
            />
            <LabelInput
              label={"User Name"}
              labelFont={"text-[12px]"}
              type={"text"}
              value={userName}
              isDisabled={!enableEdit}
              onChange={(e) => setUserName(e.target.value)}
            />
            {enableEdit && (
              <LabelInput
                label={"Avatar"}
                type={"fileInput"}
                labelFont={"text-[12px]"}
                setAvatar={setAvatar}
                isDisabled={!enableEdit}
              />
            )}
            {enableEdit && (
              <div className="flex justify-end gap-3">
                <AppButton
                  label={"Cancel"}
                  width={"min-w-[150px]"}
                  stylingButton={" text-[14px]"}
                  onClick={handleCancelUpdate}
                  type="Secondary"
                />
                <AppButton
                  label={"Save"}
                  width={"min-w-[150px]"}
                  stylingButton={" text-[14px]"}
                  isDisabled={isPending}
                  onClick={handleUpdateFormSubmit}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserInfo;