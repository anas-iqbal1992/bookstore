const { Sequelize } = require("sequelize");
const Model = Sequelize.Model;
class State extends Model {}
State.init(
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
    },
    name: {
      type: Sequelize.STRING,
    },
    country_id: {
      type: Sequelize.INTEGER,
    },
    status: {
      type: Sequelize.INTEGER,
    },
  },
  {
    sequelize,
    timestamps: false,
    tableName: "states",
  }
);
module.exports = State;