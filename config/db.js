import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

// Test the database connection once at startup
(async () => {
    try {
        const connection = await pool.getConnection();
        console.log('✅ Connected to MySQL database successfully.');
        connection.release();
    } catch (err) {
        console.error('❌ Failed to connect to MySQL database.');
        console.error('Error name:', err.name);
        console.error('Error message:', err.message);
        console.error('Stack trace:', err.stack);
        process.exit(1); // Optional: stop the app if DB connection fails
    }
})();

export default pool;
