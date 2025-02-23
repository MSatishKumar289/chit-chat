import { HiXCircle } from "react-icons/hi";
import ImageView from "./ImageView";

function ImagePreview({
  deletable = false,
  avatarUrl,
  setAvatarUrl,
  setAvatar,
}) {
  return (
    <div className="relative">
      <ImageView src={avatarUrl} dimensions="100px" />
      {deletable && (
        <button
          className="absolute right-[-15px] top-[-15px] z-20"
          onClick={() => {
            setAvatarUrl(null);

            setAvatar(null);
          }}
        >
          <HiXCircle size={40} color={"#000"} />
        </button>
      )}
    </div>
  );
}

export default ImagePreview;
