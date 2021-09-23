import { useState, useContext, useEffect } from "react";
import AlertContext from "../../context/alert/alertContext";
import AuthContext from "../../context/auth/authContext";
import { useHistory } from "react-router";
import M from "materialize-css/dist/js/materialize.min.js";

const RegisterStudent = () => {
  const alertContext = useContext(AlertContext);
  const authContext = useContext(AuthContext);

  const { setAlert } = alertContext;

  const { regStudent, error, clearErrors, isAuthenticated } = authContext;

  const history = useHistory();

  useEffect(() => {
    if (isAuthenticated) {
      history.push("/");
    }

    if (error === "User already exists") {
      setAlert(error, "danger");
    } else if (error === "Role is not valid") {
      setAlert(error, "danger");
    } else if (error === "Gender is not valid") {
      setAlert(error, "danger");
    } else if (error === "Programme(dept) is not valid") {
      setAlert(error, "danger");
    } else if (error === "Branch is not valid") {
      setAlert(error, "danger");
    }

    clearErrors();
    // eslint-disable-next-line
  }, [error, isAuthenticated]);

  const [student, setStudent] = useState({
    email: "",
    password: "",
    password2: "",
    username: "",
    rollno: "",
    gender: "",
    phone: "",
    dept: "",
    branch: "",
  });

  const {
    email,
    password,
    password2,
    username,
    rollno,
    gender,
    phone,
    dept,
    branch,
  } = student;

  const onChange = (e) => {
    M.updateTextFields();

    setStudent({ ...student, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();

    if (
      email === "" ||
      password === "" ||
      password2 === "" ||
      username === "" ||
      rollno === "" ||
      gender === "" ||
      phone === "" ||
      dept === "" ||
      branch === ""
    ) {
      setAlert("Please enter all fields", "danger");
    } else if (password !== password2) {
      setAlert("Passwords do not match", "danger");
    } else {
      regStudent({
        user_email: email,
        user_password: password,
        role: "student",
        stud_name: username,
        roll_no: rollno,
        stud_gender: gender,
        stud_phone: phone,
        stud_dept: dept,
        stud_branch: branch,
      });
    }
  };

  return (
    <div className='center'>
      <div className='row'>
        <h4>Register as a Student</h4>
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
                id='rollno'
                name='rollno'
                type='text'
                className='validate'
                value={rollno}
                onChange={onChange}
                required
              />
              <label htmlFor='rollno'>Roll Number</label>
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
                id='dept'
                name='dept'
                type='text'
                className='validate'
                value={dept}
                onChange={onChange}
                required
              />
              <label htmlFor='dept'>Programme</label>
            </div>
          </div>

          <div className='row' style={{ width: "300px", margin: "auto" }}>
            <div className='input-field col s12'>
              <input
                id='branch'
                name='branch'
                type='text'
                className='validate'
                value={branch}
                onChange={onChange}
                required
              />
              <label htmlFor='branch'>Branch</label>
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

export default RegisterStudent;
