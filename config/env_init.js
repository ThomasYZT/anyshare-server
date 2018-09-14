/**
 * 模块依赖
 */
import glob from "glob";
import chalk from "chalk";

/**
 * @method 环境变量初始化
 * @description 在项目运行前设置环境变量，我们将找到有效的环境变量，如果找不到我们设置成开发环境
 */
export default () => {

  //同步获取对应当前环境变量的配置文件
  const environmentFiles = glob("./config/env/" + process.env.NODE_ENV + ".js", {sync: true})
  
  if(!environmentFiles.length) {
    //存在环境变量但没找到对应的配置文件
    if(process.env.NODE_ENV) {
      console.error(chalk.red('没有找到'+ process.env.NODE_ENV + '配置文件，环境设置为 development'))
    }else {
      console.error(chalk.red('NODE_ENV没有被定义！将使用默认的 development 环境'))
    }
    //设置默认环境变量为'development'
    process.env.NODE_ENV = 'development'
    
  } else {
    console.log(chalk.black.bgWhite('应用加载使用' + process.env.NODE_ENV + '环境配置文件'))
  }
  //console.log(process.env.NODE_ENV)
}