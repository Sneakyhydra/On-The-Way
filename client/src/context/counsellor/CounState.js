// Imports
import { useReducer } from 'react';
import CounContext from './counContext';
import counReducer from './counReducer';
import {
	QUIZ_LOAD_SUCCESS,
	QUIZ_LOAD_FAIL,
	STUD_LOAD_SUCCESS,
	STUD_LOAD_FAIL,
	CLEAR_ERRORS,
	FEED_FAIL,
	MESSAGE_SEND_FAIL,
	MESSAGE_LOAD_SUCCESS,
	MESSAGE_LOAD_FAIL,
} from '../types';
import axios from 'axios';
import { API_URL } from '../../config/api';
axios.defaults.withCredentials = true;

const CounState = (props) => {
	// Set initial state
	const initialState = {
		error: null,
		quesAns: null,
		students: null,
		messages: null,
	};

	// Init Reducer
	const [state, dispatch] = useReducer(counReducer, initialState);

	// Load quiz
	const loadQuesAns = async () => {
		try {
			// Make a get request at localhost:5000/{API_URL}/counsellor/quesAns
			const res = await axios.get(`${API_URL}/counsellor/quesans`);

			// Dispatch the action to reducer for QUIZ_LOAD_SUCCESS
			dispatch({
				type: QUIZ_LOAD_SUCCESS,
				payload: res.data,
			});
		} catch (err) {
			// Dispatch the action to reducer for QUIZ_LOAD_FAIL
			dispatch({
				type: QUIZ_LOAD_FAIL,
				payload: err.response.data.msg,
			});
		}
	};

	// Load all students
	const loadStudents = async () => {
		try {
			// Make a get request at localhost:5000/{API_URL}/counsellor/students
			const res = await axios.get(`${API_URL}/counsellor/students`);

			// Dispatch the action to reducer for STUD_LOAD_SUCCESS
			dispatch({
				type: STUD_LOAD_SUCCESS,
				payload: res.data,
			});
		} catch (err) {
			// Dispatch the action to reducer for STUD_LOAD_FAIL
			dispatch({
				type: STUD_LOAD_FAIL,
				payload: err.response.data.msg,
			});
		}
	};

	// Submit Feedback
	const submitFeed = async (formData) => {
		// Set header of the input data
		const config = {
			headers: {
				'Content-Type': 'application/json',
			},
		};

		try {
			// Make a post request at localhost:5000/{API_URL}/counsellor/submitFeed
			await axios.post(`${API_URL}/counsellor/submitFeed`, formData, config);
		} catch (err) {
			// Dispatch the action to reducer for FEED_FAIL
			dispatch({
				type: FEED_FAIL,
				payload: err.response.data.msg,
			});
		}
	};

	// Load all messages of user
	const loadMessages = async () => {
		try {
			// Make a get request at localhost:5000/{API_URL}/counsellor/message
			const res = await axios.get(`${API_URL}/counsellor/message`);

			// Dispatch the action to reducer for MESSAGE_LOAD_SUCCESS
			dispatch({
				type: MESSAGE_LOAD_SUCCESS,
				payload: res.data,
			});
		} catch (err) {
			// // Dispatch the action to reducer for MESSAGE_LOAD_FAIL
			dispatch({
				type: MESSAGE_LOAD_FAIL,
				payload: err.response.data.msg,
			});
		}
	};

	// Send message
	const sendMessage = async (formData) => {
		// Set header of the input data
		const config = {
			headers: {
				'Content-Type': 'application/json',
			},
		};

		try {
			// Make a post request at localhost:5000/{API_URL}/counsellor/message
			await axios.post(`${API_URL}/counsellor/message`, formData, config);
		} catch (err) {
			// Dispatch the action to reducer for MESSAGE_SEND_FAIL
			dispatch({
				type: MESSAGE_SEND_FAIL,
				payload: err.response.data.msg,
			});
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
		<CounContext.Provider
			// Provide these values to all components wrapped in CounContext in App.js
			value={{
				error: state.error,
				quesAns: state.quesAns,
				students: state.students,
				messages: state.messages,
				clearErrors,
				loadQuesAns,
				loadStudents,
				submitFeed,
				loadMessages,
				sendMessage,
			}}
		>
			{props.children}
		</CounContext.Provider>
	);
};

export default CounState;
