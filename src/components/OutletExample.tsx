import { Link, Outlet } from "react-router";

export default function OutletExample() {
  return (
    <>
      <div>
        <Link to="/outletexample/profile">Profile</Link>&nbsp;&nbsp;&nbsp;
        <Link to="/outletexample/settings">Settings</Link>
      </div>
      <Outlet />
    </>
  )
}
