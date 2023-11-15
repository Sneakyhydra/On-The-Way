// Imports
import { useState, useContext, useEffect } from 'react';
import AlertContext from '../../context/alert/alertContext';
import AuthContext from '../../context/auth/authContext';
import Preloader from '../layout/Preloader/Preloader';

const RegisterStudent = () => {
	const alertContext = useContext(AlertContext);
	const authContext = useContext(AuthContext);

	const { setAlert } = alertContext;

	const { regStudent, error, clearErrors, validate, isAuthenticated } =
		authContext;
	const [regProgress, setRegProgress] = useState(false);

	useEffect(() => {
		document.body.style.backgroundColor = '#ecf0f5';
		validate();
		return () => {
			setRegProgress(false);
		};
		// eslint-disable-next-line
	}, []);

	useEffect(() => {
		if (error === 'User already exists') {
			setAlert(error, 'danger');
		} else if (error === 'Role is not valid') {
			setAlert(error, 'danger');
		} else if (error === 'Gender is not valid') {
			setAlert(error, 'danger');
		} else if (error === 'Programme(dept) is not valid') {
			setAlert(error, 'danger');
		} else if (error === 'Branch is not valid') {
			setAlert(error, 'danger');
		}

		setRegProgress(false);
		clearErrors();
		// eslint-disable-next-line
	}, [error, isAuthenticated]);

	const [student, setStudent] = useState({
		email: '',
		password: '',
		password2: '',
		username: '',
		rollno: '',
		gender: '',
		phone: '',
		dept: '',
		branch: '',
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
		setStudent({ ...student, [e.target.name]: e.target.value });
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
		setRegProgress(true);

		if (
			email === '' ||
			password === '' ||
			password2 === '' ||
			username === '' ||
			rollno === '' ||
			gender === '' ||
			phone === '' ||
			dept === '' ||
			branch === ''
		) {
			setAlert('Please enter all fields', 'danger');
			setRegProgress(false);
		} else if (!validateEmail(email)) {
			setAlert('Email not valid', 'danger');
			setRegProgress(false);
		} else if (phone.length !== 10) {
			setAlert('Phone number should have 10 digits', 'danger');
			setRegProgress(false);
		} else if (password.length < 3) {
			setAlert('Password should be of atleast 3 characters', 'danger');
			setRegProgress(false);
		} else if (password !== password2) {
			setAlert('Passwords do not match', 'danger');
			setRegProgress(false);
		} else {
			await regStudent({
				user_email: email,
				user_password: password,
				role: 'student',
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
		<div className='pastelbg'>
			<header>
				<h1>Register as a Student</h1>
			</header>
			<div className='form-container'>
				<form onSubmit={onSubmit}>
					<div className='form-group'>
						<label>Name</label>
						<input
							type='username'
							className='form-control'
							placeholder='Enter name'
							name='username'
							value={username}
							onChange={onChange}
							required
						/>
					</div>

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
						<label>Roll Number</label>
						<input
							type='rollno'
							className='form-control'
							placeholder='Enter roll number'
							name='rollno'
							value={rollno}
							onChange={onChange}
							required
						/>
					</div>

					<div className='form-group'>
						<label>Gender</label>
						<select name='gender' value={gender} onChange={onChange}>
							<option value='' defaultValue disabled>
								Choose your option
							</option>
							<option value='Male'>Male</option>
							<option value='Female'>Female</option>
							<option value='Other'>Other</option>
						</select>
					</div>

					<div className='form-group'>
						<label>Mobile Number</label>
						<input
							type='phone'
							className='form-control'
							placeholder='Enter mobile number'
							name='phone'
							value={phone}
							onChange={onChange}
							required
						/>
					</div>

					<div className='form-group'>
						<label>Programme</label>
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
					</div>

					<div className='form-group'>
						<label>Branch</label>
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
					</div>

					<div className='form-group'>
						<label>Password</label>
						<input
							type='password'
							className='form-control'
							placeholder='Enter Password'
							name='password'
							value={password}
							onChange={onChange}
							minLength='3'
							required
						/>
					</div>

					<div className='form-group'>
						<label>Confirm Password</label>
						<input
							type='password'
							className='form-control'
							placeholder='Confirm Password'
							name='password2'
							value={password2}
							onChange={onChange}
							minLength='3'
							required
						/>
					</div>

					<button
						className='btn btn-primary'
						type='submit'
						disabled={regProgress}
						style={{
							margin: '2rem auto',
							display: 'block',
							marginBottom: '1rem',
							backgroundColor: regProgress ? 'inherit' : '',
						}}
					>
						{regProgress ? <Preloader /> : 'Register'}
					</button>
				</form>
			</div>
		</div>
	);
};

export default RegisterStudent;
