import { createBrowserRouter, Navigate, Outlet } from "react-router";
import Home from "./components/Home";
import WeeklyWeather from "./components/WeeklyWeather";
import OutletExample from "./components/OutletExample";
import Profile from "./components/Profile";
import Settings from "./components/Settings";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/weeklyweather",
    element: <WeeklyWeather />,
  },
  {
    path: "/outletexample",
    element: <OutletExample />,
    children: [
      {
        path: "",
        element: <Navigate to={"profile"} replace />, // If someone visits /outletexample with no sub-route, immediately redirect them to /outletexample/profile
        // without replace when we go back from /outletexample/profile we would go to /outletexample which we do not want
      },
      {
        path: "profile",
        element: <Profile />,
      },
      {
        path: "settings",
        element: <Settings />,
      },
    ],
  },
  {
    path: "/anotheroutletexample",
    element: <Outlet />,
    children: [
      {
        path: "",
        element: <Profile />,
      },
      {
        path: "profile",
        element: <Profile />,
      },
      {
        path: "settings",
        element: <Settings />,
      },
    ],
  },
]);

export default router;