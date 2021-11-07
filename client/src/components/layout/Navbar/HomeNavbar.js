// Imports
import { NavLink } from "react-router-dom";
import logo from "../../../images/Logo/logo.png";
import PropTypes from "prop-types";

const HomeNavbar = ({ scrollState }) => {
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
