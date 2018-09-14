/**
 * 合并通用配置和对应环境变量的配置文件
 */

export default Object.assign(
  require('./env/general').config,
  require('./env/' + process.env.NODE_ENV).config || {}
)