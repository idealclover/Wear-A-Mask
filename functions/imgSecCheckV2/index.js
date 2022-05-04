// 云函数入口文件
const cloud = require('wx-server-sdk');
const axios = require('axios');

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})

exports.main = async (event, context) => {
  try {
    let buffer = null;
    await axios({
      method: 'get',
      url: event.file,
      responseType: 'arraybuffer',
      headers: {
        "Content-Type": "*"
      }
    }).then(res => {
      buffer = res.data;
    });

    const result = await cloud.openapi.security.imgSecCheck({
      media: {
        contentType: 'image/png',
        value: buffer
      }
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
    console.log(err)
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