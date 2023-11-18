import { useEffect, useState, useContext } from 'react';
import StudContext from '../../../../context/student/studContext';
import AuthContext from '../../../../context/auth/authContext';

const StudMess = ({ messages, counsellor, setCounsellor }) => {
	const [messToShow, setMessToShow] = useState([]);
	const studContext = useContext(StudContext);
	const authContext = useContext(AuthContext);

	const { sendMessage, loadMessages, counsellors } = studContext;
	const { user } = authContext;
	const [currMess, setCurrMess] = useState('');
	const [counsellorName, setCounsellorName] = useState('');

	let temp = [];
	useEffect(() => {
		if (messages) {
			for (let i = 0; i < messages.length; i++) {
				if (messages[i].coun_id === counsellor) {
					temp.push(messages[i]);
				}
			}
		}

		counsellors.forEach((coun) => {
			if (coun.coun_id === counsellor) {
				setCounsellorName(coun.coun_name);
			}
		});

		setMessToShow(temp);
		//eslint-disable-next-line
	}, [counsellor, messages]);

	useEffect(() => {
		const interval = setInterval(loadMessages, 3000);

		return () => clearInterval(interval);
		// eslint-disable-next-line
	}, []);

	const onChange = (e) => {
		setCurrMess(e.target.value);
	};

	const scrollToBottom = () => {
		const elem = document.getElementById('messagesEndCoun');
		if (elem) {
			elem.scrollIntoView({ behavior: 'auto' });
		}
	};

	const send = () => {
		let date;
		date = new Date();
		date =
			date.getUTCFullYear() +
			'-' +
			('00' + (date.getUTCMonth() + 1)).slice(-2) +
			'-' +
			('00' + date.getUTCDate()).slice(-2) +
			' ' +
			('00' + date.getUTCHours()).slice(-2) +
			':' +
			('00' + date.getUTCMinutes()).slice(-2) +
			':' +
			('00' + date.getUTCSeconds()).slice(-2);

		if (currMess === '') {
			return;
		}
		let messToSend = {
			stud_id: user.user_id,
			coun_id: counsellor,
			from_role: 'student',
			mess_desc: currMess,
			mess_date: date,
		};

		setCurrMess('');

		let temp = messToShow;
		temp.push(messToSend);
		if (temp.length === 1) {
			temp[temp.length - 1].mess_id = 1;
		} else {
			temp[temp.length - 1].mess_id = temp[temp.length - 2].mess_id + 1;
		}
		setMessToShow(temp);

		sendMessage(messToSend);
		setTimeout(scrollToBottom, 10);
	};

	if (counsellor === 0 || counsellor === null) {
		return (
			<div className='messArea'>
				<div
					className='messbg'
					style={{
						position: 'fixed',
						left: '0',
						width: '100%',
						height: '100%',
						opacity: '0.15',
						zIndex: '-1',
					}}
				></div>
				<div className='messUser' style={{ background: 'none' }}></div>
				<div className='messDisplay'></div>
				<div className='messInput'></div>
			</div>
		);
	}

	return (
		<div className='messArea'>
			<div
				className='messbg'
				style={{
					position: 'fixed',
					left: '0',
					width: '100%',
					height: '100%',
					opacity: '0.15',
					zIndex: '-1',
				}}
			></div>
			<div className='messUser'>
				<button
					style={{
						border: 'none',
						padding: '1rem 1.5rem',
						borderRadius: '50%',
						color: 'white',
						background: 'inherit',
					}}
					onClick={() => {
						setCounsellor(0);
					}}
				>
					{'<'}
				</button>
				<div
					className='messUserName'
					style={{ color: 'white', fontSize: '1.55rem' }}
				>
					{counsellorName}
				</div>
			</div>
			<div className='messDisplay' style={{ background: 'none' }}>
				{messToShow.length === 0
					? 'Be the first to start the conversation!!!'
					: ''}
				{messToShow.map((mess) => {
					return (
						<div
							key={`mess ${mess.mess_id}`}
							style={{
								width: '100%',
								display: 'flex',
								flexDirection: 'column',
								whiteSpace: 'initial',
							}}
						>
							<div
								className={
									mess.from_role === 'student'
										? 'text-right message-container'
										: 'text-left message-container'
								}
							>
								<pre
									style={{
										display: 'block',
										maxWidth: '250px',
										whiteSpace: 'pre-line',
										fontFamily: 'Lucida Sans, sans-serif',
									}}
									className='message'
								>
									{mess.mess_desc}
								</pre>
							</div>
						</div>
					);
				})}
				<div
					style={{ float: 'left', clear: 'both' }}
					id='messagesEndCoun'
				></div>
			</div>

			<div
				className='messInput'
				style={{
					display: 'flex',
					flexDirection: 'row',
					flexWrap: 'nowrap',
					justifyContent: 'flex-end',
					zIndex: '100',
					borderBottomRightRadius: '0.25rem',
					padding: '0.5rem',
					backgroundColor: 'rgba(255,255,255,0.75)',
				}}
			>
				<textarea
					value={currMess}
					id='currMess'
					name='currMess'
					className='validate materialize-textarea'
					onChange={onChange}
					placeholder='Type something'
					style={{ width: '80%', marginRight: '2rem', maxHeight: '75px' }}
				/>
				<button
					onClick={send}
					className='waves-effect waves-light btn z-depth-0'
					style={{
						borderRadius: '10px',
						backgroundColor: '#255F85',
						color: 'white',
						margin: '0',
						marginTop: '8px',
						marginRight: '1.5em',
						fontSize: '1rem',
					}}
				>
					Send
				</button>
			</div>
		</div>
	);
};

export default StudMess;
