import { useEffect, useState } from 'react';
import AnswersCard from './AnswersCard';

const QuestionsCard = ({ editedQuesAns, question, idx }) => {
	const { ques_no, ques_desc, ques_id } = question;
	const [ques, setQues] = useState({
		quesId: ques_id,
		quesNo: ques_no,
		quesDesc: ques_desc,
	});
	const { quesNo, quesDesc } = ques;

	const changeQues = (e) => {
		setQues({ ...ques, [e.target.name]: e.target.value });

		editedQuesAns[idx] = {
			...editedQuesAns[idx],
			[e.target.name]: e.target.value,
		};
	};

	useEffect(() => {
		editedQuesAns[idx].ques_desc = quesDesc;
		editedQuesAns[idx].ques_no = parseInt(quesNo);
		//eslint-disable-next-line
	}, [ques]);

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
			<h3>{'Question ' + quesNo.toString()}</h3>
			<input
				type='textarea'
				className='form-control'
				placeholder='Description'
				name='quesDesc'
				value={quesDesc}
				onChange={changeQues}
			/>
			<hr />

			{editedQuesAns[idx].answers.map((item, aidx) => {
				return (
					<AnswersCard
						key={item.ans_id}
						answer={item}
						editedQuesAns={editedQuesAns}
						aidx={aidx}
						idx={idx}
						ques={ques}
						setQues={setQues}
					/>
				);
			})}
		</div>
	);
};

export default QuestionsCard;
