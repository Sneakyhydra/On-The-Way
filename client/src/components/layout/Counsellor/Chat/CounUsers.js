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
		<div className='userArea'>
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
