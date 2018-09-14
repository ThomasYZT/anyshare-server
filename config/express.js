import express from "express"
import cookieParser from "cookie-parser"
import morgan from "morgan"
import path from "path"
import Promise from "bluebird";
import config from "./config";
import logger from "../util/logger";
import errorMessage from "./errorMessage";
import routesHelper from "../routes/helper";

/**
 * @desc 用于返回一个进行过初始化配置的express应用实例
 * @return app express应用实例
 */
export default () => {
  //新建express应用实例
  var app = express()

  //promise化 express.listen
  app.listenSync = Promise.promisify(app.listen).bind(app)

  //挂载http请求日志中间件，并将信息通过winston模块写入日志文件
  app.use(morgan(config.morgan.format, {stream: logger.stream}))

  //挂载请求信息参数解析中间件
  app.use(express.json({type: 'application/*', limit: '30mb'}));
  app.use(express.urlencoded({ extended: true }));
  app.use(cookieParser())

  //开放虚拟目录，托管静态文件
  app.use('/static', express.static(path.join(__dirname.substring(0, __dirname.lastIndexOf("\/") + 1), 'public')))

  //TODO: 应用安全相关设置
  app.disable('x-powered-by');

  //加载路由
  routesHelper(app)

  //没有匹配到任何路由的404处理
  app.use((req, res) => {
    logger.error('request ' + req.path + ' not found');
    const notFound = errorMessage.NOT_FOUND;
    res.status(404).send(notFound);
  });

  //错误处理
  app.use(function(err, req, res, next) {
    let errorMsg;
    if (err.name === 'SyntaxError' && err.message.indexOf('Unexpected') >= 0) {
      errorMsg = errorMessage.UNPARSABLE_REQUEST;
      res.status(400).send(errorMsg);
      return;
    }
    errorMsg = errorMessage.SERVER_ERROR;
    logger.error(err.stack);
    res.status(500).send(errorMsg);
  })

  logger.info('express应用初始化成功！')
  return app;
}