const { Op, Sequelize } = require("sequelize");
const Users = require("./../models/Users");
const UserDetalis = require("./../models/UserDetails");
const isEmpty = require("lodash/isEmpty");
const Validator = require("validator");
var jwt = require("jsonwebtoken");
var datetime = require("node-datetime");
const keys = require("./../../config/keys");
module.exports = (app) => {
  function validateCompare(data) {
    let errors = {};
    if (Validator.isEmpty(data.confirmPassword)) {
      errors.confirmPassword = "This field is required";
    }
    if (!Validator.equals(data.password, data.confirmPassword)) {
      errors.confirmPassword = "Password must match";
    }
    return {
      errors,
      isValid: isEmpty(errors),
    };
  }
  app.post("/api/sign-up", async (req, res) => {
    const { errors, isValid } = validateCompare(req.body);
    if (!isValid) {
      res.status(400).json(errors);
    } else {
      try {
        var dt = datetime.create();
        var formatted = dt.format("Y-m-d H:M:S");
        await Users.create({
          name: req.body.name,
          email: req.body.email,
          phone_no: req.body.phone_no,
          password: req.body.password,
          created_at: formatted,
          updated_at: formatted,
        });
        res.status(200).json({ message: "user created" });
      } catch (err) {
        let verrors = {};
        if (!Array.isArray(err.errors)) {
          res.status(400).json(err);
        } else {
          err.errors.forEach((e) => (verrors[e.path] = e.message));
          res.status(400).json(verrors);
        }
      }
    }
  });
  app.post("/api/log-in", async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await Users.findOne({ where: { email: email } });
      if (!user) {
        res.status(400).json({ email: "Wrong UserName" });
      }
      if (!user.validPassword(password)) {
        res.status(400).json({ password: "Wrong Password" });
      }
      const token = jwt.sign(
        {
          id: user.id,
          username: user.name,
          email:user.email,
          phone:user.phone_no
        },
        keys.jwtSecret
      );
      res.status(200).json({ token });
    } catch (err) {
      let verrors = {};
      if (!Array.isArray(err.errors)) {
        console.log(err);
        res.status(500).json(err.errors);
      } else {
        err.errors.forEach((e) => (verrors[e.path] = e.message));
        res.status(500).json(verrors);
      }
    }
  });
};
