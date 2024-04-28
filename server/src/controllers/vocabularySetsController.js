import db from "../model/index.js";

const vocaSetsController = {
    getAllVocaSets: async (req, res) => {
        try {
            const vocabularySets = await db.VocabularySets.findAll({
                attributes: ['id', 'name', 'description', 'thumbnail'],
                raw: true
            });
            console.log('Getting all vocabulary sets successfully');
            res.json({ vocabularySets });
        } catch (err) {
            console.log('Error while getting all vocabulary sets: ', err.message);
            res.status(500).json({ message: 'Internal server error' });
        }
    }
};

export default vocaSetsController;