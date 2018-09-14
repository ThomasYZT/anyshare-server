import fs from "fs";
import path from "path";

/**
 * 自动加载路由函数
 * @param {object} express实例对象 
 */
const routesHelper = (app) => {
  let files = fs.readdirSync('./routes/api');

  files.forEach(function(file) {
    app.use('/' + file.split('.')[0], require('./api/' + file.split('.')[0]))
  })
}

export default routesHelper;
