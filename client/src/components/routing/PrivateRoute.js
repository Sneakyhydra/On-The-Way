// Routing
import { useContext, useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import AuthContext from '../../context/auth/authContext';

const PrivateRoute = ({ children }) => {
	const authContext = useContext(AuthContext);
	const { isAuthenticated, validate } = authContext;
	const [authentication, setAuthentication] = useState(
		localStorage.getItem('isAuthenticated') === 'true'
	);

	useEffect(() => {
		validate();
		// eslint-disable-next-line
	}, []);

	useEffect(() => {
		setAuthentication(localStorage.getItem('isAuthenticated') === 'true');
	}, [isAuthenticated]);

	// If user is authenticated, render children
	return authentication ? children : <Navigate to='/' />;
};

export default PrivateRoute;
