import { Outlet } from "react-router-dom";
import Header from "../components/header/Header.jsx";
import Navbar from "../components/Navbar/Navbar.jsx";
import Footer from "../components/footer/Footer.jsx";
export default function RootLayout() {
  return (
    <>
      <Header />
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
