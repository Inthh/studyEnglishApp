import { DataTypes } from 'sequelize';

const Login = (db) => db.define('login', {
    userId: {
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING
    },
    type: {
        type: DataTypes.STRING,
        defaultValue: 'default'
    },
    publicKey: {
        type: DataTypes.TEXT
    },
    resetKey: {
        type: DataTypes.TEXT
    }
}, {
    tableName: 'login',
    timestamps: false
});

export default Login;