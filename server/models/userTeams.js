import { DataTypes } from 'sequelize';
import sequelize from '../config/dbConfig.js';

const UserTeam = sequelize.define('UserTeam', {
    user_email: {
        type: DataTypes.STRING,
        references: {
            model: User,
            key: 'email',
        },
        allowNull: false,
    },
    team_id: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    primaryKey: ['user_email', 'team_id'],
});