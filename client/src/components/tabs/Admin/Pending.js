import { useEffect, useContext } from 'react';
import AdminContext from '../../../context/admin/adminContext';
import PendingCard from '../../layout/Admin/Counsellors/PendingCard';
import AlertContext from '../../../context/alert/alertContext';
import Preloader from '../../layout/Preloader/Preloader';

const Pending = ({ tabKey, tabKeyCoun }) => {
	const adminContext = useContext(AdminContext);
	const alertContext = useContext(AlertContext);

	const { pending, loadPending } = adminContext;
	const { setAlert } = alertContext;

	useEffect(() => {
		if (tabKey === 'Counsellors') {
			if (tabKeyCoun === 'Pending') {
				loadPending();
			}
		}
		// eslint-disable-next-line
	}, [tabKey, tabKeyCoun]);

	if (!pending) {
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
			{pending.map((item) => {
				return (
					<PendingCard key={item.coun_id} user={item} setAlert={setAlert} />
				);
			})}
		</div>
	);
};

export default Pending;
