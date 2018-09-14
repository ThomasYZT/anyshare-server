'use strict';

import fs from "fs"
import path from "path"
import logger from "../util/logger";
const Sequelize = require('sequelize')
const basename = path.basename(__filename)
import config from "../config/config"
const dbConfig = config.db
const db = {}
let sequelize;

try {
  sequelize = new Sequelize(dbConfig.database, dbConfig.username, dbConfig.password, dbConfig);
  logger.info('连接数据库成功! ')
} catch (err) {
  logger.error('连接数据库失败 错误: ', err);
  throw err;
}


fs
  .readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    const model = sequelize['import'](path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

logger.info('模型加载成功！');

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
