module.exports = (sequelize, DataTypes) => {
  var Model = sequelize.define("Comments", {
    commentId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    type: {
      type: DataTypes.STRING,
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
      foreignKey: "commentId"
    });
    this.Comment = this.belongsTo(models.User, {
      foreignKey: "userId"
    });
  };

  // sequelize.sync({ force: true });

  return Model;
};
