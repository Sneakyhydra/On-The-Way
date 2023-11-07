import { useState, useContext, useEffect } from "react";
import AlertContext from "../../../../context/alert/alertContext";
import AuthContext from "../../../../context/auth/authContext";
import M from "materialize-css/dist/js/materialize.min.js";
import PropTypes from "prop-types";
import male from "../../../../images/Avatar/male.jpg";
import female from "../../../../images/Avatar/female.png";
import other from "../../../../images/Avatar/other.jpg";

const EditCounsellor = ({ user, setEdit }) => {
  const alertContext = useContext(AlertContext);
  const authContext = useContext(AuthContext);

  const { setAlert } = alertContext;

  const { editCounsellor } = authContext;

  useEffect(() => {
    M.AutoInit();
    M.updateTextFields();
    //eslint-disable-next-line
  }, []);

  const {
    coun_name,
    user_email,
    coun_phone,
    coun_gender,
    coun_dept,
    coun_status,
    user_id,
  } = user;

  const [counsellor, setCounsellor] = useState({
    email: user_email,
    username: coun_name,
    gender: coun_gender,
    phone: coun_phone,
    dept: coun_dept,
    status: coun_status,
    id: user_id,
    password: "",
  });

  const { email, username, gender, phone, dept, id, password } = counsellor;

  const onChange = (e) => {
    M.updateTextFields();

    setCounsellor({ ...counsellor, [e.target.name]: e.target.value });
  };

  const validateEmail = (mail) => {
    // eslint-disable-next-line
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
      return true;
    }
    return false;
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    if (
      email === "" ||
      username === "" ||
      gender === "" ||
      phone === "" ||
      dept === ""
    ) {
      setAlert("Please enter all fields", "danger");
    } else if (!validateEmail(email)) {
      setAlert("Email not valid", "danger");
    } else if (phone.length !== 10) {
      setAlert("Phone number should have 10 digits", "danger");
    } else {
      // eslint-disable-next-line
      await editCounsellor({
        user_email: email,
        role: "counsellor",
        coun_name: username,
        coun_gender: gender,
        coun_phone: phone,
        coun_id: id,
        user_password: password,
        coun_dept: dept,
      });

      setEdit(false);
    }
  };

  const onCancel = () => {
    setEdit(false);
  };

  let avatar = null;
  if (coun_gender === "Male") {
    avatar = (
      <img
        className='rounded-circle mt-0'
        width='150px'
        alt='Profile'
        src={male}
      />
    );
  } else if (coun_gender === "Female") {
    avatar = (
      <img
        className='rounded-circle'
        width='150px'
        alt='Profile'
        style={{ marginBottom: "1rem", marginTop: "1.25rem" }}
        src={female}
      />
    );
  } else {
    avatar = (
      <img
        className='rounded-circle mt-0'
        width='150px'
        alt='Profile'
        src={other}
      />
    );
  }

  return (
    <div
      className='container bg-white mt-3 mb-5'
      style={{ width: "100%", borderRadius: "0.5rem" }}
    >
      <div className='row'>
        <div className='col-md-3 border-right'>
          <div className='d-flex flex-column align-items-center text-center p-3 py-5'>
            {avatar}
            <span className='font-weight-bold' style={{ color: "#2c363f" }}>
              {coun_name}
            </span>
            <span className='text-black-50'>{user_email}</span>
            <span
              className='font-weight-bold'
              style={
                coun_status === "Pending"
                  ? { color: "orange", fontWeight: "600" }
                  : coun_status === "Approved"
                  ? { color: "green", fontWeight: "600" }
                  : { color: "red", fontWeight: "600" }
              }
            >
              {coun_status}
            </span>
            <span> </span>
          </div>
        </div>

        <form className='col-md-6' onSubmit={onSubmit}>
          <div
            className='row'
            style={{ width: "300px", margin: "auto", marginTop: "4.5em" }}
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

          <div className='row' style={{ width: "300px", margin: "auto" }}>
            <div className='input-field col s12'>
              <select name='dept' value={dept} onChange={onChange}>
                <option value='' defaultValue disabled>
                  Choose your option
                </option>
                <option value='B.Tech'>B.Tech</option>
                <option value='M.Tech'>M.Tech</option>
                <option value='B.Des'>B.Des</option>
                <option value='M.Des'>M.Des</option>
                <option value='P.hd'>P.hd</option>
              </select>
              <label>Programme</label>
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
            <span style={{ color: "red" }}>
              Enter your password or a new one
            </span>
          </div>

          <div className='row'>
            <button
              className='btn waves-effect waves-light z-depth-0'
              type='submit'
              value='Register'
              style={{
                marginTop: "2em",
                borderRadius: "0.75rem",
                width: "13em",
                backgroundColor: "#255F85",
              }}
            >
              Save Profile
              <i className='material-icons right' style={{ marginLeft: "0px" }}>
                check
              </i>
            </button>

            <button
              className='btn waves-effect waves-light z-depth-0'
              value='Cancel'
              type='button'
              onClick={onCancel}
              style={{
                marginTop: "2em",
                borderRadius: "0.75rem",
                width: "13em",
                backgroundColor: "#D7263D",
              }}
            >
              Cancel
              <i className='material-icons right' style={{ marginLeft: "0px" }}>
                clear
              </i>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// Set proptypes
EditCounsellor.propTypes = {
  user: PropTypes.object.isRequired,
  setEdit: PropTypes.func.isRequired,
};

export default EditCounsellor;
