import pool from '../config/db.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const [rows] = await pool.execute('SELECT * FROM users WHERE email = ?', [email]);

        if (rows.length === 0) {
            return res.status(401).json({
                message: "Invalid credentials",
                data: null,
                error: "Invalid credentials"
            });
        }

        const user = rows[0];
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(401).json({
                message: "Invalid credentials",
                data: null,
                error: "Invalid credentials"
            });
        }

        const token = jwt.sign(
            { userId: user.id, email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        return res.json({
            message: "success",
            data: {
                token,
                email: user.email
            },
            error: null
        });
    } catch (err) {
        console.error('Login error:', err.message);
        return res.status(500).json({
            message: "Server error",
            data: null,
            error: err.message
        });
    }

};
