const SellerBooks = require("../models/SellerBooks");
const Category = require("../models/Category");
const { Op } = require("sequelize");
module.exports = (app) => {
  app.get("/api/books", async (req, res) => {
    const books = await SellerBooks.findAll();
    res.send(books);
  });
  app.get("/api/book/:id", async (req, res) => {
    const book = await SellerBooks.findByPk(req.params.id);
    res.send(book);
  });
  app.get("/api/books/:category_id", async (req, res) => {
    const books = await SellerBooks.findAll({
      where: {
        category_id: req.params.category_id,
      },
    });
    res.send(books);
  });
  app.get("/api/search/:txt", async (req, res) => {
    const books = await SellerBooks.findAll({
      where: {
        [Op.or]: [
          {
            name: {
              [Op.like]: "%" + req.params.txt + "%",
            },
          },
          { "$category.name$": { [Op.like]:  "%" + req.params.txt + "%" } },
          {
            author:{
              [Op.like]: "%" + req.params.txt + "%",
            }
          }
        ],
      },
      include: [
        {
          model: Category,
          as: 'category'
        },
      ],
    });
    res.send(books);
  });
};
