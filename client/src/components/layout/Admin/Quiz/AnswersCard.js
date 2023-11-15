import { useEffect, useState } from 'react';

const AnswersCard = ({ answer, editedQuesAns, aidx, idx, ques, setQues }) => {
	const { ans_no, ans_desc, response, ans_id } = answer;
	const [ans, setAns] = useState({
		ansId: ans_id,
		ansNo: ans_no,
		ansDesc: ans_desc,
		resp: response,
	});
	const { ansNo, ansDesc, resp } = ans;

	const changeAns = (e) => {
		setAns({ ...ans, [e.target.name]: e.target.value });

		editedQuesAns[idx].answers[aidx] = {
			...editedQuesAns[idx].answers[aidx],
			[e.target.name]: e.target.value,
		};
	};

	useEffect(() => {
		editedQuesAns[idx].answers[aidx].ans_desc = ansDesc;
		editedQuesAns[idx].answers[aidx].ans_no = parseInt(ansNo);
		editedQuesAns[idx].answers[aidx].response = resp;
		setQues({
			...ques,
			ques_no: ques.ques_no,
			ques_desc: ques.ques_desc + '',
		});
		//eslint-disable-next-line
	}, [ans]);

	return (
		<div
			style={{
				display: 'flex',
				flexDirection: 'column',
				gap: '1rem',
			}}
		>
			<div>
				<h6>{'Answer ' + ansNo.toString()}</h6>
				<input
					id={ans_id.toString() + '1'}
					type='textarea'
					className='form-control'
					placeholder='Option'
					name='ansDesc'
					value={ansDesc}
					onChange={changeAns}
				/>
			</div>
			<div>
				<h6>Response</h6>
				<input
					id={ans_id.toString() + '2'}
					type='textarea'
					className='form-control'
					placeholder='Response'
					name='resp'
					value={resp}
					onChange={changeAns}
				/>
			</div>
			<hr />
		</div>
	);
};

export default AnswersCard;
