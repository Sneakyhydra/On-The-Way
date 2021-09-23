import { useState, useContext, useEffect } from "react";
import AlertContext from "../../context/alert/alertContext";
import AuthContext from "../../context/auth/authContext";
import { useHistory } from "react-router";
import M from "materialize-css/dist/js/materialize.min.js";

const RegisterAdmin = () => {
  const alertContext = useContext(AlertContext);
  const authContext = useContext(AuthContext);

  const { setAlert } = alertContext;

  const { regAdmin, error, clearErrors, isAuthenticated } = authContext;

  const history = useHistory();

  useEffect(() => {
    if (isAuthenticated) {
      history.push("/");
    }

    if (error === "User already exists") {
      setAlert(error, "danger");
    } else if (error === "role is not valid") {
      setAlert(error, "danger");
    } else if (error === "Gender is not valid") {
      setAlert(error, "danger");
    }

    clearErrors();
    // eslint-disable-next-line
  }, [error, isAuthenticated]);

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

  const onSubmit = (e) => {
    e.preventDefault();

    if (
      email === "" ||
      password === "" ||
      password2 === "" ||
      username === "" ||
      gender === "" ||
      phone === ""
    ) {
      setAlert("Please enter all fields", "danger");
    } else if (password !== password2) {
      setAlert("Passwords do not match", "danger");
    } else {
      regAdmin({
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
    <div className='center'>
      <div className='row'>
        <h4>Register as an Admin</h4>
      </div>
      <div className='row'>
        <form className='col s12' onSubmit={onSubmit}>
          <div className='row' style={{ width: "300px", margin: "auto" }}>
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
                id='gender'
                name='gender'
                type='text'
                className='validate'
                value={gender}
                onChange={onChange}
                required
              />
              <label htmlFor='gender'>Gender</label>
            </div>
          </div>

          <div className='row' style={{ width: "300px", margin: "auto" }}>
            <div className='input-field col s12'>
              <input
                id='phone'
                name='phone'
                type='text'
                className='validate'
                value={phone}
                onChange={onChange}
                required
              />
              <label htmlFor='phone'>Mobile Number</label>
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
                minLength='3'
                required
              />
              <label htmlFor='password'>Password</label>
            </div>
          </div>

          <div className='row' style={{ width: "300px", margin: "auto" }}>
            <div className='input-field col s12'>
              <input
                id='password2'
                name='password2'
                minLength='3'
                type='password'
                className='validate'
                value={password2}
                onChange={onChange}
                required
              />
              <label htmlFor='password2'>Confirm Password</label>
            </div>
          </div>

          <div className='row'>
            <button
              className='btn waves-effect waves-light'
              type='submit'
              value='Register'
            >
              Register
              <i className='material-icons right'>send</i>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterAdmin;
