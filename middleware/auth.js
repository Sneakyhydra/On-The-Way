// Imports
const jwt = require("jsonwebtoken"); // Verify token
const config = require("config"); // Global variables

const auth = (req, res, next) => {
    // Get token from cookies
    const token = req.cookies.token;

    // Check if token exists
    if (!token) {
        res.clearCookie("token");

        // Return json with the given status and message
        return res.status(401).json({ msg: "No token, authorization denied" });
    }

    try {
        // Verify the token
        const decoded = jwt.verify(token, config.get("jwtSecret"));

        // Store user_id in req
        req.user_id = decoded.id;

        // Go next
        next();
    } catch (err) {
        res.clearCookie("token");

        // Return json with the given status and message
        res.status(401).json({ msg: "Token is not valid" });
    }
};

module.exports = auth;