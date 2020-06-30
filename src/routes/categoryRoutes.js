const Category = require("../models/Category"); 
module.exports = app => {
    app.get("/api/category", async (req,res) => {
        const category = await Category.findAll();
    res.send(category); 
    });
}