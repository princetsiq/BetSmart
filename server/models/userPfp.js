export default (sequelize, DataTypes) => {
  return sequelize.define('UserPfp', {
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'Users', 
        key: 'email',
      }
    },
    pfpType: {
      type: DataTypes.ENUM('initials', 'image', 'silhouette'),
      allowNull: true,
      defaultValue: 'silhouette'
    },
    initials: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        len: [2, 3]
      }
    },
    image: {
      type: DataTypes.BLOB,
      allowNull: true
    }
  });
};