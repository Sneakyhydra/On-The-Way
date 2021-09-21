import { useState } from "react";

const Login = () => {
  const [user, setUser] = useState({
    username: "",
    password: "",
  });

  const { username, password } = user;

  const onChange = (e) => setUser({ ...user, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    console.log("Login submit");
  };

  return (
    <div className='center'>
      <div className='row'>
        <h4>Login</h4>
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
              <label htmlFor='username'>Username</label>
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
                required
              />
              <label htmlFor='password'>Password</label>
            </div>
          </div>

          <div className='row'>
            <button
              className='btn waves-effect waves-light'
              type='submit'
              value='Login'
            >
              Login
              <i className='material-icons right'>send</i>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
