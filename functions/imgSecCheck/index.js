// 云函数入口文件
const cloud = require('wx-server-sdk');


cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})

exports.main = async(event, context) => {
  const fileID = event.fileID
  const res = await cloud.downloadFile({
    fileID: fileID,
  })
  const buffer = res.fileContent
  try {
    var result = await cloud.openapi.security.imgSecCheck({
      media: {
        contentType: event.contentType,
        value: buffer
      }
    })
    cloud.deleteFile({
      fileList: [fileID]
    })
    if (result && result.errCode.toString() === '87014') {
      return {
        code: 500,
        msg: '内容含有违法违规内容',
        data: result
      }
    } else {
      return {
        code: 200,
        msg: '内容ok',
        data: result
      }
    }
  } catch (err) {
    // 错误处理
    if (err.errCode.toString() === '87014') {
      return {
        code: 500,
        msg: '内容含有违法违规内容',
        data: err
      }
    }
    return {
      code: 502,
      msg: '调用imgSecCheck接口异常',
      data: err
    }
  }
}