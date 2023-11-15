const StudCard = ({ user }) => {
	const {
		stud_name,
		stud_gender,
		stud_phone,
		stud_dept,
		stud_branch,
		roll_no,
		cpi,
	} = user;

	let CPI = cpi;

	if (!cpi) {
		CPI = 'Not found';
	}

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
			<h3>{stud_name}</h3>
			<strong>{roll_no}</strong>
			<br />
			{stud_branch}
			<br />
			{stud_dept}
			<br />
			{stud_gender}
			<br />
			{stud_phone}
			<br />
			Cpi: {CPI}
		</div>
	);
};

export default StudCard;
