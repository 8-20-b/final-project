module.exports = (sequelize, DataTypes) => {
  var Model = sequelize.define("Genre", {
    genreId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    }
  });

  Model.associate = function(models) {
    this.Genre = this.belongsTo(models.Actor, {
      foreignKey: "actorId"
    });
    this.Genre = this.belongsTo(models.Movie, {
      foreignKey: "movieId"
    });
  };

  return Model;
};
