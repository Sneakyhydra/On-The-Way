import { NavLink } from "react-router-dom";
import logo from "../../images/logo.png";
import PropTypes from "prop-types";

const Navbar = ({ scrollState, isAuth }) => {
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

          <ul className='right'>
            {isAuth ? (
              <li>UserName</li>
            ) : (
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
            )}
          </ul>
        </div>
      </nav>
    </div>
  );
};

Navbar.propTypes = {
  scrollState: PropTypes.string.isRequired,
  isAuth: PropTypes.bool.isRequired,
};

export default Navbar;
