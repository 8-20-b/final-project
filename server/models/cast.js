module.exports = (sequelize, DataTypes) => {
  var Model = sequelize.define("Cast", {
    castId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false
    },
    name: DataTypes.STRING,
    biography: DataTypes.TEXT,
    birthday: DataTypes.DATEONLY,
    placeOfBirth: DataTypes.STRING,
    profilePath: DataTypes.STRING
  });

  Model.associate = function(models) {
    this.Movie = this.belongsToMany(models.Movie, {
      through: "MovieCasts",
      foreignKey: "castId"
    });
  };

  // Model.associate = function(models) {
  //   this.Actor = this.belongsTo(models.Genre, {
  //     foreignKey: "genreId"
  //   });
  //   this.Actor = this.belongsTo(models.Movie, {
  //     foreignKey: "movieId"
  //   });
  // };

  return Model;
};
