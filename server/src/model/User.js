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
    uid: {
        type: DataTypes.STRING
    },
    photoURL: {
        type: DataTypes.TEXT
    },
    displayName: {
        type: DataTypes.STRING
    }
}, {
    tableName: 'user',
    timestamps: false
});

export default User;