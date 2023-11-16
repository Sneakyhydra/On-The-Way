import { useState, useContext } from 'react';
import AlertContext from '../../../context/alert/alertContext';
import CounContext from '../../../context/counsellor/counContext';
import AuthContext from '../../../context/auth/authContext';

const CounFeed = () => {
	const [desc, setDesc] = useState('');

	const alertContext = useContext(AlertContext);
	const counContext = useContext(CounContext);
	const authContext = useContext(AuthContext);

	const { setAlert } = alertContext;
	const { user } = authContext;
	const { submitFeed } = counContext;

	const onChange = (e) => {
		setDesc(e.target.value);
	};

	const onSubmit = (e) => {
		e.preventDefault();

		if (desc === '') {
			setAlert('Please enter feedback', 'danger');
		} else {
			submitFeed({
				coun_id: user.user_id,
				desc: desc,
			});

			setAlert('Submitted Successfully', 'success');

			setDesc('');
		}
	};

	return (
		<div
			style={{
				borderRadius: '0.5rem',
				padding: '',
			}}
		>
			<form onSubmit={onSubmit}>
				<div
					style={{
						display: 'flex',
						flexDirection: 'column',
						boxShadow: '0 0 5px 0 rgba(0,0,0,0.3)',
						borderRadius: '0.5rem',
						padding: '1rem 3rem',
						backgroundColor: 'white',
					}}
				>
					<h3>Feedback</h3>
					<input
						type='textarea'
						className='form-control'
						placeholder='Feedback'
						name='desc'
						id='desc'
						value={desc}
						onChange={onChange}
					/>
				</div>

				<button
					className='btn btn-primary'
					type='submit'
					style={{
						margin: '2rem auto',
						display: 'block',
						marginBottom: '1rem',
					}}
				>
					Send Feedback
				</button>
			</form>
		</div>
	);
};

export default CounFeed;
