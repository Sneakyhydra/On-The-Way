import { useState, useEffect } from 'react';

import Profile from '../components/tabs/Profile';
import StudQuiz from '../components/tabs/Student/StudQuiz';
import StudCoun from '../components/tabs/Student/StudCoun';
import StudChat from '../components/tabs/Student/StudChat';
import StudFeed from '../components/tabs/Student/StudFeed';

const StudTabs = () => {
	const [active, setActive] = useState('Profile');
	const [isMobile, setIsMobile] = useState(false);
	const [counsellor, setCounsellor] = useState(null);

	const handleTabClick = (tabName) => {
		setActive(tabName);
	};

	useEffect(() => {
		const handleResize = () => {
			setIsMobile(window.innerWidth < 768);
		};

		window.addEventListener('resize', handleResize);

		handleResize();

		return () => {
			window.removeEventListener('resize', handleResize);
		};
	}, []);

	let tabs = (
		<ul
			className='nav nav-tabs'
			style={{
				width: '100%',
				display: 'flex',
				flexDirection: 'row',
				gap: '0.2rem',
				border: 'none',
				boxShadow: '0 8px 6px -6px #2bc592',
			}}
		>
			<li
				className={`nav-item`}
				style={
					active === 'Profile'
						? {
								backgroundColor: '#2bc592',
								color: 'white',
								padding: '0.4rem 2rem',
								borderTopLeftRadius: '1rem',
								borderTopRightRadius: '1rem',
								cursor: 'pointer',
						  }
						: {
								padding: '0.4rem 2rem',
								borderTopLeftRadius: '1rem',
								borderTopRightRadius: '1rem',
								cursor: 'pointer',
						  }
				}
				onClick={() => handleTabClick('Profile')}
			>
				Profile
			</li>
			<li
				className={`nav-item`}
				style={
					active === 'Quiz'
						? {
								backgroundColor: '#2bc592',
								color: 'white',
								padding: '0.4rem 2rem',
								borderTopLeftRadius: '1rem',
								borderTopRightRadius: '1rem',
								cursor: 'pointer',
						  }
						: {
								padding: '0.4rem 2rem',
								borderTopLeftRadius: '1rem',
								borderTopRightRadius: '1rem',
								cursor: 'pointer',
						  }
				}
				onClick={() => handleTabClick('Quiz')}
			>
				Quiz
			</li>
			<li
				className={`nav-item`}
				style={
					active === 'StudCoun'
						? {
								backgroundColor: '#2bc592',
								color: 'white',
								padding: '0.4rem 2rem',
								borderTopLeftRadius: '1rem',
								borderTopRightRadius: '1rem',
								cursor: 'pointer',
						  }
						: {
								padding: '0.4rem 2rem',
								borderTopLeftRadius: '1rem',
								borderTopRightRadius: '1rem',
								cursor: 'pointer',
						  }
				}
				onClick={() => handleTabClick('StudCoun')}
			>
				Counsellors
			</li>
			<li
				className={`nav-item`}
				style={
					active === 'Chat'
						? {
								backgroundColor: '#2bc592',
								color: 'white',
								padding: '0.4rem 2rem',
								borderTopLeftRadius: '1rem',
								borderTopRightRadius: '1rem',
								cursor: 'pointer',
						  }
						: {
								padding: '0.4rem 2rem',
								borderTopLeftRadius: '1rem',
								borderTopRightRadius: '1rem',
								cursor: 'pointer',
						  }
				}
				onClick={() => handleTabClick('Chat')}
			>
				Chat
			</li>
			<li
				className={`nav-item`}
				style={
					active === 'Feedback'
						? {
								backgroundColor: '#2bc592',
								color: 'white',
								padding: '0.4rem 2rem',
								borderTopLeftRadius: '1rem',
								borderTopRightRadius: '1rem',
								cursor: 'pointer',
						  }
						: {
								padding: '0.4rem 2rem',
								borderTopLeftRadius: '1rem',
								borderTopRightRadius: '1rem',
								cursor: 'pointer',
						  }
				}
				onClick={() => handleTabClick('Feedback')}
			>
				Feedback
			</li>
		</ul>
	);

	if (isMobile) {
		tabs = (
			<div
				className='dropdown'
				style={{
					width: '100%',
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
					gap: '1rem',
				}}
			>
				<button
					className='btn btn-primary dropdown-toggle'
					type='button'
					id='dropdownMenuButton1'
					data-bs-toggle='dropdown'
					aria-expanded='false'
					style={{
						maxWidth: '480px',
						width: '75%',
						backgroundColor: '#2bc592',
						borderRadius: '1rem',
					}}
				>
					{active}
				</button>
				<ul
					className='dropdown-menu'
					aria-labelledby='dropdownMenuButton1'
					style={{
						maxWidth: '480px',
						width: '75%',
						borderRadius: '1rem',
						padding: '0',
					}}
				>
					<li
						className={`dropdown-item`}
						style={
							active === 'Profile'
								? { backgroundColor: '#2bc592', color: 'white' }
								: {}
						}
						onClick={() => handleTabClick('Profile')}
					>
						Profile
					</li>
					<li
						className={`dropdown-item`}
						style={
							active === 'Quiz'
								? { backgroundColor: '#2bc592', color: 'white' }
								: {}
						}
						onClick={() => handleTabClick('Quiz')}
					>
						Quiz
					</li>
					<li
						className={`dropdown-item`}
						style={
							active === 'StudCoun'
								? { backgroundColor: '#2bc592', color: 'white' }
								: {}
						}
						onClick={() => handleTabClick('StudCoun')}
					>
						Counsellors
					</li>
					<li
						className={`dropdown-item`}
						style={
							active === 'Chat'
								? { backgroundColor: '#2bc592', color: 'white' }
								: {}
						}
						onClick={() => handleTabClick('Chat')}
					>
						Chat
					</li>
					<li
						className={`dropdown-item`}
						style={
							active === 'Feedback'
								? { backgroundColor: '#2bc592', color: 'white' }
								: {}
						}
						onClick={() => handleTabClick('Feedback')}
					>
						Feedback
					</li>
				</ul>
			</div>
		);
	}

	return (
		<div className='tabs'>
			{tabs}
			<div className='tab-content' style={{ margin: '0rem' }}>
				<div
					className={`tab-pane fade ${
						active === 'Profile' ? 'show active' : ''
					}`}
				>
					<Profile tabKey={active} />
				</div>
				<div
					className={`tab-pane fade ${active === 'Quiz' ? 'show active' : ''}`}
				>
					<StudQuiz tabKey={active} setTabKey={setActive} />
				</div>
				<div
					className={`tab-pane fade ${
						active === 'StudCoun' ? 'show active' : ''
					}`}
				>
					<StudCoun
						tabKey={active}
						setTabKey={setActive}
						setCounsellor={setCounsellor}
					/>
				</div>
				<div
					className={`tab-pane fade ${active === 'Chat' ? 'show active' : ''}`}
				>
					<StudChat
						tabKey={active}
						counsellor={counsellor}
						setCounsellor={setCounsellor}
					/>
				</div>
				<div
					className={`tab-pane fade ${
						active === 'Feedback' ? 'show active' : ''
					}`}
				>
					<StudFeed />
				</div>
			</div>
		</div>
	);
};

export default StudTabs;
