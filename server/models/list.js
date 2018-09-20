module.exports = (sequelize, DataTypes) => {
  var Model = sequelize.define("List", {
    listId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    type: {
      type: DataTypes.ENUM("favorite", "later"),
      allowNull: false
    }
  });

  Model.associate = function(models) {
    // this.List = this.hasMany(models.User, {
    //   foreignKey: "userId"
    // });
    // this.List = this.belongsTo(models.Movie, {
    //   foreignKey: "movieId"
    // });
    // this.List = this.hasMany(models.Movie, {
    //   foreignKey: "movieId"
    // });
  };

  sequelize.sync({ force: true });
  return Model;
};
