import { NavLink } from "react-router-dom";

import privateImg from "../../images/private.png";
import clockImg from "../../images/247.png";
import anonymousImg from "../../images/anonymous.png";
import help1 from "../../images/1.svg";
import help2 from "../../images/2.svg";
import help3 from "../../images/3.svg";
import background2 from "../../images/background2.png";

import AuthContext from "../../context/auth/authContext";
import { Fragment, useContext } from "react";

const Home = () => {
  const authContext = useContext(AuthContext);

  const { isAuthenticated } = authContext;

  const authBtns = (
    <Fragment>
      <NavLink
        className='waves-effect waves-light btn regcounsellor z-depth-1'
        to='/dashboard'
      >
        Dashboard
      </NavLink>
    </Fragment>
  );

  const guestBtns = (
    <Fragment>
      <NavLink
        className='waves-effect waves-light btn regstudent z-depth-1'
        to='/regstudent'
      >
        Chat Now
      </NavLink>
      <NavLink
        className='waves-effect waves-light btn regcounsellor z-depth-1'
        to='/regcounsellor'
      >
        Be a member
      </NavLink>
    </Fragment>
  );

  return (
    <div>
      <div style={{ marginLeft: "6.5em", marginTop: "8em" }}>
        <h1 style={{ fontWeight: "100", fontSize: "3.5em" }}>
          Get help. Get better.
        </h1>
        <p style={{ fontWeight: "100", fontSize: "1.75em", margin: "0" }}>
          No matter what's troubling you, get the support you need,
        </p>
        <p style={{ fontWeight: "100", fontSize: "1.75em", margin: "0" }}>
          right here, right now.
        </p>

        {isAuthenticated ? authBtns : guestBtns}
      </div>

      <div
        className='help'
        style={{
          backgroundImage: `url(${background2})`,
          backgroundSize: "cover",
        }}
      >
        <div className='helptitle'>Three steps we can help you</div>
        <div className='row no-margin'>
          <div className='col l4 s12 center'>
            <div className='help-container'>
              <div className='img-container'>
                <img src={help1} alt='step1' />
              </div>
              <div className='content-container'></div>
            </div>
          </div>
          <div className='col l4 s12 center'>
            <div className='help-container'>
              <div className='img-container'>
                <img src={help2} alt='step2' />
              </div>
              <div className='content-container'></div>
            </div>
          </div>
          <div className='col l4 s12 center'>
            <div className='help-container'>
              <div className='img-container'>
                <img src={help3} alt='step3' />
              </div>
              <div className='content-container'></div>
            </div>
          </div>
        </div>
      </div>

      <div className='desc'>
        <div className='col l3 s6'>
          <div className='img-container'>
            <img src={privateImg} alt='private' />
          </div>
          <p>PRIVATE AND CONFIDENTIAL</p>
        </div>
        <div className='col l3 s6'>
          <div className='img-container'>
            <img src={anonymousImg} alt='anonymous' />
          </div>
          <p>ANONYMOUS DISCUSSIONS</p>
        </div>
        <div className='col l3 s6'>
          <div className='img-container'>
            <img src={clockImg} alt='247' />
          </div>
          <p>24X7 ROUND THE CLOCK SUPPORT</p>
        </div>
      </div>
    </div>
  );
};

export default Home;
