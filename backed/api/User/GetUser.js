import User from "../../model/User.js";

export default function GetUser(app){
    app.get('/api/v1/user/get', async (req, res) => {
        try {
            const users = await User.find();
            res.send(users);
        } catch (err) {
            res.status(500).send(err.message);
        }
    });

}