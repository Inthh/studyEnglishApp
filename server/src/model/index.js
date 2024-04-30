import { Sequelize } from 'sequelize';
import User from './User.js';
import Login from './Login.js';
import Topics from './Topics.js';
import Vocabularies from './Vocabularies.js';
import UserVocabulary from './UserVocabulary.js';
import VocabularySets from './VocabularySets.js';
import { DB_DBMS, DB_HOSTNAME, DB_NAME, DB_PASSWORD, DB_USERNAME } from '../utils/constants.js';


const sequelize = new Sequelize(
    DB_NAME,
    DB_USERNAME,
    DB_PASSWORD,
    {
        host: DB_HOSTNAME,
        dialect: DB_DBMS
    }
);

const user = User(sequelize);
const login = Login(sequelize);
const topics = Topics(sequelize);
const vocabularies = Vocabularies(sequelize);
const userVocabulary = UserVocabulary(sequelize);
const vocabularySets = VocabularySets(sequelize);

user.hasOne(login, { foreignKey: 'userId' });
login.belongsTo(user, { foreignKey: 'userId' });

user.hasMany(userVocabulary, { foreignKey: 'userId' });
userVocabulary.belongsTo(user, { foreignKey: 'userId' });

vocabularies.hasMany(userVocabulary, { foreignKey: 'vocabularyId' });
userVocabulary.belongsTo(vocabularies, { foreignKey: 'vocabularyId' });

topics.hasMany(vocabularies, { foreignKey: 'topicId' });
vocabularies.belongsTo(topics, { foreignKey: 'topicId' });

vocabularySets.hasMany(topics, { foreignKey: 'setId' });
topics.belongsTo(vocabularySets, { foreignKey: 'setId' });

const db = {
    sequelize: sequelize,
    User: user,
    Login: login,
    Topics: topics,
    Vocabularies: vocabularies,
    VocabularySets: vocabularySets,
    UserVocabulary: userVocabulary,
}

db.sequelize.options.logging = false;

export default db;