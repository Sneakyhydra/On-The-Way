import { useEffect, useContext } from 'react';
import CounContext from '../../../context/counsellor/counContext';
import AlertContext from '../../../context/alert/alertContext';
import Preloader from '../../layout/Preloader/Preloader';
import CounMess from '../../layout/Counsellor/Chat/CounMess';
import CounUsers from '../../layout/Counsellor/Chat/CounUsers';

const CounChat = ({ tabKey, student, setStudent }) => {
	const counContext = useContext(CounContext);
	const alertContext = useContext(AlertContext);

	const { loadMessages, messages, error, students, loadStudents } = counContext;
	const { setAlert } = alertContext;

	// Load the user when dashboard is rendered
	useEffect(() => {
		if (error) {
			setAlert(error, 'danger');
		}
		// eslint-disable-next-line
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
		<div className='chat'>
			<CounUsers
				setStudent={setStudent}
				setAlert={setAlert}
				users={students}
				student={student}
			/>
			<CounMess setAlert={setAlert} messages={messages} student={student} />
		</div>
	);
};

export default CounChat;
