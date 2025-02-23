import InputWrapper from "../../ui/InputWrapper";
import { useForm } from "react-hook-form";
import { useLogin } from "./useLogin";
import SpinnerMini from "../../ui/SpinnerMini";
import toast from "react-hot-toast";

function Login({ setisLogin }) {
  const { register, handleSubmit, reset, resetField, formState } = useForm({
    defaultValues: {
      email: "msatish@gmail.com",
      password: "123456",
    },
  });
  const { loginFuntion, isPending: isLoading } = useLogin();
  const { errors } = formState;
  function onSubmit({ email, password }) {
    // console.log("data: ", email, password);
    loginFuntion(
      { email, password },
      {
        onSuccess: () => {
          reset();
          toast.success(" Successfully Logged in. ");
        },
        onError: () => resetField("password"),
      },
    );
  }
  function onError(error) {
    toast.error(error);
  }
  return (
    <div className="flex flex-col items-center justify-center gap-3">
      <h1 className="text-xl">Login to ChitChat</h1>
      <form
        onSubmit={handleSubmit(onSubmit, onError)}
        className="flex w-full flex-col items-center justify-center gap-3"
      >
        <InputWrapper inputLabel="Email" error={errors?.email?.message}>
          <input
            type="email"
            label="email"
            className={`min-h-10 w-full rounded-[5px] border-2 ${errors?.email?.message ? `border-[#fe0303] focus:border-[#fe0303]` : `border-[#a3a3a3]`} indent-2 text-sm`}
            placeholder="Email"
            disabled={isLoading}
            {...register("email", {
              required: "Please enter your registered email",
            })}
          />
        </InputWrapper>
        <InputWrapper inputLabel="Password" error={errors?.password?.message}>
          <input
            type="password"
            label="password"
            className={`min-h-10 w-full rounded-[5px] border-2 ${errors?.password?.message ? `border-[#fe0303] focus:border-[#fe0303]` : `border-[#a3a3a3]`} indent-2 text-sm`}
            placeholder="Password"
            disabled={isLoading}
            {...register("password", {
              required: "Please enter the Password",
            })}
          />
        </InputWrapper>
        <div className="mt-2 flex w-9/12 items-center justify-center gap-2">
          <button
            disabled={isLoading}
            className="flex min-h-10 w-2/4 items-center justify-center rounded-md bg-[#5777f6] text-white"
          >
            {!isLoading ? `Login` : <SpinnerMini />}
          </button>
        </div>
      </form>
      <p>
        Don&apos;t have an account? Click here to{" "}
        <button
          className="text-blue-800 underline"
          onClick={() => setisLogin("register")}
        >
          Sign In
        </button>
      </p>
      {/* <AppButton
        label={"Register"}
        type="Secondary"
        iconRight
        onClick={() => setisLogin("register")}
      /> */}
    </div>
  );
}

export default Login;