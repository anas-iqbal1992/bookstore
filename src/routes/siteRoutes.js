const Country = require("../models/Country");
const State = require("../models/State");
const _ = require("lodash");
const UserDetalis = require("./../models/UserDetails");
const authentication = require("../../middlewares/authentication");
const multer = require("multer");
const AWS = require("aws-sdk");
const keys = require("./../../config/keys");
var datetime = require("node-datetime");

module.exports = (app) => {
  app.get("/api/countries", async (req, res) => {
    const country = await Country.findAll({
      attributes: ["name", "id"],
      order: [["name", "ASC"]],
    });
    const countryids = await _.mapValues(_.keyBy(country, "id"), "name");
    res.send(countryids);
  });
  app.get("/api/states", async (req, res) => {
    const state = await State.findAll({
      where: {
        country_id: 101,
      },
      attributes: ["name", "id"],
      order: [["name", "ASC"]],
    });
    const stateids = await _.mapValues(_.keyBy(state, "id"), "name");
    res.send(stateids);
  });
  app.post("/api/profile-details", authentication, async (req, res) => {
    try {
      var dt = datetime.create();
      var formatted = dt.format("Y-m-d H:M:S");
      const details = await UserDetalis.create({
        user_id: req.currentUser.id,
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        address1: req.body.address1,
        address2: req.body.address2,
        pincode: req.body.pincode,
        country_id: req.body.country_id,
        state_id: req.body.state_id,
        city: req.body.city,
        created_at: formatted,
        updated_at: formatted,
      });
      res.status(200).send(details);
    } catch (err) {
      let verrors = {};
      if (!Array.isArray(err.errors)) {
        res.status(400).json(err);
      } else {
        err.errors.forEach((e) => (verrors[e.path] = e.message));
        res.status(400).json(verrors);
      }
    }
  });

  app.get("/api/user-detail", authentication, async (req, res) => {
    const details = await UserDetalis.findOne({
      where: {
        user_id: req.currentUser.id,
      },
    });
    res.status(200).send(details);
  });
  const S3 = new AWS.S3({
    accessKeyId: keys.awsKey,
    secretAccessKey: keys.awsSecret,
  });
  const storage = multer.memoryStorage({
    destination: function (req, file, callback) {
      callback(null, "");
    },
  });
  const upload = multer({ storage }).single("file");
  app.post("/api/save-profile", authentication, upload, async (req, res) => {
    const time = Date.now();
    let profileImage = req.file.originalname.split(".");
    const fileType = await profileImage[profileImage.length - 1];
    const params = {
      Bucket: keys.awsBucket,
      Key: `profile/${time}.${fileType}`,
      ACL: "public-read",
      Body: req.file.buffer,
    };
    
    S3.upload(params, async (error, data) => {
      if (error) {
        res.status(500).send(error);
      }
      const details = await UserDetalis.findOne({
        where: {
          user_id: req.currentUser.id,
        },
      });
      const oldPic = details.profile_pic;
      details.profile_pic = data.Location;
      const saved = await details.save();
      saved && oldPic ? removeOldProfile(oldPic) : "";
      res.status(200).send(details);
    });
  });

  const removeOldProfile = (oldPic) => {
    var n = oldPic.indexOf("profile");
    var len = oldPic.length;
    var oldKey = oldPic.substring(n, len);
    var deleteParams = {
      Bucket: keys.awsBucket,
      Key: oldKey,
    };
    S3.deleteObject(deleteParams, function (err, data) {
      if (data) {
        console.log("Old File deleted successfully");
      } else {
        console.log("Old File Not delete : " + err);
      }
    });
  };
};
