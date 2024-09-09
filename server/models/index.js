import { Sequelize } from 'sequelize';
import sequelize from '../config/dbConfig.js';

import UserModel from './user.js';
import UserTeamModel from './userTeam.js';
import UserPlayerModel from './userPlayer.js';
import UserPfpModel from './userPfp.js';

const User = UserModel(sequelize, Sequelize.DataTypes);
const UserTeam = UserTeamModel(sequelize, Sequelize.DataTypes);
const UserPlayer = UserPlayerModel(sequelize, Sequelize.DataTypes);
const UserPfp = UserPfpModel(sequelize, Sequelize.DataTypes);

User.hasMany(UserTeam, { foreignKey: 'user_email', onDelete: 'CASCADE' });
UserTeam.belongsTo(User, { foreignKey: 'user_email' });

User.hasMany(UserPlayer, { foreignKey: 'user_email', onDelete: 'CASCADE' });
UserPlayer.belongsTo(User, { foreignKey: 'user_email' });

User.hasOne(UserPfp, { foreignKey: 'email', onDelete: 'CASCADE' });
UserPfp.belongsTo(User, { foreignKey: 'email' });

const db = {
  User,
  UserTeam,
  UserPlayer,
  UserPfp,
  sequelize,
  Sequelize,  
};

export default db;