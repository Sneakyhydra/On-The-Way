import { useEffect, useContext } from 'react';
import AdminContext from '../../../context/admin/adminContext';
import RejectedCard from '../../layout/Admin/Counsellors/RejectedCard';
import AlertContext from '../../../context/alert/alertContext';
import Preloader from '../../layout/Preloader/Preloader';

const Rejected = ({ tabKey, tabKeyCoun }) => {
	const adminContext = useContext(AdminContext);
	const alertContext = useContext(AlertContext);

	const { rejected, loadRejected } = adminContext;
	const { setAlert } = alertContext;

	useEffect(() => {
		if (tabKey === 'Counsellors') {
			if (tabKeyCoun === 'Rejected') {
				loadRejected();
			}
		}
		// eslint-disable-next-line
	}, [tabKey, tabKeyCoun]);

	if (!rejected) {
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
			{rejected.map((item) => {
				return (
					<RejectedCard key={item.coun_id} user={item} setAlert={setAlert} />
				);
			})}
		</div>
	);
};

export default Rejected;
