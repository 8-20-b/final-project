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
    voteAverage: {
      type: DataTypes.STRING
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
    genres: {
      type: DataTypes.STRING
    }
  });

  Model.associate = function(models) {
    this.Movie = this.hasMany(models.List, {
      foreignKey: "movieId"
    });
  };

  // sequelize.sync({ force: true });

  return Model;
};
