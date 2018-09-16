module.exports = (sequelize, DataTypes) => {
  var Model = sequelize.define("Actor", {
    actorId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    }
  });

  Model.associate = function(models) {
    this.Actor = this.belongsTo(models.Genre, {
      foreignKey: "genreId"
    });
    this.Actor = this.belongsTo(models.Movie, {
      foreignKey: "movieId"
    });
  };

  return Model;
};
