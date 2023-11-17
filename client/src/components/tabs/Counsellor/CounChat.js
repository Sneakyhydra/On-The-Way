import { useEffect, useContext, useState } from 'react';
import CounContext from '../../../context/counsellor/counContext';
import AlertContext from '../../../context/alert/alertContext';
import Preloader from '../../layout/Preloader/Preloader';
import CounMess from '../../layout/Counsellor/Chat/CounMess';
import CounUsers from '../../layout/Counsellor/Chat/CounUsers';

const CounChat = ({ tabKey, student, setStudent }) => {
	const counContext = useContext(CounContext);
	const alertContext = useContext(AlertContext);
	const [isMobile, setIsMobile] = useState(false);

	const { loadMessages, messages, students, loadStudents } = counContext;
	const { setAlert } = alertContext;

	useEffect(() => {
		const handleResize = () => {
			setIsMobile(window.innerWidth <= 768);
		};

		window.addEventListener('resize', handleResize);

		handleResize();

		return () => {
			window.removeEventListener('resize', handleResize);
		};
	}, []);

	useEffect(() => {
		if (tabKey === 'Chat') {
			loadStudents();
			loadMessages();
		}
		// eslint-disable-next-line
	}, [tabKey]);

	if (!messages || !students) {
		return <Preloader marginClass='m-5' colorClass='success' />;
	}

	return (
		<div className='chat' style={{ borderRadius: '0.5rem' }}>
			{isMobile && (student === null || student === 0) && (
				<CounUsers
					setStudent={setStudent}
					setAlert={setAlert}
					users={students}
					student={student}
				/>
			)}
			{!isMobile && (
				<CounUsers
					setStudent={setStudent}
					setAlert={setAlert}
					users={students}
					student={student}
				/>
			)}
			{isMobile && student !== null && student !== 0 && (
				<CounMess
					setAlert={setAlert}
					messages={messages}
					student={student}
					setStudent={setStudent}
				/>
			)}
			{!isMobile && (
				<CounMess
					setAlert={setAlert}
					messages={messages}
					student={student}
					setStudent={setStudent}
				/>
			)}
		</div>
	);
};

export default CounChat;
