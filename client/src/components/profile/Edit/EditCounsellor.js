import { useState, useContext, useEffect } from "react";
import AlertContext from "../../../context/alert/alertContext";
import AuthContext from "../../../context/auth/authContext";
import M from "materialize-css/dist/js/materialize.min.js";

const EditCounsellor = ({ user }) => {
  const alertContext = useContext(AlertContext);
  const authContext = useContext(AuthContext);

  const { setAlert } = alertContext;

  const { editCounsellor } = authContext;

  useEffect(() => {
    M.AutoInit();
    M.updateTextFields();
    //eslint-disable-next-line
  }, []);

  const { coun_name, user_email, coun_phone, coun_gender, coun_type } = user;

  const [counsellor, setCounsellor] = useState({
    email: user_email,
    username: coun_name,
    gender: coun_gender,
    phone: coun_phone,
    type: coun_type,
  });

  const { email, username, gender, phone, type } = counsellor;

  const onChange = (e) => {
    M.updateTextFields();

    setCounsellor({ ...counsellor, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();

    if (
      email === "" ||
      username === "" ||
      gender === "" ||
      phone === "" ||
      type === ""
    ) {
      setAlert("Please enter all fields", "danger");
    } else {
      editCounsellor({
        user_email: email,
        role: "counsellor",
        stud_name: username,
        stud_gender: gender,
        stud_phone: phone,
        coun_type: type,
      });
    }
  };

  return (
    <div className='container rounded bg-white mt-3 mb-5'>
      <div className='row'>
        <div className='col-md-3 border-right'>
          <div className='d-flex flex-column align-items-center text-center p-3 py-5'>
            <img
              className='rounded-circle mt-0'
              width='150px'
              alt='Profile'
              src='https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg'
            />
            <span className='font-weight-bold'>{coun_name}</span>
            <span className='text-black-50'>{user_email}</span>
            <span> </span>
          </div>
        </div>

        <form className='col-md-6' onSubmit={onSubmit}>
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

          <div className='row'>
            <button
              className='btn waves-effect waves-light'
              type='submit'
              value='Register'
              style={{ marginTop: "2em", borderRadius: "2em", width: "13em" }}
            >
              Save Profile
              <i className='material-icons right' style={{ marginLeft: "0px" }}>
                check
              </i>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditCounsellor;
