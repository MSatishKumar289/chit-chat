import { useNavigate } from "react-router-dom";
import { useUser } from "../features/LoginRegister/useUser";
import Spinner from "./Spinner";
import { useEffect } from "react";

function SecuredRoute({ children }) {
  const navigate = useNavigate();

  // 1. Load the authenticator user:
  const { isPending, isAuthenticated } = useUser();
  // console.log("isAuthenticated:", isAuthenticated);

  //2. if there is no authenticated user, redirect screen to LOGIN
  useEffect(() => {
    // console.log("SecuredRoute: ", isAuthenticated, isPending);
    if (!isAuthenticated && isPending == true) navigate("/login");
  }, [isAuthenticated, isPending, navigate]);

  // 3. While loading, show a spinner
  if (isPending) return <Spinner />;
  if (isAuthenticated) return children;
}

export default SecuredRoute;
