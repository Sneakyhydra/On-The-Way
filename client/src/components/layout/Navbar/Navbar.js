// Imports

import { useState, useContext, useEffect } from 'react';
import logo from '../../../images/Logo/logo.png';
import Login from '../../auth/Login';
import AuthContext from '../../../context/auth/authContext';
import { useNavigate, Link } from 'react-router-dom';

const Navbar = () => {
	const [showModal, setShowModal] = useState(false);
	const [scrollState, setScrollState] = useState('top');
	const authContext = useContext(AuthContext);
	const { validate, isAuthenticated, logout } = authContext;
	const navigate = useNavigate();

	useEffect(() => {
		validate();
		// eslint-disable-next-line
	}, []);

	useEffect(() => {
		let listener = null;

		// Set the value of scroll
		listener = document.addEventListener('scroll', (e) => {
			var scrolled = document.scrollingElement.scrollTop;
			if (scrolled >= 35) {
				if (scrollState !== 'amir') {
					setScrollState('amir');
				}
			} else {
				if (scrollState !== 'top') {
					setScrollState('top');
				}
			}
		});
		return () => {
			// Remove Listener after getting the value
			document.removeEventListener('scroll', listener);
		};
	}, [scrollState]);

	const handleModalClose = () => {
		setShowModal(false);
	};

	return (
		<nav
			className='navbar navbar-expand-lg navbar-light'
			style={{
				position: 'fixed',
				width: '100%',
				top: '0',
				zIndex: '1000',
				boxShadow:
					window.location.pathname === '/dashboard'
						? '0 0 10px #000000'
						: scrollState === 'top'
						? ''
						: '0 0 10px #000000',
				transition: 'all 0.5s ease',
				backgroundColor:
					window.location.pathname === '/dashboard'
						? 'white'
						: scrollState === 'top'
						? 'transparent'
						: 'white',
			}}
		>
			<div className='container-fluid' style={{ padding: '0 2.5rem' }}>
				<Link
					className='navbar-brand'
					to='/'
					style={{ display: 'flex', gap: '1rem' }}
				>
					<img
						src={logo}
						alt='Logo'
						width='40'
						height='40'
						className='d-inline-block align-text-center'
					/>
					<span style={{ paddingTop: '0.3rem' }}>On The Way</span>
				</Link>
				<button
					className='navbar-toggler'
					type='button'
					data-bs-toggle='collapse'
					data-bs-target='#navbarNav'
					aria-controls='navbarNav'
					aria-expanded='false'
					aria-label='Toggle navigation'
				>
					<span className='navbar-toggler-icon'></span>
				</button>
				<div className='collapse navbar-collapse' id='navbarNav'>
					<ul
						className='navbar-nav ms-auto'
						style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}
					>
						{!isAuthenticated ? (
							<li className='nav-item'>
								<button
									className='btn btn-primary'
									onClick={() => setShowModal(true)}
								>
									Login
								</button>
							</li>
						) : (
							<>
								<li className='nav-item'>
									{window.location.pathname !== '/dashboard' && (
										<button
											className='btn btn-primary'
											onClick={() => navigate('/dashboard')}
										>
											Dashboard
										</button>
									)}
								</li>
								<li className='nav-item'>
									<button className='btn btn-danger' onClick={() => logout()}>
										Logout
									</button>
								</li>
							</>
						)}
					</ul>
				</div>
			</div>
			{showModal && (
				<div
					className='modal fade show'
					tabIndex='-1'
					role='dialog'
					style={{ display: 'block' }}
				>
					<div className='modal-dialog' role='document'>
						<div className='modal-content'>
							<div className='modal-header'>
								<h5 className='modal-title'>Login</h5>
								<button
									type='button'
									className='btn-close'
									data-bs-dismiss='modal'
									aria-label='Close'
									onClick={handleModalClose}
								></button>
							</div>
							<div className='modal-body'>
								<Login />
							</div>
						</div>
					</div>
				</div>
			)}
			{showModal && (
				<div
					className='modal-backdrop fade show'
					onClick={handleModalClose}
				></div>
			)}
		</nav>
	);
};

export default Navbar;
