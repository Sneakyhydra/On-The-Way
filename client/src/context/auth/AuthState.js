// Imports
import { useReducer } from 'react';
import AuthContext from './authContext';
import authReducer from './authReducer';
import {
	REGISTER_SUCCESS,
	REGISTER_FAIL,
	USER_LOADED,
	AUTH_ERROR,
	LOGIN_SUCCESS,
	LOGIN_FAIL,
	LOGOUT,
	CLEAR_ERRORS,
	EDIT_SUCCESS,
	EDIT_FAIL,
	VALID_FAIL,
	VALID_SUCCESS,
} from '../types';
import axios from 'axios';
import { API_URL } from '../../config/api';

axios.defaults.withCredentials = true;

const AuthState = (props) => {
	// Set initial state
	const initialState = {
		isAuthenticated: false,
		user: null,
		error: null,
	};

	// Init Reducer
	const [state, dispatch] = useReducer(authReducer, initialState);

	// Load User
	const loadUser = async () => {
		try {
			// Make a get request at localhost:5000/{API_URL}/auth
			const res = await axios.get(`${API_URL}/auth`);

			// Dispatch the action to reducer for USER_LOADED
			dispatch({ type: USER_LOADED, payload: res.data });
			localStorage.setItem('isAuthenticated', 'true');
		} catch (err) {
			if (err.response.status === 401) {
				console.log('This is the desired behaviour');
			}
			// Dispatch the action to reducer for AUTH_ERROR
			dispatch({ type: AUTH_ERROR });
			localStorage.setItem('isAuthenticated', 'false');
		}
	};

	// Register Student
	const regStudent = async (formData) => {
		// Set header of the input data
		const config = {
			headers: {
				'Content-Type': 'application/json',
			},
		};

		try {
			// Make a post request at localhost:5000/{API_URL}/users/student
			const res = await axios.post(
				`${API_URL}/users/student`,
				formData,
				config
			);

			// Dispatch the action to reducer for REGISTER_SUCCESS
			dispatch({
				type: REGISTER_SUCCESS,
				payload: res.data,
			});
			localStorage.setItem('isAuthenticated', 'true');

			// Load the user after successful registration
			loadUser();
		} catch (err) {
			// Dispatch the action to reducer for REGISTER_FAIL
			dispatch({
				type: REGISTER_FAIL,
				payload: err.response.data.msg,
			});
			localStorage.setItem('isAuthenticated', 'false');
		}
	};

	// Register Counsellor
	const regCounsellor = async (formData) => {
		// Set header of the input data
		const config = {
			headers: {
				'Content-Type': 'application/json',
			},
		};

		try {
			// Make a post request at localhost:5000/{API_URL}/users/counsellor
			const res = await axios.post(
				`${API_URL}/users/counsellor`,
				formData,
				config
			);

			// Dispatch the action to reducer for REGISTER_SUCCESS
			dispatch({
				type: REGISTER_SUCCESS,
				payload: res.data,
			});
			localStorage.setItem('isAuthenticated', 'true');

			// Load the user after successful registration
			loadUser();
		} catch (err) {
			// Dispatch the action to reducer for REGISTER_FAIL
			dispatch({
				type: REGISTER_FAIL,
				payload: err.response.data.msg,
			});
			localStorage.setItem('isAuthenticated', 'false');
		}
	};

	// Register Admin
	const regAdmin = async (formData) => {
		// Set header of the input data
		const config = {
			headers: {
				'Content-Type': 'application/json',
			},
		};

		try {
			// Make a post request at localhost:5000/{API_URL}/users/admin1234
			const res = await axios.post(
				`${API_URL}/users/admin1234`,
				formData,
				config
			);

			// Dispatch the action to reducer for REGISTER_SUCCESS
			dispatch({
				type: REGISTER_SUCCESS,
				payload: res.data,
			});

			localStorage.setItem('isAuthenticated', 'true');

			// Load the user after successful registration
			loadUser();
		} catch (err) {
			// Dispatch the action to reducer for REGISTER_FAIL
			dispatch({
				type: REGISTER_FAIL,
				payload: err.response.data.msg,
			});
			localStorage.setItem('isAuthenticated', 'false');
		}
	};

	// Edit Admin
	const editAdmin = async (formData) => {
		// Set header of the input data
		const config = {
			headers: {
				'Content-Type': 'application/json',
			},
		};

		try {
			// Make a put request at localhost:5000/{API_URL}/editUsers/admin1234
			const res = await axios.put(
				`${API_URL}/editUsers/admin1234`,
				formData,
				config
			);

			// Dispatch the action to reducer for EDIT_SUCCESS
			dispatch({
				type: EDIT_SUCCESS,
				payload: res.data,
			});

			// Load the user after successful edit
			loadUser();
		} catch (err) {
			// Dispatch the action to reducer for EDIT_FAIL
			dispatch({
				type: EDIT_FAIL,
			});
		}
	};

	// Edit Counsellor
	const editCounsellor = async (formData) => {
		// Set header of the input data
		const config = {
			headers: {
				'Content-Type': 'application/json',
			},
		};

		try {
			// Make a put request at localhost:5000/{API_URL}/editUsers/counsellor
			const res = await axios.put(
				`${API_URL}/editUsers/counsellor`,
				formData,
				config
			);

			// Dispatch the action to reducer for EDIT_SUCCESS
			dispatch({
				type: EDIT_SUCCESS,
				payload: res.data,
			});

			// Load the user after successful edit
			loadUser();
		} catch (err) {
			// Dispatch the action to reducer for EDIT_FAIL
			dispatch({
				type: EDIT_FAIL,
			});
		}
	};

	// Edit Student
	const editStudent = async (formData) => {
		// Set header of the input data
		const config = {
			headers: {
				'Content-Type': 'application/json',
			},
		};

		try {
			// Make a put request at localhost:5000/{API_URL}/editUsers/student
			const res = await axios.put(
				`${API_URL}/editUsers/student`,
				formData,
				config
			);

			// Dispatch the action to reducer for EDIT_SUCCESS
			dispatch({
				type: EDIT_SUCCESS,
				payload: res.data,
			});

			// Load the user after successful edit
			loadUser();
		} catch (err) {
			// Dispatch the action to reducer for EDIT_FAIL
			dispatch({
				type: EDIT_FAIL,
			});
		}
	};

	// Login User
	const login = async (formData) => {
		// Set header of the input data
		const config = {
			headers: {
				'Content-Type': 'application/json',
			},
		};

		try {
			// Make a post request at localhost:5000/{API_URL}/auth
			const res = await axios.post(`${API_URL}/auth`, formData, config);

			// Dispatch the action to reducer for LOGIN_SUCCESS
			dispatch({
				type: LOGIN_SUCCESS,
				payload: res.data,
			});

			localStorage.setItem('isAuthenticated', 'true');

			// Load the user after successful login
			loadUser();
		} catch (err) {
			// Dispatch the action to reducer for LOGIN_FAIL
			dispatch({
				type: LOGIN_FAIL,
				payload: err.response.data.msg,
			});

			localStorage.setItem('isAuthenticated', 'false');
		}
	};

	// Logout
	const logout = async () => {
		try {
			await axios.delete(`${API_URL}/auth`);

			// Dispatch the action to reducer for LOGOUT
			dispatch({ type: LOGOUT });
			localStorage.setItem('isAuthenticated', 'false');
		} catch (err) {
			console.log(err);
		}
	};

	// Validate user
	const validate = async () => {
		try {
			const res = await axios.get(`${API_URL}/auth/check`);
			if (res.data === 'Valid') {
				dispatch({
					type: VALID_SUCCESS,
				});
				localStorage.setItem('isAuthenticated', 'true');
			}
		} catch (err) {
			dispatch({
				type: VALID_FAIL,
			});
			localStorage.setItem('isAuthenticated', 'false');
		}
	};

	// Clear Errors
	const clearErrors = () => {
		// Dispatch the action to reducer for CLEAR_ERRORS
		dispatch({
			type: CLEAR_ERRORS,
		});
	};

	return (
		<AuthContext.Provider
			// Provide these values to all components wrapped in AuthContext in App.js
			value={{
				isAuthenticated: state.isAuthenticated,
				user: state.user,
				error: state.error,
				regStudent,
				regCounsellor,
				login,
				loadUser,
				logout,
				clearErrors,
				regAdmin,
				editAdmin,
				editCounsellor,
				editStudent,
				validate,
			}}
		>
			{props.children}
		</AuthContext.Provider>
	);
};

export default AuthState;
