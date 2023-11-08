// Imports
const jwt = require('jsonwebtoken'); // Verify token

const auth = (req, res, next) => {
	// Get token from cookies
	const token = req.cookies.token;

	// Check if token exists
	if (!token) {
		res.clearCookie('token', {
			domain:
				process.env.NODE_ENV !== 'development'
					? 'on-the-way-sneakyhydra.vercel.app'
					: 'localhost',
			path: '/',
			sameSite: process.env.NODE_ENV !== 'development' ? 'None' : 'Lax',
		});

		// Return json with the given status and message
		return res.status(401).json({ msg: 'No token, authorization denied' });
	}

	try {
		// Verify the token
		const decoded = jwt.verify(token, process.env.JWT_SECRET);

		// Store user_id in req
		req.user_id = decoded.id;

		// Go next
		next();
	} catch (err) {
		res.clearCookie('token', {
			domain:
				process.env.NODE_ENV !== 'development'
					? 'on-the-way-sneakyhydra.vercel.app'
					: 'localhost',
			path: '/',
			sameSite: process.env.NODE_ENV !== 'development' ? 'None' : 'Lax',
		});

		// Return json with the given status and message
		res.status(401).json({ msg: 'Token is not valid' });
	}
};

module.exports = auth;
