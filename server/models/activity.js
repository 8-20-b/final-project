module.exports = (sequelize, DataTypes) => {
  var Model = sequelize.define("Activity", {
    action: {
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
    this.Activity = this.belongsTo(models.Movie, {
      foreignKey: "movieId"
    });
    this.Activity = this.belongsTo(models.User, {
      foreignKey: "userId"
    });
  };

  // Model.sync({ force: true });

  return Model;
};
