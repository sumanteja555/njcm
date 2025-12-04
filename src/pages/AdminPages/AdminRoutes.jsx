import { lazy } from "react";

const AdminRootLayout = lazy(() => import("./AdminRoot.jsx"));

const Dashboard = lazy(() =>
  import("../../components/Admin/Dashboard/Dashboard.jsx")
);
const AddEvent = lazy(() =>
  import("../../components/Admin/AddEvent/AddEvent.jsx")
);
const AdminRoutes = {
  path: "/admin",
  element: <AdminRootLayout />,
  children: [
    { index: true, element: <Dashboard /> },
    { path: "addevent", element: <AddEvent /> },
  ],
};

export default AdminRoutes;
