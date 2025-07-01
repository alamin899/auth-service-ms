import jwt from 'jsonwebtoken';

export const verifyTokenController = (req, res) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    const authHeader = req.headers['authorization'];

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({
            message: "Unauthorized",
            data: null,
            error: "Missing or invalid Authorization header"
        });
    }

    const token = authHeader.split(' ')[1];

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        return res.status(200).json({
            message: "Token is valid",
            data: decoded,
            error: null
        });
    } catch (err) {
        return res.status(403).json({
            message: "Invalid or expired token",
            data: null,
            error: err.message
        });
    }
};
