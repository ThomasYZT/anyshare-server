const User = require("../models").User;
import logger from "../util/logger";

module.exports = {
  list: function(req, res, next){
    User.findAll().then((data) => {
      res.json(data)
    });
  }
} 