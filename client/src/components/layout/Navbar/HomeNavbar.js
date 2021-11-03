// Imports
import { Fragment, useContext, useEffect } from "react";
import { NavLink } from "react-router-dom";
import logo from "../../../images/Logo/logo.png";
import PropTypes from "prop-types";
import AuthContext from "../../../context/auth/authContext";
import { Icon } from "react-materialize";

const HomeNavbar = ({ scrollState }) => {
  const authContext = useContext(AuthContext);

  // Load user if token exists
  useEffect(() => {
    authContext.loadUser();
    // eslint-disable-next-line
  }, []);

  const { isAuthenticated, logout } = authContext;

  const onLogout = async () => {
    await logout();
    await authContext.loadUser();
    window.location.reload();
  };

  const authLinks = (
    <Fragment>
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
          fontSize: "15px",
        }}
      >
        <span>Logout</span> <Icon>exit_to_app</Icon>
      </NavLink>
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

  let depth = "z-depth-0";
  let scrolled = false;
  if (scrollState === "amir") {
    depth = "z-depth-1";
    scrolled = true;
  }

  return (
    <div className='navbar-fixed'>
      <nav
        className={`${depth} ${scrolled ? "whiteBG" : "transparentBG mtop"}`}
      >
        <div className='nav-wrapper'>
          <div style={{ display: "inline-flex" }}>
            <img src={logo} alt='Logo' className='logo' />
            <h4 className='title'>On The Way</h4>
          </div>

          <ul className='right' style={{ display: "inline-block" }}>
            {isAuthenticated ? authLinks : guestLinks}
          </ul>
        </div>
      </nav>
    </div>
  );
};

// Set proptypes
HomeNavbar.propTypes = {
  scrollState: PropTypes.string.isRequired,
};

export default HomeNavbar;
