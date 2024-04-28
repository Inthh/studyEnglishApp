import { DataTypes } from 'sequelize';

const VocabularySets = (db) => db.define('VocabularySets', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT
    },
    thumbnail: {
        type: DataTypes.TEXT
    }
}, {
    tableName: 'VocabularySets',
    timestamps: false
});

export default VocabularySets;