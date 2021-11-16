// Imports
import { NavLink } from "react-router-dom";

// Images
import privateImg from "../../images/HomePage/private.png";
import clockImg from "../../images/HomePage/247.png";
import anonymousImg from "../../images/HomePage/anonymous.png";
import help1 from "../../images/HomePage/help1.svg";
import help2 from "../../images/HomePage/help2.svg";
import help3 from "../../images/HomePage/help3.svg";
import background2 from "../../images/HomePage/background2.png";
import { useEffect } from "react";

const Home = () => {
  useEffect(() => {
    document.body.style.backgroundColor = "white";
  }, []);

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

        <NavLink
          className='waves-effect waves-light btn regstudent z-depth-1'
          to='/regstudent'
          style={{ marginRight: "2em", marginTop: "3em" }}
        >
          Chat Now
        </NavLink>
        <NavLink
          className='waves-effect waves-light btn regcounsellor z-depth-1'
          to='/regcounsellor'
          style={{ marginRight: "2em", marginTop: "3em" }}
        >
          Be a member
        </NavLink>
      </div>

      <div
        className='help'
        style={{
          backgroundImage: `url(${background2})`,
          backgroundSize: "cover",
          height: "auto",
        }}
      >
        <div className='helptitle'>Three steps we can help you</div>
        <div className='row no-margin'>
          <div className='col l4 s12 center'>
            <div className='help-container'>
              <div className='img-container'>
                <img src={help1} alt='step1' />
              </div>
              <div className='content-container'>
                <div className='txt1'>
                  <div style={{ display: "inline-flex" }}>
                    <h1 style={{ color: "#bababa", marginRight: "1rem" }}>1</h1>
                    <h3
                      style={{
                        color: "#302664",
                        fontSize: "19px",
                        fontWeight: "900",
                        fontFamily: "Open Sans, sans-serif",
                        lineHeight: "1.5",
                        marginTop: "3.5em",
                      }}
                    >
                      Connect with your Expert
                    </h3>
                  </div>
                  <h5
                    style={{
                      color: "#444",
                      fontSize: "13px",
                      lineHeight: "26px",
                      fontFamily: "Open Sans, sans-serif",
                      fontWeight: "600",
                    }}
                  >
                    Chat anonymously with an OnTheWay expert who's here to help
                    you and not judge you.
                  </h5>
                </div>
              </div>
            </div>
          </div>
          <div className='col l4 s12 center'>
            <div className='help-container'>
              <div className='img-container'>
                <img src={help2} alt='step2' />
              </div>
              <div className='content-container'>
                <div className='txt1'>
                  <div style={{ display: "inline-flex" }}>
                    <h1 style={{ color: "#bababa", marginRight: "1rem" }}>2</h1>
                    <h3
                      style={{
                        color: "#302664",
                        fontSize: "19px",
                        fontWeight: "900",
                        fontFamily: "Open Sans, sans-serif",
                        lineHeight: "1.5",
                        marginTop: "3.5em",
                      }}
                    >
                      Discuss your Concerns
                    </h3>
                  </div>
                  <h5
                    style={{
                      color: "#444",
                      fontSize: "13px",
                      lineHeight: "26px",
                      fontFamily: "Open Sans, sans-serif",
                      fontWeight: "600",
                    }}
                  >
                    Open up to your Expert in a space where you get the guidance
                    you need, and your concerns get the attention they deserve.
                  </h5>
                </div>
              </div>
            </div>
          </div>
          <div className='col l4 s12 center'>
            <div className='help-container'>
              <div className='img-container'>
                <img src={help3} alt='step3' />
              </div>
              <div className='content-container'>
                <div className='txt1'>
                  <div style={{ display: "inline-flex" }}>
                    <h1 style={{ color: "#bababa", marginRight: "1rem" }}>3</h1>
                    <h3
                      style={{
                        color: "#302664",
                        fontSize: "19px",
                        fontWeight: "900",
                        fontFamily: "Open Sans, sans-serif",
                        lineHeight: "1.5",
                        marginTop: "3.5em",
                      }}
                    >
                      Unleash a Better You
                    </h3>
                  </div>
                  <h5
                    style={{
                      color: "#444",
                      fontSize: "13px",
                      lineHeight: "26px",
                      fontFamily: "Open Sans, sans-serif",
                      fontWeight: "600",
                    }}
                  >
                    With 24X7 support from our experts, bid goodbye to your old
                    self and be on your way to becoming a better you.
                  </h5>
                </div>
              </div>
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
      <div className='support'>
        <div className='txt greyOnHover'>
          <div className='icon' id='i1'></div>
          <div className='innertxt'>Online Chat Sessions</div>
          <div className='innertxt2'>
            Chat anonymously with an expert of your choice. This service is
            available to you anytime, anywhere.
          </div>
        </div>
        <div className='txt greyOnHover'>
          <div className='icon' id='i2'></div>
          <div className='innertxt'>Voice/Video Calls</div>
          <div className='innertxt2'>
            Speak to our experts or get on a call with them. Get personalized
            attention right when you need it.
          </div>
        </div>
        <div className='txt greyOnHover'>
          <div className='icon' id='i3'></div>
          <div className='innertxt'>Get Personal Feedback</div>
          <div className='innertxt2'>
            Take our special quiz and get instant feedback based on your
            choices.
          </div>
        </div>
      </div>
      <div className='footerborder'>
        <div className='p1'></div>
        <div className='p2'></div>
        <div className='p3'></div>
        <div className='p4'></div>
      </div>
      <div className='footer'>
        <div className='counselling'>
          <h4>
            {" "}
            <a href='#!' style={{ cursor: "default" }}>
              {" "}
              COUNSELLING
            </a>
          </h4>
          <h6>
            {" "}
            <a
              href='https://www.themuse.com/advice/5-surefire-ways-to-get-career-advice-thats-actually-useful-to-you'
              target='_blank'
              rel='noreferrer'
              style={{
                color: "#f7a344",
                fontSize: "13px",
              }}
            >
              Career / Academic
            </a>{" "}
          </h6>
          <h6>
            {" "}
            <a
              href='https://www.betterup.com/blog/10-tips-to-help-you-make-friends-and-get-along-better-with-others'
              target='_blank'
              rel='noreferrer'
              style={{
                color: "#f7a344",
                fontSize: "13px",
              }}
            >
              Friends &#38; Family
            </a>{" "}
          </h6>
          <h6>
            {" "}
            <a
              href='https://jamesclear.com/self-improvement'
              target='_blank'
              rel='noreferrer'
              style={{
                color: "#f7a344",
                fontSize: "13px",
              }}
            >
              Self Improvement
            </a>{" "}
          </h6>
        </div>
        <div className='aboutus'>
          <h4>
            {" "}
            <a href='#!' style={{ cursor: "default" }}>
              {" "}
              ABOUT US
            </a>
          </h4>
          <h6>
            {" "}
            <a href='#!'>Testimonials</a>{" "}
          </h6>
          <h6>
            {" "}
            <a href='#!'>Team</a>{" "}
          </h6>
          <h6>
            {" "}
            <a href='#!'>Terms of Services</a>{" "}
          </h6>
          <h6>
            {" "}
            <a href='#!'>Partners</a>{" "}
          </h6>
        </div>
        <div className='innertxt'>
          <h4>
            {" "}
            <a href='#!' style={{ cursor: "default" }}>
              About On The Way
            </a>{" "}
          </h4>
          <h3>
            At On The Way, we provide an online counseling and emotional support
            platform designed to foster mental wellness. It anonymously connects
            you with the right expert from our panel consisting of
            psychologists, psychotherapists, counselors, life coaches and career
            coaches, who understand you and guide you through completely
            confidential individual sessions.
          </h3>
          <h5>
            Meanwhile, know more about:{" "}
            <a
              href='https://en.wikipedia.org/wiki/Anxiety'
              target='_blank'
              rel='noreferrer'
            >
              Anxiety
            </a>{" "}
            |{" "}
            <a
              href='https://en.wikipedia.org/wiki/Counseling_psychology'
              target='_blank'
              rel='noreferrer'
            >
              Counselling
            </a>{" "}
            |{" "}
            <a
              href='https://en.wikipedia.org/wiki/Psychological_stress'
              target='_blank'
              rel='noreferrer'
            >
              Stress
            </a>{" "}
            |{" "}
            <a
              href='https://en.wikipedia.org/wiki/Depression_(mood)'
              target='_blank'
              rel='noreferrer'
            >
              Depression
            </a>{" "}
            |{" "}
            <a
              href='https://en.wikipedia.org/wiki/Addiction'
              target='_blank'
              rel='noreferrer'
            >
              Addiction
            </a>{" "}
          </h5>
        </div>
        <div className='rgtbtn'>
          <div className='icon'></div>
          <h3>Become an Expert</h3>
          <h4>Listen to others &#38; be their friend in need</h4>
          <NavLink
            className='waves-effect waves-light btn expert z-depth-1'
            to='/regcounsellor'
          >
            BECOME AN EXPERT
          </NavLink>
        </div>
        <div className='follow'>
          <h4>
            {" "}
            <a href='#!' style={{ cursor: "default" }}>
              {" "}
              FOLLOW US
            </a>
          </h4>
          <div className='icons'>
            <a href='#!'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                viewBox='0 0 24 24'
                width='24'
                height='24'
              >
                <path fill='none' d='M0 0h24v24H0z' />
                <path d='M14 13.5h2.5l1-4H14v-2c0-1.03 0-2 2-2h1.5V2.14c-.326-.043-1.557-.14-2.857-.14C11.928 2 10 3.657 10 6.7v2.8H7v4h3V22h4v-8.5z' />
              </svg>
            </a>
            <a href='#!'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                viewBox='0 0 24 24'
                width='24'
                height='24'
              >
                <path fill='none' d='M0 0h24v24H0z' />
                <path d='M22.162 5.656a8.384 8.384 0 0 1-2.402.658A4.196 4.196 0 0 0 21.6 4c-.82.488-1.719.83-2.656 1.015a4.182 4.182 0 0 0-7.126 3.814 11.874 11.874 0 0 1-8.62-4.37 4.168 4.168 0 0 0-.566 2.103c0 1.45.738 2.731 1.86 3.481a4.168 4.168 0 0 1-1.894-.523v.052a4.185 4.185 0 0 0 3.355 4.101 4.21 4.21 0 0 1-1.89.072A4.185 4.185 0 0 0 7.97 16.65a8.394 8.394 0 0 1-6.191 1.732 11.83 11.83 0 0 0 6.41 1.88c7.693 0 11.9-6.373 11.9-11.9 0-.18-.005-.362-.013-.54a8.496 8.496 0 0 0 2.087-2.165z' />
              </svg>
            </a>
            <a href='#!'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                viewBox='0 0 24 24'
                width='24'
                height='24'
              >
                <path fill='none' d='M0 0h24v24H0z' />
                <path d='M12 2c2.717 0 3.056.01 4.122.06 1.065.05 1.79.217 2.428.465.66.254 1.216.598 1.772 1.153a4.908 4.908 0 0 1 1.153 1.772c.247.637.415 1.363.465 2.428.047 1.066.06 1.405.06 4.122 0 2.717-.01 3.056-.06 4.122-.05 1.065-.218 1.79-.465 2.428a4.883 4.883 0 0 1-1.153 1.772 4.915 4.915 0 0 1-1.772 1.153c-.637.247-1.363.415-2.428.465-1.066.047-1.405.06-4.122.06-2.717 0-3.056-.01-4.122-.06-1.065-.05-1.79-.218-2.428-.465a4.89 4.89 0 0 1-1.772-1.153 4.904 4.904 0 0 1-1.153-1.772c-.248-.637-.415-1.363-.465-2.428C2.013 15.056 2 14.717 2 12c0-2.717.01-3.056.06-4.122.05-1.066.217-1.79.465-2.428a4.88 4.88 0 0 1 1.153-1.772A4.897 4.897 0 0 1 5.45 2.525c.638-.248 1.362-.415 2.428-.465C8.944 2.013 9.283 2 12 2zm0 5a5 5 0 1 0 0 10 5 5 0 0 0 0-10zm6.5-.25a1.25 1.25 0 0 0-2.5 0 1.25 1.25 0 0 0 2.5 0zM12 9a3 3 0 1 1 0 6 3 3 0 0 1 0-6z' />
              </svg>
            </a>
            <a
              href='https://www.youtube.com/channel/UCEBv5Wams0LUt4Yy6x9l_Bw'
              target='_blank'
              rel='noreferrer'
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                viewBox='0 0 24 24'
                width='24'
                height='24'
              >
                <path fill='none' d='M0 0h24v24H0z' />
                <path d='M21.543 6.498C22 8.28 22 12 22 12s0 3.72-.457 5.502c-.254.985-.997 1.76-1.938 2.022C17.896 20 12 20 12 20s-5.893 0-7.605-.476c-.945-.266-1.687-1.04-1.938-2.022C2 15.72 2 12 2 12s0-3.72.457-5.502c.254-.985.997-1.76 1.938-2.022C6.107 4 12 4 12 4s5.896 0 7.605.476c.945.266 1.687 1.04 1.938 2.022zM10 15.5l6-3.5-6-3.5v7z' />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
