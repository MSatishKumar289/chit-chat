import { useState } from "react";
import ImagePreview from "./ImagePreview";
import DragDropFile from "./DragDropFile";

function LabelInput({
  inputBlockStyle = "",
  label,
  labelInline,
  type,
  isDisabled,
  onChange,
  labelFont,
  value,
  setAvatar,
  readOnly = false,
}) {
  const [avatarUrl, setAvatarUrl] = useState(null);
  return (
    <div
      className={`${inputBlockStyle} ${labelInline ? "flex gap-3" : "block"}`}
    >
      {type !== "fileInput" ? (
        <>
          <label className={`${labelFont}`}>{label}</label>
          <input
            type={type}
            className={`min-h-10 w-full rounded-[5px] ${readOnly ? "border-none" : "border-2"} indent-2 text-sm text-black`}
            placeholder={
              label === "email"
                ? "John Doe"
                : label === "User Name"
                  ? "John Doe"
                  : label === "Password"
                    ? "Your password"
                    : ""
            }
            disabled={isDisabled}
            onChange={onChange}
            value={value}
          />
        </>
      ) : (
        <>
          <p className={`${labelFont}`}>{label}</p>
          {!avatarUrl && (
            <DragDropFile
              isDisabled={isDisabled}
              setAvatar={setAvatar}
              setAvatarUrl={setAvatarUrl}
            />
          )}
          {avatarUrl && (
            <div className="mt-4 flex gap-2">
              <div className="flex items-center justify-center gap-2 rounded-sm py-1 text-white">
                <ImagePreview
                  deletable={true}
                  avatarUrl={avatarUrl}
                  setAvatarUrl={setAvatarUrl}
                  setAvatar={setAvatar}
                />
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default LabelInput;
