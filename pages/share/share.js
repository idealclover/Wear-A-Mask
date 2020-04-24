// pages/share.js
const app = getApp();

Page({
  /**
   * 页面的初始数据
   */
  // data: {
  //   posterConfig: posterConfig
  // },

  onLoad: function() {
    let successPic = app.globalData.successPic
      ? app.globalData.successPic
      : "https://image.idealclover.cn/projects/Wear-A-Mask/avatar.png";
    console.log(successPic);
    const posterConfig = {
      width: 750,
      height: 1334,
      backgroundColor: "#fff",
      debug: false,
      pixelRatio: 1,
      blocks: [
        {
          width: 690,
          height: 690,
          x: 30,
          y: 183,
          borderWidth: 2,
          borderColor: "#f0c2a0",
          borderRadius: 20
        }
        // {
        //   width: 634,
        //   height: 74,
        //   x: 59,
        //   y: 770,
        //   backgroundColor: "#fff",
        //   opacity: 0.5,
        //   zIndex: 100
        // }
      ],
      texts: [
        // {
        //   x: 113,
        //   y: 61,
        //   baseLine: "middle",
        //   text: "伟仔",
        //   fontSize: 32,
        //   color: "#8d8d8d"
        // },
        // {
        //   x: 30,
        //   y: 113,
        //   baseLine: "top",
        //   text: "一起戴上口罩吧！",
        //   fontSize: 38,
        //   color: "#080808"
        // },
        // {
        //   x: 92,
        //   y: 810,
        //   fontSize: 38,
        //   baseLine: "middle",
        //   text: "标题标题标题标题标题标题标题标题标题",
        //   width: 570,
        //   lineNum: 1,
        //   color: "#8d8d8d",
        //   zIndex: 200
        // },
        {
          x: 360,
          y: 1100,
          baseLine: "top",
          text: "长按识别小程序码",
          fontSize: 38,
          color: "#080808"
        },
        {
          x: 360,
          y: 1158,
          baseLine: "top",
          text: "一起戴上口罩",
          fontSize: 28,
          color: "#929292"
        }
      ],
      images: [
        // {
        //   width: 62,
        //   height: 62,
        //   x: 30,
        //   y: 30,
        //   borderRadius: 62,
        //   url: "https://lc-I0j7ktVK.cn-n1.lcfile.com/02bb99132352b5b5dcea.jpg"
        // },
        {
          width: 634,
          height: 634,
          x: 59,
          y: 210,
          url: successPic
        },
        {
          width: 220,
          height: 220,
          x: 92,
          y: 1020,
          url: "https://image.idealclover.cn/projects/Wear-A-Mask/qrcode.jpg"
        }
      ]
    };
    this.setData({ posterConfig: posterConfig });
  },

  onPosterSuccess(e) {
    console.log('qwq')
    const { detail } = e;
    wx.previewImage({
      current: detail,
      urls: [detail]
    });
  },
  onPosterFail(err) {
    console.error(err);
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {
    let successPic = app.globalData.successPic
      ? app.globalData.successPic
      : "https://image.idealclover.cn/projects/Wear-A-Mask/avatar.png";
    return {
      title: "一起来为头像带上口罩吧！",
      imageUrl: successPic,
      path: "/pages/index/index",
      success: function(res) {}
    };
  }
});
