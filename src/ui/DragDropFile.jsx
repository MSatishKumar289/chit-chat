import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { HiOutlineCloudUpload } from "react-icons/hi";

function DragDropFile({ isDisabled, setAvatar, setAvatarUrl }) {
  const onDrop = useCallback(
    (acceptedFiles) => {
      if (acceptedFiles[0] !== "") {
        setAvatar(acceptedFiles[0]);

        if (acceptedFiles[0] !== "") {
          const cachedUrl = URL.createObjectURL(acceptedFiles[0]);

          setAvatarUrl(cachedUrl);
        }
      } else console.log("Empty file path found.");
    },

    [setAvatar, setAvatarUrl],
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
  });

  return (
    <div
      className={`min-h-10 w-full rounded-[5px] border-2 indent-2 text-sm hover:border-[#6d87f3] hover:bg-slate-100 focus:border-[#6d87f3] ${isDragActive && "border-[#6d87f3] bg-slate-100"}`}
      {...getRootProps()}
    >
      <label
        className="flex min-h-32 w-full flex-col items-center justify-center bg-white text-black"
        htmlFor="fieldId"
      >
        <span
          className={`rounded-full ${isDragActive ? "bg-white" : "bg-slate-100"} p-3`}
        >
          <HiOutlineCloudUpload size={26} color="#6d87f3" />
        </span>
        {isDragActive ? (
          <h2 className="text-[12px] font-semibold">
            <span className="text-[#6d87f3]">Drop the file here...</span>
          </h2>
        ) : (
          <>
            <h2 className="text-[12px] font-semibold">
              <span className="text-[#6d87f3]">Click to upload</span> or drag
              and drop
            </h2>

            <h2 className="text-[12px] text-slate-700">SVG, PNG, JPG or GIF</h2>
          </>
        )}
      </label>

      <input
        type="file"
        id="fieldId"
        accept="image/*"
        className={`hidden min-h-10 w-full rounded-[5px] border-2 indent-2 text-sm`}
        disabled={isDisabled}
        {...getInputProps()}
      />
    </div>
  );
}

export default DragDropFile;
