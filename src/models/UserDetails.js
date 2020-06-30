const { Sequelize } = require("sequelize");
const Model = Sequelize.Model;
class UserDetails extends Model {}
UserDetails.init(
  {
    id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    user_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    country_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    state_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    city: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    address1: {
      type: Sequelize.TEXT,
      allowNull: false,
    },
    address2: {
      type: Sequelize.TEXT,
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    pincode: {
      type: Sequelize.STRING,
      isNumeric: true
    },
    phone: {
      type: Sequelize.STRING,
      isNumeric: true
    },
    profile_pic: {
      type: Sequelize.STRING,
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    created_at: {
      type: "TIMESTAMP",
      defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      allowNull: false,
    },
    updated_at: {
      type: "TIMESTAMP",
      defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      allowNull: false,
    },
  },
  {
    sequelize,
    timestamps: false,
    tableName: "user_details",
    modelName: 'userDetails'
  }
);
module.exports = UserDetails; 