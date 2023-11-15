import { useEffect, useContext } from 'react';
import AdminContext from '../../../context/admin/adminContext';
import StudCard from '../../layout/Admin/Stud/StudCard';
import Preloader from '../../layout/Preloader/Preloader';

const Students = ({ tabKey }) => {
	const adminContext = useContext(AdminContext);
	const { students, loadStudents } = adminContext;

	useEffect(() => {
		if (tabKey === 'Students') {
			loadStudents();
		}
		// eslint-disable-next-line
	}, [tabKey]);

	if (!students) {
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
			{students.map((item) => {
				return <StudCard key={item.stud_id} user={item} />;
			})}
		</div>
	);
};

export default Students;
