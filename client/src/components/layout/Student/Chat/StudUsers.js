import { useState, useEffect } from 'react';

const StudUsers = ({ users, setCounsellor, counsellor }) => {
	const [clickedOn, setClickedOn] = useState(counsellor);

	useEffect(() => {
		setCounsellor(clickedOn);
		// eslint-disable-next-line
	}, [clickedOn]);

	useEffect(() => {
		setClickedOn(counsellor);
	}, [counsellor]);

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
			{users.map((coun) => {
				return (
					<button
						key={coun.coun_id}
						onClick={() => onClick(coun.coun_id)}
						className={
							clickedOn === coun.coun_id ? 'chatUsers chatActive' : 'chatUsers'
						}
					>
						{coun.coun_name}
					</button>
				);
			})}
		</div>
	);
};

export default StudUsers;
