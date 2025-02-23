import SpinnerMini from "./SpinnerMini";

function AppButton({
  label,
  type = "Primary",
  isDisabled = false,
  onClick,
  width,
  stylingButton,
  buttonBgColor = "bg-[#5777f6]",
  buttonBgColor_Sec = "#fff",
  buttonBorderColor = "border-[#5777f6]",
  buttonBorderColor_Sec = "border-[#5777f6]",
  buttonTextColor = "text-[#fff]",
  buttonTextColor_Sec = "text-[#5777f6]",
}) {
  const classType =
    type === "Secondary"
      ? `min-h-10 ${width} rounded-md border-2 ${buttonBorderColor_Sec} ${buttonBgColor_Sec} ${buttonTextColor_Sec} flex justify-center items-center ${stylingButton}`
      : `min-h-10 ${width} ${stylingButton} rounded-md ${buttonBgColor} border-2 ${buttonBorderColor} ${buttonTextColor} text-white flex justify-center items-center`;

  return (
    <button className={classType} onClick={onClick}>
      {!isDisabled ? `${label}` : <SpinnerMini />}
    </button>
  );
}

export default AppButton;
