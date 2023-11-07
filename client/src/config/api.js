// export const API_URL = 'https://on-the-way-api.vercel.app/api';
// export const API_URL = 'http://localhost:5000/api';
export const API_URL =
	process.env.NODE_ENV === 'development'
		? process.env.REACT_APP_DEV_URL
		: process.env.REACT_APP_PRO_URL;
