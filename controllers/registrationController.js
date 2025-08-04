import pool from '../config/db.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const register = async (req, res) => {
    const { email, password } = req.body;
    let connection;

    try {
        connection = await pool.getConnection();

        // Check if email already exists
        const [existingUser] = await connection.execute('SELECT id FROM users WHERE email = ?', [email]);
        if (existingUser.length > 0) {
            return res.status(400).json({
                message: 'Email already registered',
                data: null,
                error: 'Email already registered'
            });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Insert new user
        const [result] = await connection.execute(
            'INSERT INTO users (email, password) VALUES (?, ?)',
            [email, hashedPassword]
        );

        // Generate JWT
        const token = jwt.sign(
            { userId: result.insertId, email },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        return res.status(201).json({
            message: 'success',
            data: {
                token,
                email
            },
            error: null
        });
    } catch (err) {
        console.error('Registration error:', err.message);
        return res.status(500).json({
            message: 'Server error',
            data: null,
            error: err.message
        });
    } finally {
        if (connection) connection.release();  // release connection back to pool
    }
};
