import { useQuery } from "@tanstack/react-query";
import { getUserByNameEmail } from "../../services/apiAuth";

function useUserByNameEmail(searchText, enabled = false) {
  const {
    data: user,
    isPending,
    refetch,
    isFetching,
  } = useQuery({
    queryKey: ["userByEmailName", searchText],
    queryFn: () => getUserByNameEmail(searchText),
    enabled: enabled,
  });
  return { user, isPending, refetch, isFetching };
}

export default useUserByNameEmail;
// useUserByIdNameEmail