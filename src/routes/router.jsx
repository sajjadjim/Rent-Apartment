import {
  createBrowserRouter,
} from "react-router";

import MainLayout from "../pages/Layout/MainLayout";
import Home from "../pages/Home/Home";
import Apartments from "../pages/Apartments/Apartments";
import Login from "../pages/Authentication/Login";
import Register from "../pages/Authentication/Register";
import PrivateRoute from "./Privateroute";
import RoleRoute from "./RoleRoute";
import DashboardRedirect from "../pages/Layout/DashboardRedirect";
import DashboardLayout from "../pages/Layout/DashboardLayOut";

// User Dashboard Pages
import UserProfile from "../pages/DashBoard/Profile";
import UserAnnouncements from "../pages/DashBoard/Announcement";

// Member Dashboard Pages
import MemberProfile from "../pages/DashBoard/MemberProfile";
import MakePayment from "../pages/DashBoard/MakePayment";
import PaymentHistory from "../pages/DashBoard/PaymentHistory";

// Admin Dashboard Pages
import AdminProfile from "../pages/DashBoard/AdminProfile";
import ManageMembers from "../pages/DashBoard/ManageMembers";
import MakeAnnouncement from "../pages/DashBoard/MakeAnnouncement";
import AgreementRequests from "../pages/DashBoard/AgreementRequests";
import ManageCoupon from "../pages/DashBoard/ManageCoupon";
import About from "../pages/About";
import AddReview from "../pages/AddReview";
import ErrorPage from "../pages/Errorpage";
import Movers from "../pages/Movers/Movers";
import Technicians from "../pages/Technicians/Technicians";
import MyBookings from "../pages/Bookings/MyBookings";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home></Home>,
    children: [
      {
        index: true,
        element: <MainLayout></MainLayout>,
      },
      {
        path: "apartments",
        element: <Apartments />,
      },
      {
        path: "movers",
        element: <Movers />,
      },
      {
        path: "technicians",
        element: <Technicians />,
      },
      {
        path: "my-bookings",
        element: <MyBookings />,
      },
      {
        path: 'about',
        element: <About></About>
      },
      {
        path: 'addReview',
        element: <PrivateRoute><AddReview></AddReview></PrivateRoute>
      },
    ],
  },
  {
    path:"*",
    element: <ErrorPage></ErrorPage>
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },

  {
    path: "dashboard",
    element: <PrivateRoute><DashboardRedirect /></PrivateRoute>,
  },

  // User Dashboard
  {
    path: "dashboard/user",
    element: <PrivateRoute><RoleRoute allowedRole="user"><DashboardLayout /></RoleRoute></PrivateRoute>,
    children: [
      {
        index: true,
        element: <UserProfile />,
      },
      {
        path: "profile",
        element: <UserProfile />,
      },
      {
        path: "announcements",
        element: <UserAnnouncements />,
      },
    ],
  },

  // Member Dashboard
  {
    path: "dashboard/member",
    element: <PrivateRoute><RoleRoute allowedRole="member"><DashboardLayout /></RoleRoute></PrivateRoute>,
    children: [
      {
        index: true,
        element: <MemberProfile />,
      },
      {
        path: "profile",
        element: <MemberProfile />,
      },
      {
        path: "payment",
        element: <MakePayment />,
      },
      {
        path: "history",
        element: <PaymentHistory />,
      },
      {
        path: "announcements",
        element: <UserAnnouncements />,
      },
    ],
  },

  // Admin Dashboard
  {
    path: "dashboard/admin",
    element: <PrivateRoute><RoleRoute allowedRole="admin"><DashboardLayout /></RoleRoute></PrivateRoute>,
    children: [
      {
        index: true,
        element: <AdminProfile />,
      },
      {
        path: "profile",
        element: <AdminProfile />,
      },
      {
        path: "members",
        element: <ManageMembers />,
      },
      {
        path: "announcements",
        element: <MakeAnnouncement />,
      },
      {
        path: "requests",
        element: <AgreementRequests />,
      },
      {
        path: "coupons",
        element: <ManageCoupon />,
      },
    ],
  },
]);

export default router;
