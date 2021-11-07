// Imports
import logo from "../../../images/Logo/logo.png";
import PropTypes from "prop-types";
import { useState } from "react";
import { Modal } from "react-bootstrap";
import Login from "../../auth/Login";

const HomeNavbar = ({ scrollState }) => {
  let depth = "z-depth-0";
  let scrolled = false;
  if (scrollState === "amir") {
    depth = "z-depth-1";
    scrolled = true;
  }

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

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
            <>
              <a
                className='waves-effect waves-light btn login z-depth-0'
                onClick={handleShow}
                id='loginBtn'
                href='#!'
                style={{
                  borderRadius: "2rem",
                  width: "50%",
                  fontWeight: "600",
                  fontSize: "1.1rem",
                  border: "2px solid #400279",
                  textTransform: "unset",
                }}
              >
                Login
              </a>

              <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                  <Modal.Title>Login</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <Login />
                </Modal.Body>
              </Modal>
            </>
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
