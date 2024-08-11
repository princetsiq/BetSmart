import { DataTypes } from 'sequelize';
import sequelize from '../config/dbConfig.js';

const UserPlayer = sequelize.define('UserPlayer', {
    user_email: {
        type: DataTypes.STRING,
        references: {
            model: User,
            key: 'email',
        },
        allowNull: false,
    },
    player_id: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    primaryKey: ['user_email', 'player_id'],
});
