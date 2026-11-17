import { Navigate } from 'react-router-dom';

function ProtectedRoute({ children }) {
  // Берем данные напрямую из localStorage
  const authData = localStorage.getItem('auth-storage');
  let token = null;
  
  if (authData) {
    try {
      token = JSON.parse(authData)?.state?.token;
    } catch (e) {
      // ignore
      console.log(e)
    }
  }
  
  if (!token) {
    return <Navigate to="/login" replace />;
  }
  
  return children;
}

export default ProtectedRoute;