import { Sequelize } from 'sequelize';
import User from './User.js';
import Login from './Login.js';
import FlashCard from './FlashCard.js';
import Vocabulary from './Vocabulary.js';

const sequelize = new Sequelize(
    'estudy',
    'root',
    'my-secret-pw',
    {
        host: 'localhost',
        dialect: 'mysql'
    }
);

const user = User(sequelize);
const login = Login(sequelize);
const flashCard = FlashCard(sequelize);
const vocabulary = Vocabulary(sequelize);

user.hasOne(login, { foreignKey: 'userId' });
login.belongsTo(user, { foreignKey: 'userId' });

// user.hasMany(flashCard, { foreignKey: 'userId' });
// flashCard.belongsTo(user, { foreignKey: 'userId' });

// flashCard.hasMany(vocabulary, { foreignKey: 'flashCardId' });
// vocabulary.belongsTo(flashCard, { foreignKey: 'flashCardId' });

const db = {
    sequelize: sequelize,
    User: user,
    Login: login,
    FlashCard: flashCard,
    Vocabulary: vocabulary,
}


db.sequelize.options.logging = false;

export default db;