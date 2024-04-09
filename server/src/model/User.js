import { DataTypes } from 'sequelize';

const User = (db) => db.define('user', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    firstname: {
        type: DataTypes.STRING
    },
    lastname: {
        type: DataTypes.STRING
    },
    email: {
        type: DataTypes.STRING
    },
    uid: {
        type: DataTypes.STRING
    },
    displayName: {
        type: DataTypes.STRING
    },
    type: {
        type: DataTypes.STRING,
        defaultValue: 'default'
    }
}, {
    tableName: 'user',
    timestamps: false
});

export default User;