import { useMutation, useQueryClient } from "@tanstack/react-query";
import { signin } from "../../services/apiAuth";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export function useSignIn() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { mutate: signInUser, isPending } = useMutation({
    mutationFn: ({ email, password, username }) =>
      signin({ email, password, username }),
    onSuccess: (user) => {
      queryClient.setQueryData(["user", user.user]);
      navigate("/chat", { replace: true });
    },
    onError: (err) => toast.error(err.message),
  });
  
  return { signInUser, isPending };
}