module.exports = (sequelize, DataTypes) => {
  var Model = sequelize.define("User", {
    userId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: { isEmail: { msg: "Email invalid." } }
    },
    password: DataTypes.STRING
  });

  return Model;
};
