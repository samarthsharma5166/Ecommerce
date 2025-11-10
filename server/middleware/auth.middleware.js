import jwt from 'jsonwebtoken';
export const isLoggedIn = async (req, res, next) => {
    const { token } = req.cookies || req.cookies.token;
    if (!token) {
        return res.status(401).json({
            success: false,
            message: "Unauthanticated please login again"
        })
    }
    const userDetails = await jwt.verify(token, process.env.SECRET);
    req.user = userDetails;
    next();
}
