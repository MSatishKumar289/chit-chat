import { useMutation, useQueryClient } from "@tanstack/react-query";
import { login as loginApi } from "../../services/apiAuth";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export function useLogin() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { mutate: loginFuntion, isPending } = useMutation({
    mutationFn: ({ email, password }) => loginApi({ email, password }),
    onSuccess: (user) => {
      // console.log("user from useLogin : ", user.user);
      queryClient.setQueryData(["user", user.user]);
      navigate("/chat", { replace: true });
    },
    onError: (err) => toast.error(err.message),
  });

  return { loginFuntion, isPending };
}