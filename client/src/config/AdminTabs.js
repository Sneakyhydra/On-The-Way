import { useState, useEffect } from 'react';

import Profile from '../components/tabs/Profile';
import Pending from '../components/tabs/Admin/Pending';
import AdminQuiz from '../components/tabs/Admin/AdminQuiz';
import Approved from '../components/tabs/Admin/Approved';
import Students from '../components/tabs/Admin/Students';
import Rejected from '../components/tabs/Admin/Rejected';
import AdminCounFeed from '../components/tabs/Admin/AdminCounFeed';
import AdminStudFeed from '../components/tabs/Admin/AdminStudFeed';

const AdminTabs = () => {
	const [active, setActive] = useState('Profile');
	const [isMobile, setIsMobile] = useState(false);
	const [counsellors, setCounsellors] = useState('Pending');
	const [feedback, setFeedback] = useState('AdminCounFeed');

	const handleTabClick = (tabName) => {
		setActive(tabName);
	};

	const handleCounClick = (counName) => {
		setCounsellors(counName);
	};

	const handleFeedClick = (feedName) => {
		setFeedback(feedName);
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
					active === 'Counsellors'
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
				onClick={() => handleTabClick('Counsellors')}
			>
				Counsellors
			</li>
			<li
				className={`nav-item`}
				style={
					active === 'Students'
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
				onClick={() => handleTabClick('Students')}
			>
				Students
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
							active === 'Counsellors'
								? { backgroundColor: '#2bc592', color: 'white' }
								: {}
						}
						onClick={() => handleTabClick('Counsellors')}
					>
						Counsellors
					</li>
					<li
						className={`dropdown-item`}
						style={
							active === 'Students'
								? { backgroundColor: '#2bc592', color: 'white' }
								: {}
						}
						onClick={() => handleTabClick('Students')}
					>
						Students
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
			<div className='tab-content' style={{ marginTop: '0rem' }}>
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
					<AdminQuiz tabKey={active} />
				</div>
				<div
					className={`tab-pane fade ${
						active === 'Counsellors' ? 'show active' : ''
					}`}
				>
					<div
						style={{
							display: 'flex',
							width: '100%',
							justifyContent: 'center',
							alignItems: 'center',
							flexWrap: 'wrap',
							flexDirection: isMobile ? 'column' : 'row',
							gap: isMobile ? '0.5rem' : '2rem',
						}}
					>
						<div className='form-check'>
							<input
								className='form-check-input'
								type='radio'
								name='Pending'
								id='Pending'
								checked={counsellors === 'Pending'}
								onClick={() => handleCounClick('Pending')}
							/>
							<label className='form-check-label' htmlFor='Pending'>
								Pending
							</label>
						</div>
						<div className='form-check'>
							<input
								className='form-check-input'
								type='radio'
								name='Rejected'
								id='Rejected'
								checked={counsellors === 'Rejected'}
								onClick={() => handleCounClick('Rejected')}
							/>
							<label className='form-check-label' htmlFor='Rejected'>
								Rejected
							</label>
						</div>
						<div className='form-check'>
							<input
								className='form-check-input'
								type='radio'
								name='Approved'
								id='Approved'
								checked={counsellors === 'Approved'}
								onClick={() => handleCounClick('Approved')}
							/>
							<label className='form-check-label' htmlFor='Approved'>
								Approved
							</label>
						</div>
					</div>
					{counsellors === 'Pending' && (
						<Pending tabKey={active} tabKeyCoun={counsellors} />
					)}
					{counsellors === 'Rejected' && (
						<Rejected tabKey={active} tabKeyCoun={counsellors} />
					)}
					{counsellors === 'Approved' && (
						<Approved tabKey={active} tabKeyCoun={counsellors} />
					)}
				</div>
				<div
					className={`tab-pane fade ${
						active === 'Students' ? 'show active' : ''
					}`}
				>
					<Students tabKey={active} />
				</div>
				<div
					className={`tab-pane fade ${
						active === 'Feedback' ? 'show active' : ''
					}`}
				>
					<div
						style={{
							display: 'flex',
							width: '100%',
							justifyContent: 'center',
							alignItems: 'center',
							flexWrap: 'wrap',
							flexDirection: isMobile ? 'column' : 'row',
							gap: isMobile ? '0.5rem' : '2rem',
						}}
					>
						<div className='form-check'>
							<input
								className='form-check-input'
								type='radio'
								name='AdminCounFeed'
								id='AdminCounFeed'
								checked={feedback === 'AdminCounFeed'}
								onClick={() => handleFeedClick('AdminCounFeed')}
							/>
							<label className='form-check-label' htmlFor='AdminCounFeed'>
								Counsellors
							</label>
						</div>
						<div className='form-check'>
							<input
								className='form-check-input'
								type='radio'
								name='AdminStudFeed'
								id='AdminStudFeed'
								checked={feedback === 'AdminStudFeed'}
								onClick={() => handleFeedClick('AdminStudFeed')}
							/>
							<label className='form-check-label' htmlFor='AdminStudFeed'>
								Students
							</label>
						</div>
					</div>
					{feedback === 'AdminCounFeed' && (
						<AdminCounFeed tabKey={active} tabKeyFeed={feedback} />
					)}
					{feedback === 'AdminStudFeed' && (
						<AdminStudFeed tabKey={active} tabKeyFeed={feedback} />
					)}
				</div>
			</div>
		</div>
	);
};

export default AdminTabs;
