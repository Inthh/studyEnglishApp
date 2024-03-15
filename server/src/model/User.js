import { DataTypes } from 'sequelize';

const User = (db) => db.define('user', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    firstName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    lastName: {
        type: DataTypes.STRING
    }
}, {
    tableName: 'user',
    timestamps: false
});

export default User;