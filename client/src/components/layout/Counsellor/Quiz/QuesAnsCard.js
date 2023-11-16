const QuesAnsCard = ({ answer }) => {
	const { ans_no, ans_desc, response } = answer;

	return (
		<div
			style={{
				display: 'flex',
				flexDirection: 'column',
				gap: '1rem',
			}}
		>
			<div>
				<h6>{'Answer ' + ans_no.toString()}</h6>
				<input
					type='textarea'
					className='form-control'
					placeholder='Option'
					disabled
					name='ansDesc'
					value={ans_desc}
				/>
			</div>
			<div>
				<h6>Response</h6>
				<input
					type='textarea'
					className='form-control'
					placeholder='Response'
					name='resp'
					disabled
					value={response}
				/>
			</div>
			<hr />
		</div>
	);
};

export default QuesAnsCard;
