module.exports = (sequelize, DataTypes) => {
  var Model = sequelize.define("Genre", {
    genreId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false
    },
    name: DataTypes.STRING
  });

  Model.associate = function(models) {
    this.Movies = this.belongsToMany(models.Movie, {
      through: "MovieGenres",
      foreignKey: "movieId"
    });
  };

  return Model;
};
