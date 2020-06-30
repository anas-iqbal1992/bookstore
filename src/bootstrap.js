module.exports = app => {
   require("./models/Category");
   require("./models/SellerBooks");
   require("./models/Users");
   require("./models/UserDetails");
   require("./routes/booksRoutes")(app);
   require("./routes/categoryRoutes")(app);
   require("./routes/authRoutes")(app);
   require("./routes/siteRoutes")(app);
   require("./routes/cartRoutes")(app);
}
