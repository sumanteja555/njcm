import { Outlet } from "react-router-dom";

import AdminNavbar from "../../components/Admin/Navbar/Navbar.jsx";
export default function AdminRootLayout() {
  return (
    <>
      <AdminNavbar />
      <main>
        <Outlet />
      </main>
    </>
  );
}
