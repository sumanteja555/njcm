import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Suspense } from "react";
import "./App.css";

import UserRoutes from "./pages/UserRoutes.jsx";
import AdminRoutes from "./pages/AdminPages/AdminRoutes.jsx";
import AdminSignin from "./components/Admin/AdminSignin/AdminSignin.jsx";
import { adminSigninAction } from "./pages/AdminPages/AdminRoutes.jsx";

const router = createBrowserRouter(
  [
    UserRoutes,
    AdminRoutes,
    {
      path: "/admin/signin",
      element: <AdminSignin />,
      action: adminSigninAction,
    },
  ],
  {
    future: {
      v7_startTransition: true,
    },
  }
);
function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <RouterProvider router={router} />
    </Suspense>
  );
}

export default App;
