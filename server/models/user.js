import { DataTypes } from 'sequelize';
import sequelize from '../config/dbConfig.js';

const User = sequelize.define('User', {
  email: {
    type: DataTypes.STRING,
    primaryKey: true,
  },
  username: DataTypes.STRING,
  first_name: DataTypes.STRING,
  last_name: DataTypes.STRING,
});

User.hasMany(UserTeam, { foreignKey: 'user_email' });
UserTeam.belongsTo(User, { foreignKey: 'user_email' });

User.hasMany(UserPlayer, { foreignKey: 'user_email' });
UserPlayer.belongsTo(User, { foreignKey: 'user_email' });

export default User;