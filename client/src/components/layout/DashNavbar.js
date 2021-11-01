// Imports
import { Fragment, useContext, useEffect } from "react";
import { NavLink } from "react-router-dom";
import AuthContext from "../../context/auth/authContext";
import { Dropdown, Icon } from "react-materialize";
import M from "materialize-css/dist/js/materialize.min.js";

const DashNavbar = () => {
  const authContext = useContext(AuthContext);

  // Load user if token exists
  useEffect(() => {
    if (sessionStorage.token) {
      authContext.loadUser();
    }
    M.AutoInit();
    M.updateTextFields();
    // eslint-disable-next-line
  }, []);

  const { isAuthenticated, logout, user } = authContext;

  let role = "guest";

  if (user) {
    role = user.role;
  }

  let name = "Guest";

  if (role === "student") {
    name = user.stud_name;
  } else if (role === "counsellor") {
    name = user.coun_name;
  } else if (role === "admin") {
    name = user.admin_name;
  }

  const onLogout = () => {
    logout();
  };

  const authLinks = (
    <Fragment>
      <Dropdown
        id='Dropdown_2'
        style={{ borderRadius: "8px" }}
        options={{
          alignment: "left",
          autoTrigger: true,
          closeOnClick: true,
          constrainWidth: true,
          container: null,
          coverTrigger: false,
          hover: true,
          inDuration: 100,
          onCloseEnd: null,
          onCloseStart: null,
          onOpenEnd: null,
          onOpenStart: null,
          outDuration: 250,
        }}
        trigger={
          <a
            href='#!'
            className='waves-effect waves-light btn'
            style={{
              borderRadius: "10px",
              marginRight: "4.75em",
              minWidth: "120px",
              width: "auto",
            }}
          >
            {name}
            <Icon right>arrow_drop_down</Icon>
          </a>
        }
      >
        <NavLink to='/dashboard'>Dashboard</NavLink>
        <NavLink
          to='/'
          onClick={onLogout}
          style={{
            color: "red",
            display: "inline-flex",
            width: "100%",
          }}
        >
          <span>Logout</span> <Icon>exit_to_app</Icon>
        </NavLink>
      </Dropdown>
    </Fragment>
  );

  const guestLinks = (
    <Fragment>
      <li id='loginBtn'>
        <NavLink
          className='waves-effect waves-light btn z-depth-0 login'
          to='/login'
          style={{
            borderRadius: "2em",
            width: "7em",
            border: "2px solid #400279",
            fontWeight: "bolder",
            fontSize: "17px",
            textTransform: "capitalize",
          }}
        >
          Login
        </NavLink>
      </li>
    </Fragment>
  );

  return (
    <div className='navbar-fixed'>
      <nav className='z-depth-0' style={{ backgroundColor: "white" }}>
        <div className='nav-wrapper'>
          <div style={{ display: "inline-flex" }}>
            <h4 className='title'>Dashboard</h4>
          </div>

          <ul className='right' style={{ display: "inline-block" }}>
            {isAuthenticated ? authLinks : guestLinks}
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default DashNavbar;
