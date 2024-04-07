import { DataTypes } from 'sequelize';

const User = (db) => db.define('user', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    firstName: {
        type: DataTypes.STRING
    },
    lastName: {
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