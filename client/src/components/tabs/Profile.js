import { useContext, useEffect } from 'react';

import AuthContext from '../../context/auth/authContext';
import DisplayAdmin from '../layout/Profile/DisplayAdmin';
import DisplayStudent from '../layout/Profile/DisplayStudent';
import DisplayCounsellor from '../layout/Profile/DisplayCounsellor';
import Preloader from '../layout/Preloader/Preloader';

const Profile = ({ tabKey }) => {
	const authContext = useContext(AuthContext);

	const { user, loadUser } = authContext;
	useEffect(() => {
		if (tabKey === 'Profile') {
			loadUser();
		}
		// eslint-disable-next-line
	}, [tabKey]);

	if (!user) {
		return <Preloader marginClass='m-5' colorClass='success' />;
	}

	const { role } = user;

	const display = () => {
		switch (role) {
			case 'admin':
				return <DisplayAdmin />;
			case 'student':
				return <DisplayStudent />;
			case 'counsellor':
				return <DisplayCounsellor />;
			default:
				return <div>Invalid role</div>;
		}
	};

	return (
		<div style={{ backgroundColor: 'white', borderRadius: '0.5rem' }}>
			{display()}
		</div>
	);
};

export default Profile;
