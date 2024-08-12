import { Sequelize } from 'sequelize';
import sequelize from '../config/dbConfig.js';

import UserModel from './user.js';
import UserTeamModel from './userTeam.js';
import UserPlayerModel from './userPlayer.js';

const User = UserModel(sequelize, Sequelize.DataTypes);
const UserTeam = UserTeamModel(sequelize, Sequelize.DataTypes);
const UserPlayer = UserPlayerModel(sequelize, Sequelize.DataTypes)

User.hasMany(UserTeam, { foreignKey: 'user_email' });
UserTeam.belongsTo(User, { foreignKey: 'user_email' });

User.hasMany(UserPlayer, { foreignKey: 'user_email' });
UserPlayer.belongsTo(User, { foreignKey: 'user_email' });

const db = {
  User,
  UserTeam,
  UserPlayer,
  sequelize,  
  Sequelize,  
};

export default db;