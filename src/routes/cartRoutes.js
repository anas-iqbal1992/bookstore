const Cart = require("../models/Cart");
var datetime = require("node-datetime");
const authentication = require("../../middlewares/authentication");
const { Op } = require("sequelize");
module.exports = (app) => {
  app.post("/api/checkout",authentication, async (req, res) => {
    try {
      var dt = datetime.create();
      var formatted = dt.format("Y-m-d H:M:S");
      const cartData = req.body;
      cartData.forEach(async (e) => {
        await Cart.create({
          book_id: e.id,
          quentity: e.quentity,
          payment_status: 1,
          amount: (e.quentity * e.price).toFixed(2),
          user_id: req.currentUser.id,
          created_at: formatted,
          updated_at: formatted,
        });
      });
    } catch (err) {
        res.status(400).json(err);
    }
    res.status(200).json({message:'Your order has been placed'});
  });
};
