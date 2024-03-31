import db from "../model/index.js";
import { TOPICS_PAGE_SIZE } from "../utils/constants.js";

const topicController = {
    getAllTopic: async (req, res) => {
        try {
            let { setId, pageNumber } = req.query;
            const offset = (parseInt(pageNumber) - 1) * TOPICS_PAGE_SIZE
            setId = parseInt(setId);

            const topics = await db.Topics.findAll({
                attributes: ['id', 'name'],
                where: { setId },
                limit: TOPICS_PAGE_SIZE,
                offset,
                raw: true
            });

            const totalTopics = await db.Topics.count({
                where: { setId }
            })
            console.log('Getting all topics successfully ', setId);
            res.json({ topics, totalTopics });
        } catch (err) {
            console.log('Error while getting all topics: ', err.message);
            res.status(500).json({ message: 'Internal server error' });
        }
    },

    getTotalTopics: async (req, res) => {
        try {
            let { setId } = req.query;

            const totalTopics = await db.Topics.count({
                where: { setId }
            })

            console.log(`Getting total topics successfully totalTopics=${totalTopics} setId=${setId}`);
            res.json({ totalTopics });
        } catch (err) {
            console.log('Error while getting total topics: ', err.message);
            res.status(500).json({ message: 'Internal server error' });
        }
    }
};

export default topicController;