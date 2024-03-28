import { DataTypes } from 'sequelize';

const Vocabularies = (db) => db.define('vocabularies', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    topicId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    word: {
        type: DataTypes.STRING,
        allowNull: false
    },
    vietnamese: {
        type: DataTypes.STRING,
        allowNull: false
    },
    partsOfSpeech: {
        type: DataTypes.STRING
    },
    pronunciation: {
        type: DataTypes.STRING
    },
    audioUrl: {
        type: DataTypes.STRING
    },
    example: {
        type: DataTypes.TEXT
    }
}, {
    tableName: 'vocabularies',
    timestamps: false
});

export default Vocabularies;