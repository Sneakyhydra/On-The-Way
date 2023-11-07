// Routing
import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import AuthContext from '../../context/auth/authContext';

const PrivateRoute = ({ children }) => {
	const authContext = useContext(AuthContext);
	const { isAuthenticated } = authContext;

	// If user is authenticated, render children
	return isAuthenticated ? children : <Navigate to='/' />;
};

export default PrivateRoute;
