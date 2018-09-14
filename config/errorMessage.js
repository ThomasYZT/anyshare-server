import { deflate } from "zlib";

/**
 * 定义各种错误类型信息
 */
const errorMessage = {
  NOT_FOUND: "提交的请求无法捕获",
  SERVER_ERROR: "哦~ 服务器错误，请联系后端管理员",
  UNPARSABLE_REQUEST: "请求无法解析，请使用正确格式重新发起请求"
}

export default errorMessage