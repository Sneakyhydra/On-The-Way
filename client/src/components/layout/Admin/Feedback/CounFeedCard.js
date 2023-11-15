import AdminContext from '../../../../context/admin/adminContext';
import AlertContext from '../../../../context/alert/alertContext';
import { useContext } from 'react';

const CounFeedCard = ({ feed }) => {
	const adminContext = useContext(AdminContext);
	const alertContext = useContext(AlertContext);
	const { deleteCounFeed } = adminContext;
	const { setAlert } = alertContext;

	const deleteFeed = () => {
		deleteCounFeed({
			feed_id: feed.feed_id,
		});
		setAlert('Deleted Successfully', 'success');
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
			<h3>{feed.coun_name}</h3>
			<strong>{feed.feed_desc}</strong>
			<div style={{ display: 'flex', gap: '1rem' }}>
				<button
					className='btn btn-danger'
					style={{
						margin: 'auto',
						marginTop: '1.5rem',
					}}
					onClick={deleteFeed}
				>
					X
				</button>
			</div>
		</div>
	);
};

export default CounFeedCard;
