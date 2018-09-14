/**
 * 模块依赖
 */
import { createLogger, format, transports } from "winston";
import config from "../config/config";

//创建winston实例
const logger = createLogger({
  exitOnError: false,
  format: format.combine(
    format.colorize(),
    format.simple()
  )
})

//根据加载的配置文件配置winston模块
Object.keys(config.winston).forEach((transport) => {
  logger.add(
    new transports[transport.charAt(0).toUpperCase() + transport.slice(1).toLowerCase()](
      config.winston[transport]
    )
  )
})

//morgan模块stream配置
logger.stream = {
  write: function(message) {
    logger.info(message)
  }
}

export default logger;