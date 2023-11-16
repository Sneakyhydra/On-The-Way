import QuesAnsCard from './QuesAnsCard';

const QuizQuesCard = ({ question, idx, quesAns }) => {
	const { ques_no, ques_desc } = question;

	return (
		<div
			style={{
				display: 'flex',
				flexDirection: 'column',
				boxShadow: '0 0 5px 0 rgba(0,0,0,0.3)',
				borderRadius: '0.5rem',
				padding: '1rem 3rem',
				backgroundColor: 'white',
			}}
		>
			<h3>{'Question ' + ques_no.toString()}</h3>
			<input
				type='textarea'
				className='form-control'
				placeholder='Description'
				name='quesDesc'
				value={ques_desc}
				disabled
			/>
			<hr />

			{quesAns[idx].answers.map((item, aidx) => {
				return <QuesAnsCard key={item.ans_id} answer={item} />;
			})}
		</div>
	);
};

export default QuizQuesCard;
