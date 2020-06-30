const { Sequelize } = require("sequelize");
const Model = Sequelize.Model;
class Cart extends Model {}
Cart.init(
  {
    id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    book_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    quentity: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    amount: {
      type: Sequelize.DECIMAL(10, 2),
      allowNull: false,
    },
    payment_status: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    user_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    created_at: {
      type: Sequelize.DATE,
    },
    updated_at: {
      type: Sequelize.DATE,
    },
  },
  {
    sequelize,
    timestamps: false,
    tableName: "cart",
    modelName: "cart",
  }
);
module.exports = Cart;
