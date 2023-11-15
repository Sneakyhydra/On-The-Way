import { useEffect, useContext } from 'react';
import AdminContext from '../../../context/admin/adminContext';
import ApprovedCard from '../../layout/Admin/Counsellors/ApprovedCard';
import AlertContext from '../../../context/alert/alertContext';
import Preloader from '../../layout/Preloader/Preloader';

const Approved = ({ tabKey, tabKeyCoun }) => {
	const adminContext = useContext(AdminContext);
	const alertContext = useContext(AlertContext);

	const { approved, loadApproved } = adminContext;
	const { setAlert } = alertContext;

	useEffect(() => {
		if (tabKey === 'Counsellors') {
			if (tabKeyCoun === 'Approved') {
				loadApproved();
			}
		}
		// eslint-disable-next-line
	}, [tabKey, tabKeyCoun]);

	if (!approved) {
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
			{approved.map((item) => {
				return (
					<ApprovedCard key={item.coun_id} user={item} setAlert={setAlert} />
				);
			})}
		</div>
	);
};

export default Approved;
