import { useState, useContext, useEffect } from "react";
import AlertContext from "../../context/alert/alertContext";
import AuthContext from "../../context/auth/authContext";
import { useHistory } from "react-router";
import M from "materialize-css/dist/js/materialize.min.js";

const RegisterCounsellor = () => {
  const alertContext = useContext(AlertContext);
  const authContext = useContext(AuthContext);

  const { setAlert } = alertContext;

  const { regCounsellor, error, clearErrors, isAuthenticated } = authContext;

  const history = useHistory();

  useEffect(() => {
    M.AutoInit();
    M.updateTextFields();
    //eslint-disable-next-line
  }, []);

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
    } else if (error === "Counselling type is not valid") {
      setAlert(error, "danger");
    }

    clearErrors();
    // eslint-disable-next-line
  }, [error, isAuthenticated]);

  const [counsellor, setCounsellor] = useState({
    email: "",
    password: "",
    password2: "",
    username: "",
    gender: "",
    phone: "",
    type: "",
  });

  const { email, password, password2, username, gender, phone, type } =
    counsellor;

  const onChange = async (e) => {
    M.updateTextFields();

    await setCounsellor({ ...counsellor, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();

    if (
      email === "" ||
      password === "" ||
      password2 === "" ||
      username === "" ||
      gender === "" ||
      phone === "" ||
      type === ""
    ) {
      setAlert("Please enter all fields", "danger");
    } else if (password !== password2) {
      setAlert("Passwords do not match", "danger");
    } else {
      regCounsellor({
        user_email: email,
        user_password: password,
        role: "counsellor",
        coun_name: username,
        coun_gender: gender,
        coun_phone: phone,
        coun_type: type,
      });
    }
  };

  return (
    <div className='center'>
      <div className='row'>
        <h4>Register as a Counsellor</h4>
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

          <div className='row' style={{ width: "300px", margin: "auto" }}>
            <div className='input-field col s12'>
              <input
                id='phone'
                name='phone'
                type='text'
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

          <div className='row' style={{ width: "300px", margin: "auto" }}>
            <div className='input-field col s12'>
              <select name='type' value={type} onChange={onChange}>
                <option value='' defaultValue disabled>
                  Choose your option
                </option>
                <option value='academics'>Academic</option>
                <option value='stress'>Stress</option>
              </select>
              <label>Counselling Type</label>
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

export default RegisterCounsellor;
