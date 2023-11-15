import { useEffect, useContext } from 'react';
import AdminContext from '../../../context/admin/adminContext';
import AlertContext from '../../../context/alert/alertContext';
import QuestionsCard from '../../layout/Admin/Quiz/QuestionsCard';
import Preloader from '../../layout/Preloader/Preloader';

const AdminQuiz = ({ tabKey }) => {
	const adminContext = useContext(AdminContext);
	const alertContext = useContext(AlertContext);

	const { quesAns, loadQuesAns, updateQuiz, error } = adminContext;
	const { setAlert } = alertContext;

	// Load the user when dashboard is rendered
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

	let editedQuesAns = [...quesAns];

	const onSubmit = (e) => {
		e.preventDefault();

		updateQuiz({
			quesAns: editedQuesAns,
		});
		setAlert('Quiz Updated', 'success');
	};

	return (
		<div
			style={{
				borderRadius: '0.5rem',
				padding: '',
			}}
		>
			<form onSubmit={onSubmit}>
				{editedQuesAns.map((item, idx) => {
					return (
						<div className='form-group' key={item.ques_id}>
							<QuestionsCard
								editedQuesAns={editedQuesAns}
								question={item}
								idx={idx}
							/>
						</div>
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
					Save
				</button>
			</form>
		</div>
	);
};

export default AdminQuiz;
