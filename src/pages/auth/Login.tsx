import { Button } from "@/components/ui/button";
import { RootState } from "@/redux/RootState";
import { login, logout } from "@/redux/slices/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );
  const handleLogin = () => {
    dispatch(login());
    navigate("/");
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  const dispatch = useDispatch();
  return (
    <div>
      {" "}
      {isAuthenticated === "yes" ? (
        <Button onClick={handleLogout}>Logout</Button>
      ) : (
        <Button onClick={handleLogin}>Login</Button>
      )}
    </div>
  );
}
