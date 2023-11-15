import { useEffect, useContext } from 'react';
import AdminContext from '../../../context/admin/adminContext';
import StudFeedCard from '../../layout/Admin/Feedback/StudFeedCard';
import AlertContext from '../../../context/alert/alertContext';
import Preloader from '../../layout/Preloader/Preloader';

const AdminStudFeed = ({ tabKey, tabKeyFeed }) => {
	const adminContext = useContext(AdminContext);
	const alertContext = useContext(AlertContext);

	const { studfeed, loadStudFeed } = adminContext;
	const { setAlert } = alertContext;

	useEffect(() => {
		if (tabKey === 'Feedback') {
			if (tabKeyFeed === 'AdminStudFeed') {
				loadStudFeed();
			}
		}
		// eslint-disable-next-line
	}, [tabKey, tabKeyFeed]);

	if (!studfeed) {
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
			{studfeed.map((item) => {
				return (
					<StudFeedCard key={item.feed_id} feed={item} setAlert={setAlert} />
				);
			})}
		</div>
	);
};

export default AdminStudFeed;
