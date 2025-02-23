import { useNavigate, useRouteError } from "react-router-dom";

function Error() {
  const navigate = useNavigate();
  const error = useRouteError();

  return (
    <div className="container">
      <h1>Something went wrong</h1>
      <h4>{error.data || error.message}</h4>
      <button onClick={() => navigate(-1)}>Go Back</button>
    </div>
  );
}

export default Error;
