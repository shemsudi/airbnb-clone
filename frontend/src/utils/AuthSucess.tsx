import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { jwtDecode } from "jwt-decode";
import setAuthToken from "../utils/setAuthToken";
import { setCredentials } from "../redux/AuthReducer";

const AuthSuccess = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const token = urlParams.get("token");

    if (token) {
      const decoded = jwtDecode(token);

      localStorage.setItem("jwtToken", token);
      setAuthToken(token);

      dispatch(setCredentials(decoded));

      console.log(decoded);

      navigate("/");
    } else {
      navigate("/");
    }
  }, [location, dispatch, navigate]);

  return (
    <div className="auth-success-container">
      <h2>Logging you in...</h2>
      <p>Redirecting to your dashboard...</p>
    </div>
  );
};

export default AuthSuccess;
