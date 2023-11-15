import { useState, useContext, useEffect } from 'react';
import AuthContext from '../../../context/auth/authContext';
import AlertContext from '../../../context/alert/alertContext';
import male from '../../../images/Avatar/male.jpg';
import female from '../../../images/Avatar/female.png';
import other from '../../../images/Avatar/other.jpg';
import Preloader from '../Preloader/Preloader';

const DisplayAdmin = () => {
	const authContext = useContext(AuthContext);
	const alertContext = useContext(AlertContext);
	const { user, editAdmin } = authContext;
	const { setAlert } = alertContext;

	const [edit, setEdit] = useState(false);
	const [regProgress, setRegProgress] = useState(false);

	const { admin_name, user_email, admin_phone, admin_gender, user_id } = user;
	const [admin, setAdmin] = useState({
		username: admin_name,
		email: user_email,
		phone: admin_phone,
		gender: admin_gender,
		password: '',
		id: user_id,
	});

	const { username, email, phone, gender, password, id } = admin;

	useEffect(() => {
		setAdmin({
			username: admin_name,
			email: user_email,
			phone: admin_phone,
			gender: admin_gender,
			password: password,
			id: user_id,
		});
		// eslint-disable-next-line
	}, [admin_name, user_email, admin_phone, admin_gender]);

	const validateEmail = (mail) => {
		// eslint-disable-next-line
		if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
			return true;
		}
		return false;
	};

	const onSave = async (e) => {
		e.preventDefault();
		setRegProgress(true);
		if (
			email === '' ||
			username === '' ||
			gender === '' ||
			phone === '' ||
			password === ''
		) {
			setAlert('Please enter all fields', 'danger');
		} else if (!validateEmail(email)) {
			setAlert('Email not valid', 'danger');
		} else if (phone.length !== 10) {
			setAlert('Phone number should have 10 digits', 'danger');
		} else if (password.length < 6) {
			setAlert('Password should be of atleast 6 characters', 'danger');
		} else {
			// eslint-disable-next-line
			await editAdmin({
				user_email: email,
				role: 'admin',
				admin_name: username,
				admin_gender: gender,
				admin_phone: phone,
				admin_id: id,
				user_password: password,
			});

			setRegProgress(false);
			setEdit(false);
		}
	};

	const onCancel = () => {
		setEdit(false);
		setAdmin({
			username: admin_name,
			email: user_email,
			phone: admin_phone,
			gender: admin_gender,
			password: '',
			id: user_id,
		});
	};

	const onChange = (e) => {
		setAdmin({ ...admin, [e.target.name]: e.target.value });
	};

	let avatar = null;
	if (admin_gender === 'Male') {
		avatar = (
			<img
				className='rounded-circle mt-0'
				width='150px'
				alt='Profile'
				src={male}
			/>
		);
	} else if (admin_gender === 'Female') {
		avatar = (
			<img
				className='rounded-circle'
				width='150px'
				alt='Profile'
				style={{ marginBottom: '1rem', marginTop: '1.25rem' }}
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
			style={{
				display: 'flex',
				flexWrap: 'wrap',
				justifyContent: 'space-evenly',
				gap: '2rem',
			}}
		>
			<div
				style={{
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
				}}
			>
				{avatar}
				<span className='font-weight-bold' style={{ color: '#2c363f' }}>
					{admin_name}
				</span>
				<span className='text-black-50'>{user_email}</span>
			</div>
			<div
				style={{
					padding: '1.5rem 1rem',
					display: 'flex',
					justifyContent: 'center',
				}}
			>
				<form onSubmit={onSave}>
					<div className='form-group'>
						<label>Name</label>
						<input
							type='text'
							className='form-control'
							placeholder='Enter name'
							name='username'
							value={username}
							onChange={onChange}
							disabled={!edit}
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
							disabled={!edit}
						/>
					</div>

					<div className='form-group'>
						<label>Gender</label>
						<select
							name='gender'
							value={gender}
							onChange={onChange}
							disabled={!edit}
						>
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
							disabled={!edit}
						/>
					</div>

					{!edit && (
						<button
							className='btn btn-primary'
							disabled={regProgress}
							style={{
								margin: '2rem auto',
								display: 'block',
								marginBottom: '1rem',
							}}
							onClick={() => {
								setEdit(true);
							}}
						>
							Edit
						</button>
					)}

					{edit && (
						<div className='form-group'>
							<label>Password</label>
							<input
								type='password'
								className='form-control'
								placeholder='Enter Password'
								name='password'
								value={password}
								onChange={onChange}
								disabled={!edit}
								minLength='6'
							/>
						</div>
					)}

					{edit && (
						<div
							style={{
								display: 'flex',
								flexWrap: 'wrap',
								justifyContent: 'center',
								gap: '1rem',
							}}
						>
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
								{regProgress ? <Preloader /> : 'Save'}
							</button>
							{!regProgress && (
								<button
									className='btn btn-danger'
									disabled={regProgress}
									style={{
										margin: '2rem auto',
										display: 'block',
										marginBottom: '1rem',
									}}
									onClick={onCancel}
								>
									Cancel
								</button>
							)}
						</div>
					)}
				</form>
			</div>
		</div>
	);
};

export default DisplayAdmin;
