import db from "../model/index.js";

const userController = {
    getInfo: async (req, res) => {
        try {
            const { userId } = req.params;

            const user = await db.User.findOne({
                where: { id: userId },
                include: {
                    attributes: ["username"],
                    model: db.Login,
                    required: false
                },
                raw: true
            });

            if (!user) {
                res.status(404).json({ message: "User not found" });
                return;
            }

            user.username = user["login.username"];
            delete user["login.username"];
            res.json({ user });
        } catch (err) {
            console.log("Error while getting info of user: ", err.message);
            res.status(500).json({ message: "Internal server error" });
        }
    },

    updateInfo: async (req, res) => {
        const { firstname, lastname, photoURL } = req.body;
        const userId = req.userId;

        try {
            if (!firstname) {
                console.log("Updated user's information is invalid: ", { firstname, lastname, userId });
                return res.status(400).json({ message: "Updated information is invalid" });
            }

            await db.User.update({
                firstname,
                lastname,
                photoURL
            },{
                where: { id: userId }
            });

            console.log("Update user's infomation successfully", { firstname, lastname, userId });
            return res.status(200).json({ firstname, lastname, photoURL });
        } catch (err) {
            console.log("An error occured while updating user's infomation", { firstname, lastname, userId });
            return res.status(500).json({ message: "Internal server error" });
        }
    }
};

export default userController;