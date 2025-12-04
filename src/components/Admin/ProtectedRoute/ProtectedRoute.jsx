import { Navigate } from "react-router-dom";
import PropTypes from "prop-types";

/**
 * ProtectedRoute Component
 *
 * Protects admin routes by checking if a valid JWT token exists
 * Redirects to admin login page if not authenticated
 *
 * Usage:
 * <Route path="/admin" element={<ProtectedRoute><AdminPage /></ProtectedRoute>} />
 */
const ProtectedRoute = ({ children }) => {
  const isAuthenticated = () => {
    const token = localStorage.getItem("adminToken");

    if (!token) {
      return false;
    }

    try {
      // Decode JWT token to check expiration
      const payload = JSON.parse(atob(token.split(".")[1]));
      const currentTime = Math.floor(Date.now() / 1000);

      // Check if token is expired
      if (payload.exp && payload.exp < currentTime) {
        // Token expired, clear it
        localStorage.removeItem("adminToken");
        localStorage.removeItem("adminEmail");
        localStorage.removeItem("adminData");
        return false;
      }

      return true;
    } catch (error) {
      // Invalid token format
      localStorage.removeItem("adminToken");
      localStorage.removeItem("adminEmail");
      localStorage.removeItem("adminData");
      return false;
    }
  };

  return isAuthenticated() ? children : <Navigate to="/admin/signin" replace />;
};

ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ProtectedRoute;
