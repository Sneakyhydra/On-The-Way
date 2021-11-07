// Imports
import { useContext, useEffect } from "react";
import { NavLink } from "react-router-dom";
import AuthContext from "../../../context/auth/authContext";
import { Icon } from "react-materialize";
import M from "materialize-css/dist/js/materialize.min.js";

const DashNavbar = () => {
  const authContext = useContext(AuthContext);

  // Load user if token exists
  useEffect(() => {
    M.AutoInit();
    M.updateTextFields();
    // eslint-disable-next-line
  }, []);

  const { logout } = authContext;

  const onLogout = async () => {
    await logout();
  };

  return (
    <div className='navbar-fixed'>
      <nav className='z-depth-0' style={{ backgroundColor: "white" }}>
        <div className='nav-wrapper'>
          <div style={{ display: "inline-flex" }}>
            <h4 className='title' style={{ color: "#54A5A2" }}>
              Dashboard
            </h4>
          </div>

          <ul className='right' style={{ display: "inline-block" }}>
            <NavLink
              className='waves-effect waves-light btn z-depth-0'
              to='/'
              onClick={onLogout}
              style={{
                color: "red",
                display: "inline-flex",
                width: "100%",
                background: "transparent",
                marginRight: "4.5em",
                marginTop: "30px",
                fontSize: "15px",
              }}
            >
              <span>Logout</span> <Icon>exit_to_app</Icon>
            </NavLink>
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default DashNavbar;
