const { Sequelize } = require("sequelize");
const UserDetails = require("./UserDetails");
const bcrypt = require("bcrypt");
const Model = Sequelize.Model;
class Users extends Model {
  validPassword(password) {
    return bcrypt.compareSync(password, this.password);
  }
}
Users.init(
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
    email: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    phone_no: {
      type: Sequelize.STRING,
      allowNull: false,
      isNumeric: true,
      unique: true,
      // validate: {
      //   min: 10,
      //   max: 10,
      // },
    },
    email_verified_at: {
      type: Sequelize.STRING,
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        min: 6,
      },
    },
    remember_token: {
      type: Sequelize.STRING,
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
    tableName: "users",
    modelName: "users",
    hooks: {
      beforeCreate: (user, options) => {
        {
          const salt = bcrypt.genSaltSync();
          user.password =
            user.password && user.password !== ""
              ? bcrypt.hashSync(user.password, salt)
              : "";
        }
      },
    },
    instanceMethods: {
      
      
    },
  }
);
Users.hasOne(UserDetails, {
  as: "userDetails",
  foreignKey: "id",
  targetKey: "user_id",
});
UserDetails.belongsTo(Users, {
  as: "users",
  foreignKey: "user_id",
  targetKey: "id",
});
module.exports = Users;
