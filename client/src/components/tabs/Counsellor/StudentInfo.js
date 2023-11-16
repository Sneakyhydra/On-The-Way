import { useEffect, useContext } from 'react';
import CounContext from '../../../context/counsellor/counContext';
import StudCard from '../../layout/Counsellor/Stud/StudCard';
import Preloader from '../../layout/Preloader/Preloader';

const StudentInfo = ({ tabKey, setTabKey, setStudent }) => {
	const counContext = useContext(CounContext);
	const { students, loadStudents } = counContext;

	useEffect(() => {
		if (tabKey === 'StudentInfo') {
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
				return (
					<StudCard
						key={item.stud_id}
						user={item}
						setTabKey={setTabKey}
						setStudent={setStudent}
					/>
				);
			})}
		</div>
	);
};

export default StudentInfo;
