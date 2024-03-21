import db from "../model/index.js";

const topicController = {
    getAllTopic: async (req, res) => {
        try {
            let { setId } = req.query;
            setId = parseInt(setId);

            const topics = await db.Topics.findAll({
                attributes: ['id', 'name'],
                where: { setId },
                limit: 6,
                raw: true
            });
            console.log('Getting all topics successfully ', setId);
            res.json({ topics });
        } catch (err) {
            console.log('Error while getting all topics: ', err.message);
            res.status(500).json({ message: 'Internal server error' });
        }
    }
};

export default topicController;