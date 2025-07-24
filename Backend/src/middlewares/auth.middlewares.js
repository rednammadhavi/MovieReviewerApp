import jwt from "jsonwebtoken";

const verifyJWT = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const dcryptedToken = jwt.verify(token, process.env.JWT_SECRET);
        req.userId = dcryptedToken.userId;
        next();
    } catch (error) {
        res.status(401).json({ message: error.message, success: false });
    }
};

export { verifyJWT };
