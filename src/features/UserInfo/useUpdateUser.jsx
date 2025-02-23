import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateUser } from "../../services/apiAuth";
import toast from "react-hot-toast";

export function useUpdateUser() {
  const queryClient = useQueryClient();
  const { mutate: updateUserFun, isPending } = useMutation({
    mutationFn: ({ username, avatar, password }) =>
      updateUser({ username, avatar, password }),
    onSuccess: (user) => {
      toast.success("Successfuly updated.");
      queryClient.invalidateQueries({
        queryClient: ["user"],
      });
      console.log(user.user.user_metadata);
    },
    onError: (error) => toast.error(error.message),
  });
  
  return { updateUserFun, isPending };
}