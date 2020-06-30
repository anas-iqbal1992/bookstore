const { Sequelize } = require("sequelize");
const Model = Sequelize.Model;
class Country extends Model{}
Country.init(
    {
        id:{
            type: Sequelize.INTEGER,
            primaryKey: true,
        },
        sortname:{
            type: Sequelize.STRING,
        },
        name:{
            type: Sequelize.STRING,
        },
        phonecode:{
            type: Sequelize.INTEGER,
        }
    },
    {
        sequelize,
        timestamps: false,
        tableName: "countries",
      }
);
module.exports = Country;