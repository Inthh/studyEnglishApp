import db from "../model/index.js";

const flashCardController = {
    getAllFlashCard: async (req, res) => {
        try {
            let { userId } = req.query;

            userId = parseInt(userId);

            const flashCards = await db.FlashCard.findAll({
                attributes: ['id', 'name'],
                where: { userId },
                raw: true
            });

            res.json({ flashCards });
        } catch (err) {
            console.log('Error while getting flash cards: ', err.message);
            res.status(500).json({ message: 'Internal server error' });
        }
    }
};

export default flashCardController;