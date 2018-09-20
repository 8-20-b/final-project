module.exports = (sequelize, DataTypes) => {
  var Model = sequelize.define("Genre", {
    // genreId: {
    //   type: DataTypes.INTEGER,
    //   primaryKey: true,
    //   allowNull: false
    // },
    name: DataTypes.STRING
  });

  Model.associate = function(models) {
    this.Movie = this.belongsToMany(models.Movie, {
      through: "MovieGenres",
      foreignKey: "genreId"
    });
  };
  // Model.associate = function(models) {
  //   this.Genre = this.belongsTo(models.Actor, {
  //     foreignKey: "actorId"
  //   });
  //   this.Genre = this.belongsTo(models.Movie, {
  //     foreignKey: "movieId"
  //   });
  // };

  return Model;
};
