module.exports = (sequelize, DataTypes) => {
  var Model = sequelize.define("Movie", {
    movieId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    imdbId: {
      type: DataTypes.STRING,
      validate: { len: 9 }
    },
    title: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    overview: {
      type: DataTypes.TEXT
    },
    userRating: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    poster_url: {
      type: DataTypes.STRING
    },
    release_date: {
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
    this.Movie = this.belongsTo(models.Genre, {
      foreignKey: "genreId"
    });
    this.Movie = this.belongsTo(models.Actor, {
      foreignKey: "actorId"
    });
  };

  return Model;
};
