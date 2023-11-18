import { useEffect, useState, useContext } from 'react';
import CounContext from '../../../../context/counsellor/counContext';
import AuthContext from '../../../../context/auth/authContext';

const CounMess = ({ messages, student, setStudent }) => {
	const [messToShow, setMessToShow] = useState([]);
	const counContext = useContext(CounContext);
	const authContext = useContext(AuthContext);

	const { sendMessage, loadMessages, students } = counContext;
	const { user } = authContext;
	const [currMess, setCurrMess] = useState('');
	const [studentName, setStudentName] = useState('');

	let temp = [];
	useEffect(() => {
		if (messages) {
			for (let i = 0; i < messages.length; i++) {
				if (messages[i].stud_id === student) {
					temp.push(messages[i]);
				}
			}
		}

		students.forEach((stud) => {
			if (stud.stud_id === student) {
				setStudentName(stud.stud_name);
			}
		});

		setMessToShow(temp);
		//eslint-disable-next-line
	}, [student, messages]);

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
			stud_id: student,
			coun_id: user.user_id,
			from_role: 'counsellor',
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

	if (student === 0 || student === null) {
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
						setStudent(0);
					}}
				>
					{'<'}
				</button>
				<div
					className='messUserName'
					style={{ color: 'white', fontSize: '1.55rem' }}
				>
					{studentName}
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
									mess.from_role === 'counsellor'
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

export default CounMess;
