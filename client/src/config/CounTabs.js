import { useState, useEffect, useContext } from 'react';

import AuthContext from '../context/auth/authContext';

import Profile from '../components/tabs/Profile';
import StudentInfo from '../components/tabs/Counsellor/StudentInfo';
import CounQuiz from '../components/tabs/Counsellor/CounQuiz';
import CounChat from '../components/tabs/Counsellor/CounChat';
import CounFeed from '../components/tabs/Counsellor/CounFeed';

const CounTabs = () => {
	const authContext = useContext(AuthContext);
	const [active, setActive] = useState('Profile');
	const [isMobile, setIsMobile] = useState(false);
	const [student, setStudent] = useState(null);

	const { user } = authContext;

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
			{user.coun_status === 'Approved' && (
				<>
					<li
						className={`nav-item`}
						style={
							active === 'StudentInfo'
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
						onClick={() => handleTabClick('StudentInfo')}
					>
						Students
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
				</>
			)}
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
					{user.coun_status === 'Approved' && (
						<>
							<li
								className={`dropdown-item`}
								style={
									active === 'StudentInfo'
										? { backgroundColor: '#2bc592', color: 'white' }
										: {}
								}
								onClick={() => handleTabClick('StudentInfo')}
							>
								StudentInfo
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
						</>
					)}
				</ul>
			</div>
		);
	}

	return (
		<div className='tabs'>
			{tabs}
			<div className='tab-content' style={{ marginTop: '0rem' }}>
				<div
					className={`tab-pane fade ${
						active === 'Profile' ? 'show active' : ''
					}`}
				>
					<Profile tabKey={active} />
				</div>
				<div
					className={`tab-pane fade ${
						active === 'StudentInfo' ? 'show active' : ''
					}`}
				>
					<StudentInfo
						tabKey={active}
						setTabKey={setActive}
						setStudent={setStudent}
					/>
				</div>
				<div
					className={`tab-pane fade ${active === 'Quiz' ? 'show active' : ''}`}
				>
					<CounQuiz tabKey={active} />
				</div>
				<div
					className={`tab-pane fade ${active === 'Chat' ? 'show active' : ''}`}
				>
					<CounChat tabKey={active} student={student} setStudent={setStudent} />
				</div>
				<div
					className={`tab-pane fade ${
						active === 'Feedback' ? 'show active' : ''
					}`}
				>
					<CounFeed />
				</div>
			</div>
		</div>
	);
};

export default CounTabs;
