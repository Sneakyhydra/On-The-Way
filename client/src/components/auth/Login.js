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

  const { login, error, clearErrors, validate, token } = authContext;
  const [loginProgress, setLoginProgress] = useState(false);

  const history = useHistory();

  useEffect(() => {
    validate();
    document.body.style.backgroundColor = "white";
    return () => {
      setLoginProgress(false);
    };
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (token) {
      history.replace("/dashboard");
    }

    if (error === "Invalid Credentials") {
      setAlert(error, "danger");
    }

    setLoginProgress(false);
    clearErrors();
    // eslint-disable-next-line
  }, [error, token]);

  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const { email, password } = user;

  const onChange = (e) => {
    M.updateTextFields();
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const onSubmit = async () => {
    setLoginProgress(true);

    if (email === "" || password === "") {
      setAlert("Please enter all fields", "danger");
      setLoginProgress(false);
    } else {
      await login({
        user_email: email,
        user_password: password,
      });
    }
  };

  return (
    <div className='row'>
      <form className='col s12'>
        <div className='row' style={{ margin: "auto" }}>
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

        <div className='row' style={{ margin: "auto" }}>
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
          <div style={{ marginTop: "25px", marginRight:"15px" }}>
            <Row>
              <Col s={4}>
                <Preloader active color='blue' flashing={false} size='small' />
              </Col>
            </Row>
          </div>
        ) : (
          <div className='row'>
            <button
              className='btn waves-effect waves-light'
              type='button'
              value='Login'
              onClick={onSubmit}
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
  );
};

export default Login;
