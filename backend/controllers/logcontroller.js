const bcrypt = require('bcrypt');
const db = require('../config/db');
const { generateToken } = require('../middleware/auth');


exports.saveLog = async (user_id, activity_type, description) => {
    try {
        if (!user_id) {
            return;
        }
        
        await db.query(
            `INSERT INTO activity_log(user_id, activity_type, description) VALUES (?, ?, ?)`, 
            [user_id, activity_type, description]
        );
    } catch (error) {
        console.error('Error saving log:', error);
        throw error;  
    }
};

exports.saveLogHandler = async (req, res) => {
    try {
        const { user_id, activity_type, description } = req.body;
       
        const userId = user_id || (req.user && (req.user.userId || req.user.id));

        if (!userId || !activity_type) {
            return res.status(400).json({ success: false, message: 'user_id and activity_type are required' });
        }

        await exports.saveLog(userId, activity_type, description || '');
        res.json({ success: true, message: 'Log saved' });
    } catch (error) {
        console.error('Error in saveLogHandler:', error);
        res.status(500).json({ success: false, message: 'Error saving log', error: error.message });
    }
};

exports.getLog = async (req, res) => {
    try {
        const { userId } = req.params;

        const [logs] = await db.query(
            'SELECT user_id, activity_type, description, timestamp FROM activity_log WHERE user_id = ?',
            [userId]
        );

        if (logs.length === 0) {
            return res.status(404).json({ 
                success: false, 
                message: 'No activity logs found for this user' 
            });
        }
res.json({ 
            success: true, 
            data: logs 
        });
    } catch (error) {
        console.error('Error fetching log:', error);
        res.status(500).json({ 
            success: false, 
            message: 'Error fetching log',
            error: error.message 
        });
    }
};


