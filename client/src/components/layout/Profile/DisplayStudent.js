import { useState, useContext, useEffect } from 'react';
import AuthContext from '../../../context/auth/authContext';
import AlertContext from '../../../context/alert/alertContext';
import male from '../../../images/Avatar/male.jpg';
import female from '../../../images/Avatar/female.png';
import other from '../../../images/Avatar/other.jpg';
import Preloader from '../Preloader/Preloader';

const DisplayStudent = () => {
	const authContext = useContext(AuthContext);
	const alertContext = useContext(AlertContext);
	const { user, editStudent } = authContext;
	const { setAlert } = alertContext;

	const [edit, setEdit] = useState(false);
	const [regProgress, setRegProgress] = useState(false);

	const {
		stud_name,
		user_email,
		stud_phone,
		stud_gender,
		stud_dept,
		stud_branch,
		roll_no,
		user_id,
		cpi,
		response,
	} = user;

	let CPI = cpi;
	if (!cpi) {
		CPI = 'Not Found';
	}

	const [student, setStudent] = useState({
		email: user_email,
		username: stud_name,
		gender: stud_gender,
		phone: stud_phone,
		dept: stud_dept,
		branch: stud_branch,
		rollno: roll_no,
		id: user_id,
		password: '',
	});

	const { email, username, gender, phone, dept, branch, id, password, rollno } =
		student;

	useEffect(() => {
		setStudent({
			email: user_email,
			username: stud_name,
			gender: stud_gender,
			phone: stud_phone,
			dept: stud_dept,
			branch: stud_branch,
			rollno: roll_no,
			id: user_id,
			password: password,
		});
		// eslint-disable-next-line
	}, [
		stud_name,
		user_email,
		stud_phone,
		stud_gender,
		stud_dept,
		stud_branch,
		roll_no,
	]);

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
			dept === '' ||
			branch === '' ||
			rollno === ''
		) {
			setAlert('Please enter all fields', 'danger');
		} else if (!validateEmail(email)) {
			setAlert('Email not valid', 'danger');
		} else if (phone.length !== 10) {
			setAlert('Phone number should have 10 digits', 'danger');
		} else if (password.length < 3) {
			setAlert('Password should be of atleast 3 characters', 'danger');
		} else {
			// eslint-disable-next-line
			await editStudent({
				user_email: email,
				role: 'student',
				stud_name: username,
				stud_gender: gender,
				stud_phone: phone,
				stud_id: id,
				user_password: password,
				stud_dept: dept,
				stud_branch: branch,
				roll_no: rollno,
			});

			setRegProgress(false);
			setEdit(false);
		}
	};

	const onCancel = () => {
		setEdit(false);
		setStudent({
			email: user_email,
			username: stud_name,
			gender: stud_gender,
			phone: stud_phone,
			dept: stud_dept,
			branch: stud_branch,
			rollno: roll_no,
			id: user_id,
			password: '',
		});
	};

	const onChange = (e) => {
		setStudent({ ...student, [e.target.name]: e.target.value });
	};

	let avatar = null;
	if (stud_gender === 'Male') {
		avatar = (
			<img
				className='rounded-circle mt-0'
				width='150px'
				alt='Profile'
				src={male}
			/>
		);
	} else if (stud_gender === 'Female') {
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
					{stud_name}
				</span>
				<span className='text-black-50'>{user_email}</span>
				<span className='text-black-50'>CPI: {CPI}</span>
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
						<label>Roll number</label>
						<input
							type='text'
							className='form-control'
							placeholder='Enter roll no'
							name='rollno'
							value={rollno}
							onChange={onChange}
							disabled={!edit}
						/>
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

					<div className='form-group'>
						<label>Programme</label>
						<select
							name='dept'
							value={dept}
							onChange={onChange}
							disabled={!edit}
						>
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
						<select
							name='branch'
							value={branch}
							onChange={onChange}
							disabled={!edit}
						>
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
								minLength='3'
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

			<div
				style={{ display: 'flex', flexDirection: 'column', padding: '2rem' }}
			>
				{response.length > 0 ? (
					<h5 style={{ color: '#2c363f' }}>Response from last quiz</h5>
				) : (
					'Take the quiz for a personal response'
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
						: ''}
				</ul>
			</div>
		</div>
	);
};

export default DisplayStudent;
