import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// eslint-disable-next-line react/prop-types
const ProtectedRoute = ({ children }) => {
    const { isLoggedIn } = useAuth();

    if (!isLoggedIn) {
        // Hiển thị thông báo khi chưa đăng nhập
        toast.error("Please login!", { toastId: "login-error" }); // Tránh thông báo lặp lại
        return <Navigate to="/login" replace />;
    }

    return children;
};

export default ProtectedRoute;
