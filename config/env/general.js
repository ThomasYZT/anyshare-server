/**
 * 通用配置
 */
export const config = {
  //端口监听配置
  port: process.env.PORT || '3000',

  //morgan模块配置
  morgan: {
    format: 'combined'
  },
  
  //winston模块配置
  winston: {
    file: {
      level: 'debug',
      filename: './logs/applog.log',
      handleExceptions: true,
      json: false,
      maxsize: 5242880, //5MB
      colorize: false
    },
    console: {
      level: 'debug',
      handleExceptions: true,
      json: false,
      colorize: true
    }
  }
}