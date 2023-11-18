import { useEffect, useContext, useState } from 'react';
import StudContext from '../../../context/student/studContext';
import StudQuesCard from '../../layout/Student/Quiz/StudQuesCard';
import AlertContext from '../../../context/alert/alertContext';
import AuthContext from '../../../context/auth/authContext';
import Preloader from '../../layout/Preloader/Preloader';

const StudQuiz = ({ tabKey, setTabKey }) => {
	const studContext = useContext(StudContext);
	const alertContext = useContext(AlertContext);
	const authContext = useContext(AuthContext);

	const { quesAns, loadQuesAns, error, submitQuiz } = studContext;
	const { setAlert } = alertContext;
	const { user, loadUser } = authContext;

	const [quiz, setQuiz] = useState({});
	const [submitted, setSubmitted] = useState(false);

	// Load the user when dashboard is rendered
	useEffect(() => {
		if (error) {
			setAlert(error, 'danger');
		}
		// eslint-disable-next-line
	}, []);

	useEffect(() => {
		if (submitted === true) {
			setTabKey('Profile');
		}
		setSubmitted(false);
		// eslint-disable-next-line
	}, [submitted]);

	useEffect(() => {
		if (tabKey === 'Quiz') {
			loadQuesAns();
		}
		// eslint-disable-next-line
	}, [tabKey]);

	if (!quesAns) {
		return <Preloader marginClass='m-5' colorClass='success' />;
	}

	const onSubmit = (e) => {
		e.preventDefault();

		let date;
		date = new Date();
		date =
			date.getUTCFullYear() +
			'-' +
			('00' + (date.getUTCMonth() + 1)).slice(-2) +
			'-' +
			('00' + date.getUTCDate()).slice(-2) +
			' ' +
			('00' + date.getUTCHours()).slice(-2) +
			':' +
			('00' + date.getUTCMinutes()).slice(-2) +
			':' +
			('00' + date.getUTCSeconds()).slice(-2);

		submitQuiz({
			quesAns: quiz,
			stud_id: user.user_id,
			date: date,
		});
		setAlert('Quiz Submitted', 'success');
		loadUser();

		setQuiz({});
		setSubmitted(true);
	};

	return (
		<div
			style={{
				borderRadius: '0.5rem',
				padding: '',
			}}
		>
			<form onSubmit={onSubmit}>
				{quesAns.map((item, idx) => {
					return (
						<StudQuesCard
							quesAns={quesAns}
							key={item.ques_id}
							question={item}
							idx={idx}
							quiz={quiz}
							setQuiz={setQuiz}
							submitted={submitted}
						/>
					);
				})}
				<button
					className='btn btn-primary'
					type='submit'
					style={{
						margin: '2rem auto',
						display: 'block',
						marginBottom: '1rem',
					}}
				>
					Submit
				</button>
			</form>
		</div>
	);
};

export default StudQuiz;
