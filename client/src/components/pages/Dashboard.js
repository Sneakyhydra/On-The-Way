import { useContext, useState, useEffect, lazy } from 'react';

import Navbar from '../layout/Navbar/Navbar';
import Preloader from '../layout/Preloader/Preloader';

import AuthContext from '../../context/auth/authContext';
import './Dashboard.css';

const AdminTabs = lazy(() => import('../../config/AdminTabs'));
const CounTabs = lazy(() => import('../../config/CounTabs'));
const StudTabs = lazy(() => import('../../config/StudTabs'));

const Dashboard = () => {
	const authContext = useContext(AuthContext);
	const [loading, setLoading] = useState(true);

	const { user, loadUser } = authContext;

	useEffect(() => {
		loadUser();
		setLoading(false);
		document.body.style.backgroundColor = '#ddc8c4';
		// eslint-disable-next-line
	}, []);

	if (loading || !user) {
		return <Preloader marginClass='m-5' colorClass='success' />;
	}

	const { role } = user;
	const tabs =
		role === 'admin' ? (
			<AdminTabs />
		) : role === 'counsellor' ? (
			<CounTabs />
		) : role === 'student' ? (
			<StudTabs />
		) : null;

	return (
		<div>
			<Navbar />
			<div style={{ height: '5rem' }}></div>
			{tabs}
		</div>
	);
};

export default Dashboard;
