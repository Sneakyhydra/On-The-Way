import { useContext } from 'react';
import AdminContext from '../../../../context/admin/adminContext';

const RejectedCard = ({ user, setAlert }) => {
	const { coun_name, coun_gender, coun_phone, coun_dept, coun_id } = user;
	const adminContext = useContext(AdminContext);

	const { approveCoun } = adminContext;

	const approve = () => {
		approveCoun(coun_id);
		setAlert('Approved', 'success');
	};

	return (
		<div
			style={{
				display: 'flex',
				flexDirection: 'column',
				boxShadow: '0 0 5px 0 rgba(0,0,0,0.3)',
				borderRadius: '0.5rem',
				padding: '1rem 3rem',
				backgroundColor: 'white',
				width: '300px',
			}}
		>
			<h3>{coun_name}</h3>
			<strong>{coun_dept}</strong>
			<br />
			{coun_gender}
			<br />
			{coun_phone}

			<div style={{ display: 'flex', gap: '1rem' }}>
				<button
					className='btn btn-primary'
					style={{
						margin: 'auto',
						marginTop: '1.5rem',
						display: 'block',
					}}
					onClick={approve}
				>
					&#10003;
				</button>
			</div>
		</div>
	);
};

export default RejectedCard;
