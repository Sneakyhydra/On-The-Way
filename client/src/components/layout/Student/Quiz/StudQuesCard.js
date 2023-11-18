import { useEffect, useState } from 'react';

const StudQuesCard = ({ quesAns, question, idx, quiz, setQuiz, submitted }) => {
	const { ques_no, ques_desc, ques_id } = question;

	const [ans, setAns] = useState(0);

	const onChange = (e) => {
		setAns(parseInt(e.target.value));

		setQuiz({ ...quiz, [ques_id]: parseInt(e.target.value) });
	};

	useEffect(() => {
		if (submitted === true) {
			setAns(0);
		}
		// eslint-disable-next-line
	}, [submitted]);

	return (
		// <Row style={{ margin: "0" }}>
		//   <Col
		//     m={6}
		//     s={12}
		//     style={{
		//       width: "70vw",
		//       textAlign: "center",
		//       margin: "0",
		//       marginTop: "3rem",
		//     }}
		//   >
		//     <Card
		//       className='z-depth-1 question'
		//       closeIcon={<Icon>close</Icon>}
		//       revealIcon={<Icon>more_vert</Icon>}
		//       textClassName='black-text'
		//       title={"Question " + ques_no.toString()}
		//     >
		//       <Row>
		//         <h5>{ques_desc}</h5>
		//       </Row>

		//       <Row style={{ textAlign: "left", marginLeft: "0.75rem" }}>
		//         {quesAns[idx].answers.map((item, aidx) => {
		//           return (
		//             <p key={item.ans_id}>
		//               <label>
		//                 <input
		//                   className='with-gap'
		//                   name={ques_id}
		//                   type='radio'
		//                   value={item.ans_id}
		//                   checked={ans === item.ans_id}
		//                   onChange={onChange}
		//                   required
		//                 />
		//                 <span style={{ color: "black" }}>{item.ans_desc}</span>
		//               </label>
		//             </p>
		//           );
		//         })}
		//       </Row>
		//     </Card>
		//   </Col>
		// </Row>
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
				return (
					<div
						style={{
							display: 'flex',
							flexDirection: 'column',
							gap: '1rem',
						}}
					>
						<div>
							<input
								className='with-gap'
								name={ques_id}
								type='radio'
								value={item.ans_id}
								checked={ans === item.ans_id}
								onChange={onChange}
								required
							/>
							<span style={{ color: 'black', padding: '0 1rem' }}>
								{item.ans_desc}
							</span>
						</div>
					</div>
				);
			})}
		</div>
	);
};

export default StudQuesCard;
