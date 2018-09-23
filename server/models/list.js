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
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    movieId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  });

  Model.associate = function(models) {
    this.List = this.belongsTo(models.Movie, {
      foreignKey: "movieId"
    });
    this.List = this.belongsTo(models.User, {
      foreignKey: "userId"
    });
  };

  // sequelize.sync({ force: true });
  return Model;
};
