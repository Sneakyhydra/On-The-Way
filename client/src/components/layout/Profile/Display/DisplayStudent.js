import { useEffect } from "react";
import M from "materialize-css/dist/js/materialize.min.js";
import PropTypes from "prop-types";
import male from "../../../../images/Avatar/male.jpg";
import female from "../../../../images/Avatar/female.png";
import other from "../../../../images/Avatar/other.jpg";

const DisplayStudent = ({ user, setEdit }) => {
  useEffect(() => {
    M.AutoInit();
    M.updateTextFields();
    //eslint-disable-next-line
  }, []);

  useEffect(() => {
    M.AutoInit();
    M.updateTextFields();
    // eslint-disable-next-line
  }, [user]);

  const {
    stud_name,
    user_email,
    stud_phone,
    stud_gender,
    stud_dept,
    stud_branch,
    roll_no,
    cpi,
    response,
  } = user;

  let CPI = cpi;
  if (!cpi) {
    CPI = "Not Found";
  }

  const onEdit = () => {
    setEdit(true);
  };

  let avatar = null;
  if (stud_gender === "Male") {
    avatar = (
      <img
        className='rounded-circle mt-0'
        width='150px'
        alt='Profile'
        src={male}
      />
    );
  } else if (stud_gender === "Female") {
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
              {stud_name}
            </span>
            <span className='text-black-50'>{user_email}</span>
            <span className='text-black-50'>CPI: {CPI}</span>
            <span> </span>
          </div>
        </div>

        <div className='col-md-5'>
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
                value={stud_name}
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
              <select name='gender' value={stud_gender} disabled readOnly>
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
                id='rollno'
                name='rollno'
                type='text'
                className='validate'
                value={roll_no}
                disabled
                readOnly
              />
              <label htmlFor='rollno' style={{ color: "#2c363f" }}>
                Roll Number
              </label>
            </div>
          </div>

          <div className='row' style={{ width: "300px", margin: "auto" }}>
            <div className='input-field col s12'>
              <input
                id='phone'
                name='phone'
                type='text'
                className='validate'
                value={stud_phone}
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

          <div className='row' style={{ width: "300px", margin: "auto" }}>
            <div className='input-field col s12'>
              <select name='dept' value={stud_dept} disabled readOnly>
                <option value=''>Choose your option</option>
                <option value='B.Tech'>B.Tech</option>
                <option value='M.Tech'>M.Tech</option>
                <option value='B.Des'>B.Des</option>
                <option value='M.Des'>M.Des</option>
                <option value='P.hd'>P.hd</option>
              </select>
              <label style={{ color: "#2c363f" }}>Programme</label>
            </div>
          </div>

          <div className='row' style={{ width: "300px", margin: "auto" }}>
            <div className='input-field col s12'>
              <select name='branch' value={stud_branch} disabled readOnly>
                <option value='' disabled>
                  Choose your option
                </option>
                <option value='CSE'>
                  Computer Science and Engineering&#40;CSE&#41;
                </option>
                <option value='ECE'>
                  Electronics and Communication Engineering&#40;ECE&#41;
                </option>
                <option value='Des'>Design&#40;Des&#41;</option>
                <option value='ME'>Mechanical Engineering&#40;ME&#41;</option>
                <option value='NS'>Natural Sciences&#40;NS&#41;</option>
              </select>
              <label style={{ color: "#2c363f" }}>Branch</label>
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

        <div className='col-md-4'>
          <div className='p-3 py-5'>
            <div
              className='d-flex justify-content-between align-items-center experience'
              style={{ flexDirection: "column" }}
            >
              {response.length > 0 ? (
                <h5 style={{ color: "#2c363f" }}>Response from last quiz</h5>
              ) : (
                "Take the quiz for a personal response"
              )}
              <br />
              <ul>
                {response.length > 0
                  ? response.map((item, idx) => {
                      return (
                        <div key={idx}>
                          <li>{item}</li>
                          <br />
                        </div>
                      );
                    })
                  : ""}
              </ul>
            </div>
            <br />
          </div>
        </div>
      </div>
    </div>
  );
};

// Set proptypes
DisplayStudent.propTypes = {
  user: PropTypes.object.isRequired,
  setEdit: PropTypes.func.isRequired,
};

export default DisplayStudent;
