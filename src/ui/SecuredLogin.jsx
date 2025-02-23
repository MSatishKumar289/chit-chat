import { useNavigate } from "react-router-dom";
import { useUser } from "../features/LoginRegister/useUser";
import Spinner from "./Spinner";
import { useEffect } from "react";

function SecuredLogin({ children }) {
  const navigate = useNavigate();

  // 1. Load the authenticator user:
  const { isPending, isAuthenticated } = useUser();
  // console.log("isAuthenticated:", isAuthenticated);


  //2. if there is no authenticated user, redirect screen to LOGIN
  useEffect(() => {
    // console.log("SecuredLogin: ", isAuthenticated, isPending);
    if (isAuthenticated) navigate("/chat");
  }, [isAuthenticated, isPending, navigate]);


  // 3. While loading, show a spinner
  if (isPending) return <Spinner />;
  if (!isAuthenticated && !isPending) return children;
}

export default SecuredLogin;
