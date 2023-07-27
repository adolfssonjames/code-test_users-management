import { NavLink } from "react-router-dom";
import "./navStyle.scss";
export default function Nav() {
  return (
    <div>
      <section className="nav-links">
        <NavLink className="link" to="/">
          User List
        </NavLink>
        <NavLink className="link" to="/login">
          Login
        </NavLink>
      </section>
    </div>
  );
}
