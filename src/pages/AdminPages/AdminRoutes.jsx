import { lazy } from "react";
import { redirect } from "react-router-dom";
import ProtectedRoute from "../../components/Admin/ProtectedRoute/ProtectedRoute.jsx";

const AdminRootLayout = lazy(() => import("./AdminRoot.jsx"));

const Dashboard = lazy(() =>
  import("../../components/Admin/Dashboard/Dashboard.jsx")
);
const AddEvent = lazy(() =>
  import("../../components/Admin/AddEvent/AddEvent.jsx")
);
const AdminSignin = lazy(() =>
  import("../../components/Admin/AdminSignin/AdminSignin.jsx")
);

// Admin Signin Action
export async function adminSigninAction({ request }) {
  const formData = await request.formData();
  const emailOrPhone = formData.get("emailOrPhone");
  const password = formData.get("password");

  try {
    const response = await fetch("http://localhost:8000/admin_signin.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ emailOrPhone, password }),
    });

    const data = await response.json();

    if (data.success) {
      // Save token and user data to localStorage
      localStorage.setItem("adminToken", data.token);
      localStorage.setItem("adminEmail", data.user.email);
      localStorage.setItem("adminData", JSON.stringify(data.user));

      return redirect("/admin");
    } else {
      return { error: data.error };
    }
  } catch (error) {
    return { error: "Network error. Please try again." };
  }
}

const AdminRoutes = {
  path: "/admin",
  element: (
    <ProtectedRoute>
      <AdminRootLayout />
    </ProtectedRoute>
  ),
  children: [
    { index: true, element: <Dashboard /> },
    { path: "addevent", element: <AddEvent /> },
  ],
};

export default AdminRoutes;
