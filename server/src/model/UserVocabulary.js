import { DataTypes } from 'sequelize';

const UserVocabulary = (db) => db.define('userVocabulary', {
    userId: {
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    vocabularyId: {
        type: DataTypes.INTEGER,
        primaryKey: true
    }
}, {
    tableName: 'userVocabulary',
    modelName: 'userVocabulary',
    timestamps: false
});

export default UserVocabulary;