import { lazy } from "react";

const RootLayout = lazy(() => import("./Root.jsx"));

const HomePage = lazy(() => import("./HomePage.jsx"));
const AboutUs = lazy(() => import("./AboutUs.jsx"));
const MissionVission = lazy(() =>
  import("../components/mission-vission/MissionVission.jsx")
);
const Gallery = lazy(() => import("../components/Gallery/Gallery.jsx"));
const Donate = lazy(() => import("../components/Donate/Donate.jsx"));

const Error = lazy(() => import("../components/Error/Error.jsx"));

const PaymentSuccess = lazy(() =>
  import("../components/PaymentSuccess/PaymentSuccess.jsx")
);
const UserRoutes = {
  path: "/",
  element: <RootLayout />,
  // errorElement: <Error />,
  children: [
    { index: true, element: <HomePage /> },
    { path: "/aboutus", element: <AboutUs /> },
    { path: "/missionvission", element: <MissionVission /> },
    { path: "/gallery", element: <Gallery /> },
    { path: "/donate", element: <Donate /> },
    {
      path: "/paymentsuccess",
      element: <PaymentSuccess />,
    },
    { path: "*", element: <Error /> },
  ],
};

export default UserRoutes;
