export default (sequelize, DataTypes) => {
  return sequelize.define('UserTeam', {
    user_email: {
      type: DataTypes.STRING,
      references: {
        model: 'Users',  
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
};