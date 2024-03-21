import { DataTypes } from 'sequelize';

const Topics = (db) => db.define('topics', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    setId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    vietnameseName: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    tableName: 'topics',
    timestamps: false
});

export default Topics;