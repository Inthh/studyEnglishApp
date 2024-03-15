import { DataTypes } from 'sequelize';

const Vocabulary = (db) => db.define('vocabulary', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    flashCardId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    word: {
        type: DataTypes.STRING,
        allowNull: false
    },
    translation: {
        type: DataTypes.STRING,
        allowNull: false
    },
    partsOfSpeech: {
        type: DataTypes.STRING
    },
    type: {
        type: DataTypes.STRING
    }
}, {
    tableName: 'vocabulary',
    timestamps: false
});

export default Vocabulary;