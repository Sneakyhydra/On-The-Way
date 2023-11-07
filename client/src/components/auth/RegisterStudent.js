import { useState, useContext, useEffect } from "react";
import AlertContext from "../../context/alert/alertContext";
import AuthContext from "../../context/auth/authContext";
import { useHistory } from "react-router";
import M from "materialize-css/dist/js/materialize.min.js";
import { Row, Col, Preloader } from "react-materialize";

const RegisterStudent = () => {
  const alertContext = useContext(AlertContext);
  const authContext = useContext(AuthContext);

  const { setAlert } = alertContext;

  const { regStudent, error, clearErrors, token, validate } = authContext;
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
    } else if (error === "Role is not valid") {
      setAlert(error, "danger");
    } else if (error === "Gender is not valid") {
      setAlert(error, "danger");
    } else if (error === "Programme(dept) is not valid") {
      setAlert(error, "danger");
    } else if (error === "Branch is not valid") {
      setAlert(error, "danger");
    }

    setLoginProgress(false);
    clearErrors();
    // eslint-disable-next-line
  }, [error, token]);

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

  const onChange = async (e) => {
    M.updateTextFields();

    await setStudent({ ...student, [e.target.name]: e.target.value });
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
      rollno === "" ||
      gender === "" ||
      phone === "" ||
      dept === "" ||
      branch === ""
    ) {
      setAlert("Please enter all fields", "danger");
      setLoginProgress(false);
    } else if (!validateEmail(email)) {
      setAlert("Email not valid", "danger");
      setLoginProgress(false);
    } else if (phone.length !== 10) {
      setAlert("Phone number should have 10 digits", "danger");
      setLoginProgress(false);
    } else if (password.length < 3) {
      setAlert("Password should be of atleast 3 characters", "danger");
      setLoginProgress(false);
    } else if (password !== password2) {
      setAlert("Passwords do not match", "danger");
      setLoginProgress(false);
    } else {
      await regStudent({
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
    <div className='center' id='sbg'>
      <div className='box'>
        <div className='row mt-5'>
          <h4>Register as a Student</h4>
        </div>
        <div className='row'>
          <form className='col s12'>
            <div
              className='row'
              id='rname'
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
              id='remail'
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
              id='rroll'
              style={{ width: "300px", margin: "auto" }}
            >
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

            <div
              className='row'
              id='rgender'
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
              id='rno'
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
              id='rprog'
              style={{ width: "300px", margin: "auto" }}
            >
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

            <div
              className='row'
              id='rbranch'
              style={{ width: "300px", margin: "auto" }}
            >
              <div className='input-field col s12'>
                <select name='branch' value={branch} onChange={onChange}>
                  <option value='' defaultValue disabled>
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
                <label>Branch</label>
              </div>
            </div>

            <div
              className='row'
              id='rpass'
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
                  minLength='3'
                  required
                />
                <label htmlFor='password'>Password</label>
              </div>
            </div>

            <div
              className='row'
              id='rcpass'
              style={{ width: "300px", margin: "auto" }}
            >
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
              <div className='row'>
                <button
                  className='btn waves-effect waves-light'
                  id='rbtn'
                  type='button'
                  value='Register'
                  onClick={onSubmit}
                  style={{
                    marginTop: "2em",
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

export default RegisterStudent;
