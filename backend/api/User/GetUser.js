import User from "../../model/User.js";

export default function GetUser(app){
    app.get('/api/v1/user/get', async (req, res) => {
        try {
            const users = await User.find().lean();
            res.json(users);
        } catch (err) {
            console.error('Error fetching users:', err);
            res.status(500).json({ error: 'Internal server error' });
        }
    });

}
