import { DataTypes } from 'sequelize';

const FlashCard = (db) => db.define('flashCard', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    tableName: 'flashCard',
    timestamps: false
});

export default FlashCard;