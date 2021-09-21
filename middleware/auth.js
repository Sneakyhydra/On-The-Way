// Imports
const jwt = require("jsonwebtoken"); // To verify token
const config = require("config"); // For global variables

const auth = (req, res, next) => {
    // Get token from header
    const token = req.header("x-auth-token");

    // Check if not token
    if (!token) {
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
        // Return json with the given status and message
        res.status(401).json({ msg: "Token is not valid" });
    }
}

module.exports = auth;