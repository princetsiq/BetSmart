export default (sequelize, DataTypes) => {
  return sequelize.define('UserPlayer', {  
    user_email: {
      type: DataTypes.STRING,
      references: {
        model: 'Users',
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
};