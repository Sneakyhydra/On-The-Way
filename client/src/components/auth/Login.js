// Imports
import { useState, useContext, useEffect } from "react";
import AlertContext from "../../context/alert/alertContext";
import AuthContext from "../../context/auth/authContext";
import { useHistory } from "react-router";
import M from "materialize-css/dist/js/materialize.min.js";
import { Row, Col, Preloader } from "react-materialize";

const Login = () => {
  const alertContext = useContext(AlertContext);
  const authContext = useContext(AuthContext);

  const { setAlert } = alertContext;

  const { login, error, clearErrors, isAuthenticated, loadUser } = authContext;
  const [loginProgress, setLoginProgress] = useState(false);

  const history = useHistory();

  useEffect(() => {
    loadUser();
    return () => setLoginProgress(false);
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      history.replace("/dashboard");
    }

    if (error === "Invalid Credentials") {
      setAlert(error, "danger");
    }

    clearErrors();
    // eslint-disable-next-line
  }, [error, isAuthenticated]);

  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const { email, password } = user;

  const onChange = (e) => {
    M.updateTextFields();
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    setLoginProgress(true);

    if (email === "" || password === "") {
      setAlert("Please enter all fields", "danger");
    } else {
      await login({
        user_email: email,
        user_password: password,
      });
    }
  };

  return (
    <div className='center' id='fcenter'>
      <div id='shade'></div>
      <div id='card'>
        <div id='updiv'>
          <div className='row mt-5'>
            <h4>Login</h4>
          </div>
        </div>

        <div className='row'>
          <form className='col s12' onSubmit={onSubmit}>
            <div className='row' style={{ width: "300px", margin: "auto" }}>
              <div className='input-field col s12'>
                <input
                  id='email'
                  name='email'
                  type='text'
                  className='validate'
                  value={email}
                  onChange={onChange}
                  required
                />
                <label htmlFor='email'>Email</label>
              </div>
            </div>

            <div className='row' style={{ width: "300px", margin: "auto" }}>
              <div className='input-field col s12'>
                <input
                  id='password'
                  name='password'
                  type='password'
                  className='validate'
                  value={password}
                  onChange={onChange}
                  required
                />
                <label htmlFor='password'>Password</label>
              </div>
            </div>

            {loginProgress ? (
              <div style={{ marginTop: "30px" }}>
                <Row>
                  <Col s={4}>
                    <Preloader
                      active
                      color='blue'
                      flashing={false}
                      size='small'
                    />
                  </Col>
                </Row>
              </div>
            ) : (
              <div className='row'>
                <button
                  className='btn waves-effect waves-light'
                  type='submit'
                  value='Login'
                  style={{
                    borderRadius: "2em",
                    marginTop: "2em",
                    width: "10em",
                  }}
                >
                  Login
                  <i className='material-icons right'>send</i>
                </button>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
