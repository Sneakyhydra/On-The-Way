import { useEffect, useContext } from 'react';
import AdminContext from '../../../context/admin/adminContext';
import CounFeedCard from '../../layout/Admin/Feedback/CounFeedCard';
import AlertContext from '../../../context/alert/alertContext';
import Preloader from '../../layout/Preloader/Preloader';

const AdminCounFeed = ({ tabKey, tabKeyFeed }) => {
	const adminContext = useContext(AdminContext);
	const alertContext = useContext(AlertContext);

	const { counfeed, loadCounFeed } = adminContext;
	const { setAlert } = alertContext;

	useEffect(() => {
		if (tabKey === 'Feedback') {
			if (tabKeyFeed === 'AdminCounFeed') {
				loadCounFeed();
			}
		}
		// eslint-disable-next-line
	}, [tabKey, tabKeyFeed]);

	if (!counfeed) {
		return <Preloader marginClass='m-5' colorClass='success' />;
	}

	return (
		<div
			style={{
				borderRadius: '0.5rem',
				display: 'flex',
				flexDirection: 'row',
				flexWrap: 'wrap',
				gap: '2rem',
				paddingTop: '2rem',
			}}
		>
			{counfeed.map((item) => {
				return (
					<CounFeedCard key={item.feed_id} feed={item} setAlert={setAlert} />
				);
			})}
		</div>
	);
};

export default AdminCounFeed;
