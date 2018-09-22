module.exports = (sequelize, DataTypes) => {
  var Model = sequelize.define("Movie", {
    movieId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false
    },
    title: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    overview: {
      type: DataTypes.TEXT
    },
    userRating: {
      type: DataTypes.FLOAT(1, 1)
    },
    voteCount: {
      type: DataTypes.INTEGER
    },
    posterPath: {
      type: DataTypes.STRING
    },
    backdropPath: {
      type: DataTypes.STRING
    },
    releaseDate: {
      type: DataTypes.DATEONLY
    },
    length: {
      type: DataTypes.INTEGER
    },
    trailer: {
      type: DataTypes.STRING
    }
  });

  Model.associate = function(models) {
    this.Genres = this.belongsToMany(models.Genre, {
      through: "MovieGenres",
      foreignKey: "genreId"
    });
  };

  //sequelize.sync({ force: true });

  return Model;
};
