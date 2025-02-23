import InputWrapper from "../../ui/InputWrapper";
import { useForm } from "react-hook-form";
import { useSignIn } from "./useSignIn";
import toast from "react-hot-toast";
import SpinnerMini from "../../ui/SpinnerMini";

function Register({ setisLogin }) {
  const { register, handleSubmit, reset, getValues, formState } = useForm({
    defaultValues: {
      username: "Satish",
      password: "123456",
      confirmpassword: "123456",
    },
  });
  const { signInUser, isPending } = useSignIn();
  const { errors } = formState;
  function onSubmit({ email, password, username }) {
    signInUser(
      { email, password, username },
      {
        onSuccess: () => {
          reset();
          toast.success(" You have Successfully registered ");
        },
        onError: () => reset(),
      },
    );
  }
  function onError(error) {
    console.log("error: ", error);
  }
  return (
    <div className="flex flex-col items-center justify-center gap-3">
      <h1 className="text-xl">Login to ChitChat</h1>
      <form
        onSubmit={handleSubmit(onSubmit, onError)}
        className="flex w-full flex-col items-center justify-center gap-3"
      >
        <InputWrapper inputLabel="User Name" error={errors?.username?.message}>
          <input
            type="text"
            label="username"
            className={`min-h-10 w-full rounded-[5px] border-2 ${errors?.username?.message ? `border-[#fe0303] focus:border-[#fe0303]` : `border-[#a3a3a3]`} indent-2 text-sm`}
            placeholder="John Doe"
            disabled={isPending}
            {...register("username", {
              required: "Please enter an username",
            })}
          />
        </InputWrapper>
        <InputWrapper inputLabel="Email" error={errors?.email?.message}>
          <input
            type="email"
            label="email"
            disabled={isPending}
            className={`min-h-10 w-full rounded-[5px] border-2 ${errors?.email?.message ? `border-[#fe0303] focus:border-[#fe0303]` : `border-[#a3a3a3]`} indent-2 text-sm`}
            placeholder="Email"
            {...register("email", {
              required: "Email is required field",
            })}
          />
        </InputWrapper>
        <InputWrapper inputLabel="Password" error={errors?.password?.message}>
          <input
            type="password"
            label="password"
            disabled={isPending}
            className={`min-h-10 w-full rounded-[5px] border-2 ${errors?.password?.message ? `border-[#fe0303] focus:border-[#fe0303]` : `border-[#a3a3a3]`} indent-2 text-sm`}
            placeholder="Password"
            {...register("password", {
              required: "Password is required field",
            })}
          />
        </InputWrapper>
        <InputWrapper
          inputLabel="Confirm-Password"
          error={errors?.confirmpassword?.message}
        >
          <input
            type="password"
            label="confirmassword"
            disabled={isPending}
            className={`min-h-10 w-full rounded-[5px] border-2 ${errors?.confirmpassword?.message ? `border-[#fe0303] focus:border-[#fe0303]` : `border-[#a3a3a3]`} indent-2 text-sm`}
            placeholder="Confirm-Password"
            {...register("confirmpassword", {
              required: "Confirm Password is required field",
              validate: (value) => {
                return (
                  value === getValues().password || "Pasword does not match"
                );
              },
            })}
          />
        </InputWrapper>
        <div className="mt-2 flex w-9/12 items-center justify-center gap-2">
          <button
            disabled={isPending}
            className="flex min-h-10 w-2/4 items-center justify-center rounded-md bg-[#5777f6] text-white"
          >
            {!isPending ? `Sign In` : <SpinnerMini />}
          </button>{" "}
        </div>
      </form>
      {/* <AppButton label={"Login"} iconLeft onClick={() => setisLogin("login")} /> */}
      <p>
        Already have an account? Click here to{" "}
        <button
          className="text-blue-800 underline"
          onClick={() => setisLogin("login")}
        >
          Log In
        </button>
      </p>
    </div>
  );
}

export default Register;