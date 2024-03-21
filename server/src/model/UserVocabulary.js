import { DataTypes } from 'sequelize';

const UserVocabulary = (db) => db.define('userVocabulary', {
    userId: {
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    vocabularyId: {
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    memoried: {
        type: DataTypes.BOOLEAN
    }
}, {
    tableName: 'userVocabulary',
    modelName: 'userVocabulary',
    timestamps: false
});

export default UserVocabulary;