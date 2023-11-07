// Imports
import { useReducer } from 'react';
import AdminContext from './adminContext';
import adminReducer from './adminReducer';
import {
	CLEAR_ERRORS,
	PENDING_SUCCESS,
	PENDING_FAIL,
	APPROVE_FAIL,
	REJECT_FAIL,
	QUIZ_LOAD_SUCCESS,
	QUIZ_LOAD_FAIL,
	QUIZ_UPDATE_FAIL,
	STUD_LOAD_SUCCESS,
	STUD_LOAD_FAIL,
	APPROVED_SUCCESS,
	APPROVED_FAIL,
	REJECTED_SUCCESS,
	REJECTED_FAIL,
	COUN_FEED_SUCCESS,
	COUN_FEED_FAIL,
	STUD_FEED_SUCCESS,
	STUD_FEED_FAIL,
	FEED_DELETE_FAIL,
} from '../types';
import axios from 'axios';
import { API_URL } from '../../config/api';
axios.defaults.withCredentials = true;

const AdminState = (props) => {
	// Set initial state
	const initialState = {
		error: null,
		quesAns: null,
		pending: null,
		students: null,
		approved: null,
		rejected: null,
		counfeed: null,
		studfeed: null,
	};

	// Init Reducer
	const [state, dispatch] = useReducer(adminReducer, initialState);

	// Load Pending Counsellors
	const loadPending = async () => {
		try {
			// Make a get request at localhost:5000/{API_URL}/admin/pending
			const res = await axios.get(`${API_URL}/admin/pending`);

			// Dispatch the action to reducer for PENDING_SUCCESS
			dispatch({
				type: PENDING_SUCCESS,
				payload: res.data,
			});
		} catch (err) {
			// Dispatch the action to reducer for PENDING_FAIL
			dispatch({
				type: PENDING_FAIL,
				payload: err.response.data.msg,
			});
		}
	};

	// Load Rejected Counsellors
	const loadRejected = async () => {
		try {
			// Make a get request at localhost:5000/{API_URL}/admin/rejected
			const res = await axios.get(`${API_URL}/admin/rejected`);

			// Dispatch the action to reducer for REJECTED_SUCCESS
			dispatch({
				type: REJECTED_SUCCESS,
				payload: res.data,
			});
		} catch (err) {
			// Dispatch the action to reducer for REJECTED_FAIL
			dispatch({
				type: REJECTED_FAIL,
				payload: err.response.data.msg,
			});
		}
	};

	// Approve Counsellor
	const approveCoun = async (counid) => {
		// Set header of the input data
		const config = {
			headers: {
				'Content-Type': 'application/json',
			},
		};

		try {
			// Init object with id of counsellor and type as Approved
			const appr = {
				id: counid,
				type: 'Approved',
			};

			// Make a put request at localhost:5000/{API_URL}/admin/pending
			await axios.put(`${API_URL}/admin/pending`, appr, config);

			// Load all counsellors
			loadPending();
			loadApproved();
			loadRejected();
		} catch (err) {
			// Dispatch the action to reducer for APPROVE_FAIL
			dispatch({
				type: APPROVE_FAIL,
				payload: err.response.data.msg,
			});
		}
	};

	// Reject Counsellor
	const rejectCoun = async (counid) => {
		// Set header of the input data
		const config = {
			headers: {
				'Content-Type': 'application/json',
			},
		};

		try {
			// Init object with id of counsellor and type as Rejected
			const reject = {
				id: counid,
				type: 'Rejected',
			};

			// Make a put request at localhost:5000/{API_URL}/admin/pending
			await axios.put(`${API_URL}/admin/pending`, reject, config);

			// Load all counsellors
			loadPending();
			loadApproved();
			loadRejected();
		} catch (err) {
			dispatch({
				// Dispatch the action to reducer for REJECT_FAIL
				type: REJECT_FAIL,
				payload: err.response.data.msg,
			});
		}
	};

	// Load Quiz
	const loadQuesAns = async () => {
		try {
			// Make a get request at localhost:5000/{API_URL}/admin/quesans
			const res = await axios.get(`${API_URL}/admin/quesans`);

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

	// Update Quiz
	const updateQuiz = async (formData) => {
		// Set header of the input data
		const config = {
			headers: {
				'Content-Type': 'application/json',
			},
		};

		try {
			// Make a put request at localhost:5000/{API_URL}/admin/quiz
			await axios.put(`${API_URL}/admin/quiz`, formData, config);

			// Load Quiz
			await loadQuesAns();
		} catch (err) {
			// Dispatch the action to reducer for QUIZ_UPDATE_FAIL
			dispatch({
				type: QUIZ_UPDATE_FAIL,
				payload: err.response.data.msg,
			});
		}
	};

	// Load all students
	const loadStudents = async () => {
		try {
			// Make a get request at localhost:5000/{API_URL}/admin/students
			const res = await axios.get(`${API_URL}/admin/students`);

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

	// Load approved counsellors
	const loadApproved = async () => {
		try {
			// Make a get request at localhost:5000/{API_URL}/admin/approved
			const res = await axios.get(`${API_URL}/admin/approved`);

			// Dispatch the action to reducer for APPROVED_SUCCESS
			dispatch({
				type: APPROVED_SUCCESS,
				payload: res.data,
			});
		} catch (err) {
			// Dispatch the action to reducer for APPROVED_FAIL
			dispatch({
				type: APPROVED_FAIL,
				payload: err.response.data.msg,
			});
		}
	};

	// Load counsellor feedbacks
	const loadCounFeed = async () => {
		try {
			// Make a get request at localhost:5000/{API_URL}/admin/counfeed
			const res = await axios.get(`${API_URL}/admin/counfeed`);

			// Dispatch the action to reducer for COUN_FEED_SUCCESS
			dispatch({
				type: COUN_FEED_SUCCESS,
				payload: res.data,
			});
		} catch (err) {
			// Dispatch the action to reducer for COUN_FEED_FAIL
			dispatch({
				type: COUN_FEED_FAIL,
				payload: err.response.data.msg,
			});
		}
	};

	// Load student feedbacks
	const loadStudFeed = async () => {
		try {
			// Make a get request at localhost:5000/{API_URL}/admin/studfeed
			const res = await axios.get(`${API_URL}/admin/studfeed`);

			// Dispatch the action to reducer for STUD_FEED_SUCCESS
			dispatch({
				type: STUD_FEED_SUCCESS,
				payload: res.data,
			});
		} catch (err) {
			// Dispatch the action to reducer for STUD_FEED_FAIL
			dispatch({
				type: STUD_FEED_FAIL,
				payload: err.response.data.msg,
			});
		}
	};

	// Delete student feedback
	const deleteStudFeed = async (formData) => {
		// Set header and data in the config
		const config = {
			headers: {
				'Content-Type': 'application/json',
			},
			data: {
				...formData,
			},
		};

		try {
			// Make a delete request at localhost:5000/{API_URL}/admin/studfeed
			await axios.delete(`${API_URL}/admin/studfeed`, config);

			// Load student feedbacks after deletion
			loadStudFeed();
		} catch (err) {
			// Dispatch the action to reducer for FEED_DELETE_FAIL
			dispatch({
				type: FEED_DELETE_FAIL,
				payload: err.response.data.msg,
			});
		}
	};

	// Delete counsellor feedback
	const deleteCounFeed = async (formData) => {
		// Set header and data in the config
		const config = {
			headers: {
				'Content-Type': 'application/json',
			},
			data: {
				...formData,
			},
		};

		try {
			// Make a delete request at localhost:5000/{API_URL}/admin/counfeed
			await axios.delete(`${API_URL}/admin/counfeed`, config);

			// Load counsellor feedbacks after deletion
			loadCounFeed();
		} catch (err) {
			// Dispatch the action to reducer for FEED_DELETE_FAIL
			dispatch({
				type: FEED_DELETE_FAIL,
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
		<AdminContext.Provider
			// Provide these values to all components wrapped in AdminContext in App.js
			value={{
				error: state.error,
				quesAns: state.quesAns,
				pending: state.pending,
				students: state.students,
				approved: state.approved,
				rejected: state.rejected,
				counfeed: state.counfeed,
				studfeed: state.studfeed,
				clearErrors,
				loadPending,
				approveCoun,
				rejectCoun,
				loadQuesAns,
				updateQuiz,
				loadStudents,
				loadApproved,
				loadRejected,
				loadCounFeed,
				loadStudFeed,
				deleteCounFeed,
				deleteStudFeed,
			}}
		>
			{props.children}
		</AdminContext.Provider>
	);
};

export default AdminState;
