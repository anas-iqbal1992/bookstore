const { Sequelize } = require("sequelize");
const Category = require("./Category");
const Model = Sequelize.Model;
class SellerBooks extends Model {}
SellerBooks.init(
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
    book_image: {
      type: Sequelize.STRING,
    },
    author: {
      type: Sequelize.STRING,
    },
    category_id: {
      type: Sequelize.INTEGER,
      references: {
        model: Category,
        key: "category_id",
      },
    },
    subcategory: {
      type: Sequelize.STRING,
    },
    publisher: {
      type: Sequelize.STRING,
    },
    price: {
      type: Sequelize.DECIMAL(10, 2),
    },
    publish: {
      type: Sequelize.STRING,
    },
    addition: {
      type: Sequelize.INTEGER,
    },
    description: {
      type: Sequelize.TEXT,
    },
    type: {
      type: Sequelize.ENUM("new", "old"),
    },
    condition: {
      type: Sequelize.ENUM("average", "good", "bad"),
    },
    status: {
      type: Sequelize.INTEGER,
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
    tableName: "seller_books",
    modelName: 'sellerBooks'
  }
);
// SellerBooks.belongsTo(Category, {as: 'category', foreignKey: "category_id", targetKey: "id" });
module.exports = SellerBooks;
