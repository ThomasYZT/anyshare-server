/**
 * 模块依赖
 */

 //环境变量初始化设置
require('./config/env_init')()
const logger = require('./util/logger')
const config = require('./config/config')
const express = require('./config/express')

//链接数据库
logger.info('正在连接数据库 ...')
logger.info('开始加载models ...')
const models = require('./models')

//初始化express应用实例
logger.info('初始化express应用 ...')
const server = express()

//异步开启express服务，监听端口
logger.info('正在启动应用 ...')
models.sequelize.sync().then(() => { 
  server.listenSync(config.port).then(() => {
    logger.info('应用启动成功！端口:' + config.port)
  })
})


export default server