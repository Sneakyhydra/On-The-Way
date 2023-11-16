import { useState, useEffect } from 'react';

const CounUsers = ({ users, setStudent, student }) => {
	const [clickedOn, setClickedOn] = useState(student);

	useEffect(() => {
		setStudent(clickedOn);
		// eslint-disable-next-line
	}, [clickedOn]);

	useEffect(() => {
		setClickedOn(student);
	}, [student]);

	const scrollToBottom = () => {
		const elem = document.getElementById('messagesEndCoun');
		if (elem) {
			elem.scrollIntoView({ behavior: 'auto' });
		}
	};

	const onClick = (id) => {
		setClickedOn(id);
		setTimeout(scrollToBottom, 10);
	};

	return (
		<div
			style={{
				width: '25%',
				minHeight: '100%',
				margin: '0',
				display: 'flex',
				flexWrap: 'nowrap',
				flexDirection: 'column',
				borderRight: '2px solid #2c363f',
				padding: '0',
				justifyContent: 'flex-start',
				alignItems: 'center',
				flexGrow: 'initial',
				backgroundColor: 'white',
				borderTopLeftRadius: '0.4rem',
				borderBottomLeftRadius: '0.4rem',
				zIndex: '100',
			}}
			className='userArea'
		>
			{users.map((stud) => {
				return (
					<button
						key={stud.stud_id}
						onClick={() => onClick(stud.stud_id)}
						className={
							clickedOn === stud.stud_id ? 'chatUsers chatActive' : 'chatUsers'
						}
					>
						{stud.stud_name}
					</button>
				);
			})}
		</div>
	);
};

export default CounUsers;
