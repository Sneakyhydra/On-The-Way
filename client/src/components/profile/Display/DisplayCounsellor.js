import { useEffect } from "react";
import M from "materialize-css/dist/js/materialize.min.js";

const DisplayCounsellor = ({ user, setEdit }) => {
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
  } = user;

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
            <span className='font-weight-bold'>{coun_name}</span>
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
                value={coun_name}
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
              <select name='gender' value={coun_gender} disabled readOnly>
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
                value={coun_phone}
                disabled
                readOnly
              />
              <label htmlFor='phone' className='active'>
                Mobile Number
              </label>
            </div>
          </div>

          <div className='row' style={{ width: "300px", margin: "auto" }}>
            <div className='input-field col s12'>
              <select name='dept' value={coun_dept} disabled readOnly>
                <option value=''>Choose your option</option>
                <option value='B.Tech'>B.Tech</option>
                <option value='M.Tech'>M.Tech</option>
                <option value='B.Des'>B.Des</option>
                <option value='M.Des'>M.Des</option>
                <option value='P.hd'>P.hd</option>
              </select>
              <label>Programme</label>
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

export default DisplayCounsellor;
