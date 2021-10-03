import { useContext, useEffect, useState } from "react";
import AlertContext from "../../../context/alert/alertContext";
import AuthContext from "../../../context/auth/authContext";
import M from "materialize-css/dist/js/materialize.min.js";

const DisplayAdmin = ({ user, setEdit }) => {
  const alertContext = useContext(AlertContext);
  const authContext = useContext(AuthContext);

  useEffect(() => {
    M.AutoInit();
    M.updateTextFields();
    //eslint-disable-next-line
  }, []);

  const { setAlert } = alertContext;

  const { error, clearErrors } = authContext;

  const { admin_name, user_email, admin_phone, admin_gender } = user;

  const onEdit = () => {
    setEdit(true);
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
            <span className='font-weight-bold'>{admin_name}</span>
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
                value={user_email}
                readOnly
                disabled
              />
              <label htmlFor='email'>Email</label>
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
                value={admin_phone}
                disabled
                readOnly
              />
              <label htmlFor='phone' className='active'>
                Mobile Number
              </label>
            </div>
          </div>

          <div className='row'>
            <button
              className='btn waves-effect waves-light'
              value='Edit'
              onClick={onEdit}
              style={{ marginTop: "2em", borderRadius: "2em", width: "13em" }}
            >
              Edit Profile
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DisplayAdmin;
