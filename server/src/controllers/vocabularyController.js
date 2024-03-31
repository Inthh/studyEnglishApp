import { Op } from "sequelize";
import db from "../model/index.js";

const vocaController = {
    // Get all the vocabularies by topic Id
    getVocabularies: async (req, res) => {
        const userId = req.userId;
        let { topicId } = req.query;
        try {
            topicId = parseInt(topicId);

            const vocabularies = await db.Vocabularies.findAll({
                where: { topicId },
                include: {
                    attributes: ["memoried"],
                    model: db.UserVocabulary,
                    where: { userId },
                    required: false
                },
                raw: true
            });

            vocabularies.forEach(voc => {
                voc.isMemoried = !!voc['userVocabularies.memoried'],
                delete voc['userVocabularies.memoried']
            });
            console.log(`Getting all vocabularies successfully topicId=${topicId}`);
            res.json({ vocabularies });
        } catch (err) {
            console.log(`Error while getting all vocabularies topicId=${topicId} reason=${err.message}`);
            res.status(500).json({ message: 'Internal server error' });
        }
    },

    updateMemoried: async (req, res) => {
        const userId = req.userId;
        const { vocabularyId, isMemoried, allUnmemoried, topicId } = req.body;
        try {
            if (allUnmemoried) {
                const vocaIds = await db.Vocabularies.findAll({
                    attributes: ["id"],
                    where: { topicId },
                    raw: true
                })
                await db.UserVocabulary.update(
                    { memoried: false },
                    { 
                        where: { 
                            userId, 
                            vocabularyId: {
                                [Op.in]: vocaIds.map(vocaId => vocaId.id)
                            }
                        } 
                    })
                console.log(`Update unmemoried for all vocabularies of topicId=${topicId} and userId=${userId} successful`)
                return res.json({ vocabularyId: vocaIds[0].id, isMemoried: false });
            }

            const userVoca = await db.UserVocabulary.findOne({
                where: { userId, vocabularyId },
            });
            if (userVoca) {
                await db.UserVocabulary.update(
                    { memoried: isMemoried },
                    { where: { userId, vocabularyId } }
                )
            } else {
                await db.UserVocabulary.create(
                    {  userId, vocabularyId, memoried: isMemoried },
                )
            }

            console.log(userVoca ?
                `Update memoried for vocabularyId=${vocabularyId} and userId=${userId} successfully` :
                `Create vocabularyId=${vocabularyId} and userId=${userId} successfully`);
            res.json({ vocabularyId, isMemoried });
        } catch (err) {
            console.log(`Error while updating memoried for userId=${userId} params=${vocabularyId, isMemoried, allUnmemoried, topicId} reason=${err.message}`);
            res.status(500).json({ message: 'Internal server error' });
        }
    }
};

export default vocaController;