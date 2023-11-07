import { useState, useContext, useEffect } from "react";
import AlertContext from "../../context/alert/alertContext";
import AuthContext from "../../context/auth/authContext";
import { useHistory } from "react-router";
import M from "materialize-css/dist/js/materialize.min.js";
import { Row, Col, Preloader } from "react-materialize";

const RegisterAdmin = () => {
  const alertContext = useContext(AlertContext);
  const authContext = useContext(AuthContext);

  const { setAlert } = alertContext;

  const { regAdmin, error, clearErrors, token, validate } = authContext;

  const [loginProgress, setLoginProgress] = useState(false);

  const history = useHistory();

  useEffect(() => {
    validate();
    return () => setLoginProgress(false);
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    M.AutoInit();
    M.updateTextFields();
    //eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (token) {
      history.replace("/dashboard");
    }

    if (error === "User already exists") {
      setAlert(error, "danger");
    } else if (error === "role is not valid") {
      setAlert(error, "danger");
    } else if (error === "Gender is not valid") {
      setAlert(error, "danger");
    }

    setLoginProgress(false);

    clearErrors();
    // eslint-disable-next-line
  }, [error, token]);

  const [admin, setAdmin] = useState({
    email: "",
    password: "",
    password2: "",
    username: "",
    gender: "",
    phone: "",
  });

  const { email, password, password2, username, gender, phone } = admin;

  const onChange = (e) => {
    M.updateTextFields();

    setAdmin({ ...admin, [e.target.name]: e.target.value });
  };

  const validateEmail = (mail) => {
    // eslint-disable-next-line
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
      return true;
    }
    return false;
  };

  const onSubmit = async () => {
    setLoginProgress(true);

    if (
      email === "" ||
      password === "" ||
      password2 === "" ||
      username === "" ||
      gender === "" ||
      phone === ""
    ) {
      setAlert("Please enter all fields", "danger");
      setLoginProgress(false);
    } else if (!validateEmail(email)) {
      setAlert("Email not valid", "danger");
      setLoginProgress(false);
    } else if (phone.length !== 10) {
      setAlert("Phone number should have 10 digits", "danger");
      setLoginProgress(false);
    } else if (password.length < 6) {
      setAlert("Password should be of atleast 6 characters", "danger");
      setLoginProgress(false);
    } else if (password !== password2) {
      setAlert("Passwords do not match", "danger");
      setLoginProgress(false);
    } else {
      await regAdmin({
        user_email: email,
        user_password: password,
        role: "admin",
        admin_name: username,
        admin_gender: gender,
        admin_phone: phone,
      });
    }
  };

  return (
    <div className='center' id='abg'>
      <div className='box'>
        <div className='row mt-5'>
          <h4>Register as an Admin</h4>
        </div>
        <div className='row'>
          <form className='col s12'>
            <div
              className='row'
              id='aname'
              style={{ width: "300px", margin: "auto" }}
            >
              <div className='input-field col s12'>
                <input
                  id='username'
                  name='username'
                  type='text'
                  className='validate'
                  value={username}
                  onChange={onChange}
                  required
                />
                <label htmlFor='username'>Name</label>
              </div>
            </div>

            <div
              className='row'
              id='aemail'
              style={{ width: "300px", margin: "auto" }}
            >
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

            <div
              className='row'
              id='agender'
              style={{ width: "300px", margin: "auto" }}
            >
              <div className='input-field col s12'>
                <select name='gender' value={gender} onChange={onChange}>
                  <option value='' defaultValue disabled>
                    Choose your option
                  </option>
                  <option value='Male'>Male</option>
                  <option value='Female'>Female</option>
                  <option value='Other'>Other</option>
                </select>
                <label>Gender</label>
              </div>
            </div>

            <div
              className='row'
              id='ano'
              style={{ width: "300px", margin: "auto" }}
            >
              <div className='input-field col s12'>
                <input
                  id='phone'
                  name='phone'
                  type='number'
                  className='validate'
                  value={phone}
                  onChange={onChange}
                  placeholder='+91'
                  required
                />
                <label htmlFor='phone' className='active'>
                  Mobile Number
                </label>
              </div>
            </div>

            <div
              className='row'
              id='apass'
              style={{ width: "300px", margin: "auto" }}
            >
              <div className='input-field col s12'>
                <input
                  id='password'
                  name='password'
                  type='password'
                  className='validate'
                  value={password}
                  onChange={onChange}
                  minLength='6'
                  required
                />
                <label htmlFor='password'>Password</label>
              </div>
            </div>

            <div
              className='row'
              id='acpass'
              style={{ width: "300px", margin: "auto" }}
            >
              <div className='input-field col s12'>
                <input
                  id='password2'
                  name='password2'
                  minLength='6'
                  type='password'
                  className='validate'
                  value={password2}
                  onChange={onChange}
                  required
                />
                <label htmlFor='password2'>Confirm Password</label>
              </div>
            </div>

            {loginProgress ? (
              <div style={{ marginTop: "475px", marginRight: "315px" }}>
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
              <div className='row' id='abtn'>
                <button
                  className='btn waves-effect waves-light'
                  type='button'
                  value='Register'
                  onClick={onSubmit}
                  style={{
                    borderRadius: "2em",
                    width: "10em",
                  }}
                >
                  Register
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

export default RegisterAdmin;
