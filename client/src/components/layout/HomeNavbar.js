// Imports
import { Fragment, useContext, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import logo from "../../images/logo.png";
import PropTypes from "prop-types";
import AuthContext from "../../context/auth/authContext";
import { Dropdown, Icon } from "react-materialize";

const HomeNavbar = ({ scrollState }) => {
  const authContext = useContext(AuthContext);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [mobile, setMobile] = useState(false);

  // Load user if token exists
  useEffect(() => {
    if (sessionStorage.token) {
      authContext.loadUser();
    }
    setWindowWidth(window.innerWidth);

    if (windowWidth <= 400) {
      setMobile(true);
    } else {
      setMobile(false);
    }
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
        id='Dropdown_1'
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
              marginRight: "4em",
              minWidth: "120px",
              width: "auto",
            }}
          >
            {mobile ? "" : name}
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
