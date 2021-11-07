import { useEffect } from "react";
import M from "materialize-css/dist/js/materialize.min.js";
import PropTypes from "prop-types";
import male from "../../../../images/Avatar/male.jpg";
import female from "../../../../images/Avatar/female.png";
import other from "../../../../images/Avatar/other.jpg";

const DisplayAdmin = ({ user, setEdit }) => {
  useEffect(() => {
    M.AutoInit();
    M.updateTextFields();
    // eslint-disable-next-line
  }, [user]);

  useEffect(() => {
    M.AutoInit();
    M.updateTextFields();
    // eslint-disable-next-line
  }, []);

  const { admin_name, user_email, admin_phone, admin_gender } = user;

  const onEdit = () => {
    setEdit(true);
  };

  let avatar = null;
  if (admin_gender === "Male") {
    avatar = (
      <img
        className='rounded-circle mt-0'
        width='150px'
        alt='Profile'
        src={male}
      />
    );
  } else if (admin_gender === "Female") {
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
              {admin_name}
            </span>
            <span className='text-black-50'>{user_email}</span>
            <span> </span>
          </div>
        </div>

        <div className='col-md-6'>
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
                value={admin_name}
                disabled
                readOnly
              />
              <label htmlFor='username' style={{ color: "#2c363f" }}>
                Name
              </label>
            </div>
          </div>

          <div className='row' style={{ width: "300px", margin: "auto" }}>
            <div className='input-field col s12'>
              <input
                id='email'
                name='email'
                type='text'
                className='validate'
                value={user_email}
                readOnly
                disabled
              />
              <label htmlFor='email' style={{ color: "#2c363f" }}>
                Email
              </label>
            </div>
          </div>

          <div className='row' style={{ width: "300px", margin: "auto" }}>
            <div className='input-field col s12'>
              <select name='gender' value={admin_gender} disabled readOnly>
                <option value='' defaultValue disabled>
                  Choose your option
                </option>
                <option value='Male'>Male</option>
                <option value='Female'>Female</option>
                <option value='Other'>Other</option>
              </select>
              <label style={{ color: "#2c363f" }}>Gender</label>
            </div>
          </div>

          <div className='row' style={{ width: "300px", margin: "auto" }}>
            <div className='input-field col s12'>
              <input
                id='phone'
                name='phone'
                type='text'
                className='validate'
                value={admin_phone}
                disabled
                readOnly
              />
              <label
                htmlFor='phone'
                className='active'
                style={{ color: "#2c363f" }}
              >
                Mobile Number
              </label>
            </div>
          </div>

          <div className='row'>
            <button
              className='btn waves-effect waves-light z-depth-0'
              value='Edit'
              onClick={onEdit}
              style={{
                marginTop: "2em",
                borderRadius: "0.75rem",
                width: "13em",
                backgroundColor: "#255F85",
              }}
            >
              Edit Profile
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Set proptypes
DisplayAdmin.propTypes = {
  user: PropTypes.object.isRequired,
  setEdit: PropTypes.func.isRequired,
};

export default DisplayAdmin;
