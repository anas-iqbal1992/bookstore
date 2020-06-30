const { Sequelize } = require("sequelize");
const SellerBooks = require("./SellerBooks");
const Model = Sequelize.Model;
class Category extends Model {}
Category.init(
  {
    id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    description: {
      type: Sequelize.TEXT,
    }
  },
  {
    sequelize,
    timestamps: false,
    tableName: "categories",
    modelName: 'category'
  }
);
Category.hasMany(SellerBooks, {as: 'sellerBooks',foreignKey: 'id', targetKey: 'category_id'});
SellerBooks.belongsTo(Category, {as: 'category', foreignKey: "category_id", targetKey: "id" });
module.exports = Category;
