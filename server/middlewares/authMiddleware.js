import jwt from 'jsonwebtoken';
import db from '../config/db.js'; // <--- THIS WAS MISSING!

// Protected Routes Token Base
export const requireSignIn = async (req, res, next) => {
    try {
        let token = req.headers.authorization;
        
        if (!token) {
            return res.status(401).send({
                success: false,
                message: "Access Denied: No Token Provided"
            });
        }

        // Handle "Bearer " prefix
        if (token.startsWith("Bearer ")) {
            token = token.slice(7, token.length);
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; 
        next();

    } catch (error) {
        console.log("Middleware Error:", error);
        return res.status(401).send({
            success: false,
            message: "Invalid Token or Session Expired",
            error
        });
    }
};

export const isAdmin = async (req, res, next) => {
    try {
        // This line was crashing because 'db' wasn't imported
        const connection = await db.getConnection(); 
        
        const [rows] = await connection.query("SELECT role FROM users WHERE user_id = ?", [req.user._id]);
        connection.release();

        if (rows.length === 0) {
            return res.status(404).send({ success: false, message: "User not found" });
        }

        if (rows[0].role !== 1) {
            return res.status(401).send({ success: false, message: "Unauthorized Access" });
        }

        next(); 
    } catch (error) {
        console.log(error);
        // This is the 401 that was kicking you out!
        res.status(401).send({ success: false, error, message: "Error in admin middleware" });
    }
}