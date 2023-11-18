const StudCounCard = ({ user, setTabKey, setCounsellor }) => {
	const { coun_name, coun_gender, coun_phone, coun_dept, coun_id } = user;

	const chat = () => {
		setCounsellor(coun_id);
		setTabKey('Chat');
	};

	return (
		<div
			style={{
				display: 'flex',
				flexDirection: 'column',
				boxShadow: '0 0 5px 0 rgba(0,0,0,0.3)',
				borderRadius: '0.5rem',
				padding: '1rem 3rem',
				backgroundColor: 'white',
				width: '300px',
			}}
		>
			<h3>{coun_name}</h3>
			<br />
			{coun_dept}
			<br />
			{coun_gender}
			<br />
			{coun_phone}

			<div style={{ display: 'flex', gap: '1rem' }}>
				<button
					className='btn btn-primary'
					style={{
						margin: 'auto',
						marginTop: '1.5rem',
						display: 'block',
					}}
					onClick={chat}
				>
					Chat
				</button>
			</div>
		</div>
	);
};

export default StudCounCard;
