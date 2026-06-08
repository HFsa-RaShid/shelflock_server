import jwt from 'jsonwebtoken';
export const verifyToken = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token)
        return res.status(401).json({ message: 'লগইন করুন!' });
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        // এখন আর এরর দিবে না! 😎
        req.merchant = decoded;
        next();
    }
    catch (error) {
        res.status(403).json({ message: 'টোকেন সঠিক নয়!' });
    }
};
//# sourceMappingURL=auth.middleware.js.map