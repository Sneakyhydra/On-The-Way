import { useEffect, useContext, useState } from 'react';
import StudContext from '../../../context/student/studContext';
import AlertContext from '../../../context/alert/alertContext';
import Preloader from '../../layout/Preloader/Preloader';
import StudMess from '../../layout/Student/Chat/StudMess';
import StudUsers from '../../layout/Student/Chat/StudUsers';

const StudChat = ({ tabKey, counsellor, setCounsellor }) => {
	const studContext = useContext(StudContext);
	const alertContext = useContext(AlertContext);
	const [isMobile, setIsMobile] = useState(false);

	const { loadMessages, messages, counsellors, loadCounsellors } = studContext;
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
			loadCounsellors();
			loadMessages();
		}
		// eslint-disable-next-line
	}, [tabKey]);

	if (!messages || !counsellors) {
		return <Preloader marginClass='m-5' colorClass='success' />;
	}

	return (
		<div className='chat' style={{ borderRadius: '0.5rem' }}>
			{isMobile && (counsellor === null || counsellor === 0) && (
				<StudUsers
					setCounsellor={setCounsellor}
					setAlert={setAlert}
					users={counsellors}
					counsellor={counsellor}
				/>
			)}
			{!isMobile && (
				<StudUsers
					setCounsellor={setCounsellor}
					setAlert={setAlert}
					users={counsellors}
					counsellor={counsellor}
				/>
			)}
			{isMobile && counsellor !== null && counsellor !== 0 && (
				<StudMess
					setAlert={setAlert}
					messages={messages}
					counsellor={counsellor}
					setCounsellor={setCounsellor}
				/>
			)}
			{!isMobile && (
				<StudMess
					setAlert={setAlert}
					messages={messages}
					counsellor={counsellor}
					setCounsellor={setCounsellor}
				/>
			)}
		</div>
	);
};

export default StudChat;
