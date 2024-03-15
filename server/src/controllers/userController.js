import db from "../model/index.js";

const authController = {
    getInfo: async (req, res) => {
        try {
            const { userId } = req.params;

            const user = await db.User.findOne({
                where: { id: userId },
                raw: true
            });

            if (!user) {
                res.status(404).json({ message: "User not found" });
                return;
            }

            res.json({ user });
        } catch (err) {
            console.log("Error while getting info of user: ", err.message);
            res.status(500).json({ message: "Internal server error" });
        }
    }
};

export default authController;