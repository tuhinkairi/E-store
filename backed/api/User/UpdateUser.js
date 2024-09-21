import User from "../../model/User.js";

export default function UpdateUser(app) {
    app.patch('/api/v1/user/update/:id', async (req, res) => {
        try {
          const userId = req.params.id;
          const updates = req.body;
          
          const user = await User.findByIdAndUpdate(userId, updates, { new: true });
      
          if (!user) {
            return res.status(404).json({ error: 'User not found' });
          }
      
          res.json(user);
        } catch (err) {
          console.error(err);
          res.status(500).json({ error: 'Internal Server Error' });
        }
      });
}