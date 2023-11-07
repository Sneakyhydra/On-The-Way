// Imports
import { useReducer } from 'react';
import StudContext from './studContext';
import studReducer from './studReducer';
import {
	CLEAR_ERRORS,
	QUIZ_LOAD_SUCCESS,
	QUIZ_LOAD_FAIL,
	COUN_LOAD_SUCCESS,
	COUN_LOAD_FAIL,
	QUIZ_SUBMIT_SUCCESS,
	QUIZ_SUBMIT_FAIL,
	FEED_FAIL,
	MESSAGE_SEND_FAIL,
	MESSAGE_LOAD_SUCCESS,
	MESSAGE_LOAD_FAIL,
} from '../types';
import axios from 'axios';
import { API_URL } from '../../config/api';
axios.defaults.withCredentials = true;

const StudState = (props) => {
	// Set initial state
	const initialState = {
		error: null,
		quesAns: null,
		counsellors: null,
		messages: null,
	};

	// Init Reducer
	const [state, dispatch] = useReducer(studReducer, initialState);

	// Load quiz
	const loadQuesAns = async () => {
		try {
			// Make a get request at localhost:5000/{API_URL}/student/quesans
			const res = await axios.get(`${API_URL}/student/quesans`);

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

	// Load all approved counsellors
	const loadCounsellors = async () => {
		try {
			// Make a get request at localhost:5000/{API_URL}/student/counsellors
			const res = await axios.get(`${API_URL}/student/counsellors`);

			// Dispatch the action to reducer for COUN_LOAD_SUCCESS
			dispatch({
				type: COUN_LOAD_SUCCESS,
				payload: res.data,
			});
		} catch (err) {
			// Dispatch the action to reducer for COUN_LOAD_FAIL
			dispatch({
				type: COUN_LOAD_FAIL,
				payload: err.response.data.msg,
			});
		}
	};

	// Submit quiz
	const submitQuiz = async (formData) => {
		// Set header of the input data
		const config = {
			headers: {
				'Content-Type': 'application/json',
			},
		};

		try {
			// Make a post request at localhost:5000/{API_URL}/student/submitQuiz
			await axios.post(`${API_URL}/student/submitQuiz`, formData, config);

			// Dispatch the action to reducer for QUIZ_SUBMIT_SUCCESS
			dispatch({
				type: QUIZ_SUBMIT_SUCCESS,
			});

			// Load quiz
			await loadQuesAns();
		} catch (err) {
			// Dispatch the action to reducer for QUIZ_SUBMIT_FAIL
			dispatch({
				type: QUIZ_SUBMIT_FAIL,
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
			// Make a post request at localhost:5000/{API_URL}/student/submitFeed
			await axios.post(`${API_URL}/student/submitFeed`, formData, config);
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
			// Make a get request at localhost:5000/{API_URL}/student/message
			const res = await axios.get(`${API_URL}/student/message`);

			// Dispatch the action to reducer for MESSAGE_LOAD_SUCCESS
			dispatch({
				type: MESSAGE_LOAD_SUCCESS,
				payload: res.data,
			});
		} catch (err) {
			// Dispatch the action to reducer for MESSAGE_LOAD_FAIL
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
			// Make a post request at localhost:5000/{API_URL}/student/message
			await axios.post(`${API_URL}/student/message`, formData, config);
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
		<StudContext.Provider
			// Provide these values to all components wrapped in StudContext in App.js
			value={{
				error: state.error,
				quesAns: state.quesAns,
				counsellors: state.counsellors,
				messages: state.messages,
				clearErrors,
				loadQuesAns,
				loadCounsellors,
				submitQuiz,
				submitFeed,
				loadMessages,
				sendMessage,
			}}
		>
			{props.children}
		</StudContext.Provider>
	);
};

export default StudState;
