import { Navigate } from "react-router-dom";
import LoginForm from "../../features/auth/ui/LoginForm.jsx";
import useAuthStore from "../../app/store/authStore.js";

const LogInPage = () => {
  const token = useAuthStore((state) => state.token);
  
  if (token) {
    return <Navigate to="/" replace />;
  }

  return <LoginForm />;
};

export default LogInPage;