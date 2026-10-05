const jwt = require("jsonwebtoken");

function verifyAdmin(req, res, next) {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({
            error: "No token provided"
        });
    }

    const token = authHeader.split(" ")[1];

    if (!token) {
        return res.status(401).json({
            error: "Invalid authorization format"
        });
    }

    try {
        const decoded = jwt.verify(
            token,
            process.env.JWT_ADMIN_PRIVATE_KEY
        );

        if (decoded.role !== "admin") {
            return res.status(403).json({
                error: "Admin access required"
            });
        }

        req.admin_id = decoded.user_id;

        next();

    } catch (error) {
        return res.status(401).json({
            error: "Invalid or expired admin token"
        });
    }
}

module.exports = verifyAdmin;