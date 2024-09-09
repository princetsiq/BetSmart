import { Sequelize } from 'sequelize';
import UserPfpModel from './userPfp.js';
import sequelize from '../config/dbConfig.js';

const UserPfp = UserPfpModel(sequelize, Sequelize.DataTypes);

export default (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    email: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    first_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    last_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  User.afterCreate(async (user) => {
    try {
      await UserPfp.create({
        email: user.email,
        pfpType: 'silhouette',  
        initials: `${user.first_name[0]}${user.last_name[0]}`.toUpperCase(), 
      });
    } catch (error) {
      console.error('Error creating UserPfp:', error);
    }
  });

  return User;
};