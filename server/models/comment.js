module.exports = (sequelize, DataTypes) => {
  var Model = sequelize.define("Comment", {
    commentId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    comment: {
      type: DataTypes.TEXT,
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
    this.Comment = this.belongsTo(models.Movie, {
      foreignKey: "movieId"
    });
    this.Comment = this.belongsTo(models.User, {
      foreignKey: "userId"
    });
  };

  //Model.sync({ force: true });

  return Model;
};
