import VerifyToken from "../../middleware/VerifyToken.js";
import { User } from "../../model/ExportModel.js";

export default function GetUser(app){
    app.get('/api/v1/user/get',VerifyToken ,async (req, res) => {
        try {
            const users = await User.find().lean();
            return res.status(200).json(users);
        } catch (err) {
            console.error('Error fetching users:', err);
            return res.status(500).json({ error: 'Internal server error', err });
        }
    });

}
