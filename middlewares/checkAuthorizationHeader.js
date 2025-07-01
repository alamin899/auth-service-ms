export const checkAuthorizationHeader = (req, res, next) => {
    const authHeader = req.headers['authorization'];

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({
            message: 'Token Missing',
            error: 'Missing or invalid Authorization header',
            data: null
        });
    }

    next();
};
