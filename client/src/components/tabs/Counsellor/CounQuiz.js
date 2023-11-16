import { useEffect, useContext } from 'react';
import CounContext from '../../../context/counsellor/counContext';
import QuizQuesCard from '../../layout/Counsellor/Quiz/QuizQuesCard';
import AlertContext from '../../../context/alert/alertContext';
import Preloader from '../../layout/Preloader/Preloader';

const CounQuiz = ({ tabKey }) => {
	const counContext = useContext(CounContext);
	const alertContext = useContext(AlertContext);

	const { quesAns, loadQuesAns, error } = counContext;
	const { setAlert } = alertContext;

	useEffect(() => {
		if (error) {
			setAlert(error, 'danger');
		}
		// eslint-disable-next-line
	}, []);

	useEffect(() => {
		if (tabKey === 'Quiz') {
			loadQuesAns();
		}
		// eslint-disable-next-line
	}, [tabKey]);

	if (!quesAns) {
		return <Preloader marginClass='m-5' colorClass='success' />;
	}

	return (
		<div
			style={{
				borderRadius: '0.5rem',
				padding: '',
			}}
		>
			<form>
				{quesAns.map((item, idx) => {
					return (
						<div className='form-group' key={item.ques_id}>
							<QuizQuesCard question={item} quesAns={quesAns} idx={idx} />
						</div>
					);
				})}
			</form>
		</div>
	);
};

export default CounQuiz;
