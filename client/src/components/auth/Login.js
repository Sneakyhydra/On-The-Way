// Imports
import { useState, useContext, useEffect } from 'react';
import AlertContext from '../../context/alert/alertContext';
import AuthContext from '../../context/auth/authContext';
import Preloader from '../layout/Preloader/Preloader';
import { useNavigate } from 'react-router-dom';

const Login = () => {
	const alertContext = useContext(AlertContext);
	const authContext = useContext(AuthContext);

	const navigate = useNavigate();

	const { setAlert } = alertContext;

	const { login, error, clearErrors, validate, isAuthenticated } = authContext;
	const [loginProgress, setLoginProgress] = useState(false);

	useEffect(() => {
		document.body.style.backgroundColor = 'white';
		validate();
		return () => {
			setLoginProgress(false);
		};
		// eslint-disable-next-line
	}, []);

	useEffect(() => {
		if (isAuthenticated) {
			navigate('/dashboard');
		}

		if (error === 'Invalid Credentials') {
			setAlert(error, 'danger');
		}

		setLoginProgress(false);
		clearErrors();
		// eslint-disable-next-line
	}, [error, isAuthenticated]);

	const [user, setUser] = useState({
		email: '',
		password: '',
	});

	const { email, password } = user;

	const onChange = (e) => {
		setUser({ ...user, [e.target.name]: e.target.value });
	};

	const onSubmit = async (e) => {
		e.preventDefault();
		setLoginProgress(true);

		if (email === '' || password === '') {
			setAlert('Please enter all fields', 'danger');
			setLoginProgress(false);
		} else {
			await login({
				user_email: email,
				user_password: password,
			});
		}
	};

	return (
		<div className='form-container' style={{ boxShadow: 'none' }}>
			<form onSubmit={onSubmit} style={{ margin: '10px auto', width: '80%' }}>
				<div className='form-group'>
					<label>Email address</label>
					<input
						type='email'
						className='form-control'
						placeholder='Enter email'
						name='email'
						value={email}
						onChange={onChange}
						required
					/>
				</div>

				<div className='form-group'>
					<label>Password</label>
					<input
						type='password'
						className='form-control'
						placeholder='Password'
						name='password'
						value={password}
						onChange={onChange}
						required
					/>
				</div>

				<button
					className='btn btn-primary'
					type='submit'
					disabled={loginProgress}
					style={{
						margin: '2rem auto',
						display: 'block',
						marginBottom: '1rem',
						backgroundColor: loginProgress ? 'inherit' : '',
					}}
				>
					{loginProgress ? <Preloader /> : 'Login'}
				</button>
			</form>
		</div>
	);
};

export default Login;
