// pages/share.js
const app = getApp();

// 在页面中定义激励视频广告
// let videoAd = null
let interstitialAd = null

Page({
  /**
   * 页面的初始数据
   */
  data: {
    actionSheetHidden: true,
  },
  actionSheetTap: function() {
    this.setData({
      actionSheetHidden: !this.data.actionSheetHidden
    })
  },
  listenerActionSheet: function() {
    this.setData({
      actionSheetHidden: !this.data.actionSheetHidden
    })
  },
  onLoad: function() {
    // 在页面onLoad回调事件中创建激励视频广告实例
    // if (wx.createRewardedVideoAd) {
    //   videoAd = wx.createRewardedVideoAd({
    //     adUnitId: 'adunit-8b23222f8d4d1366'
    //   })
    //   videoAd.onLoad(() => {})
    //   videoAd.onError((err) => {})
    //   videoAd.onClose((res) => {})
    // }
    if (wx.createInterstitialAd) {
      interstitialAd = wx.createInterstitialAd({ adUnitId: 'adunit-0bdccf1c6b3263ca' })
      interstitialAd.onLoad(() => {})
      interstitialAd.onError((err) => {})
      interstitialAd.onClose((res) => {})
    }
    setTimeout(function () {
      interstitialAd.show().catch((err) => {
        console.error(err)
      })
    }, 2000)
    let successPic = app.globalData.successPic ?
      app.globalData.successPic :
      "https://image.idealclover.cn/projects/Wear-A-Mask/avatar.png";
    console.log(successPic);
    const posterConfig = {
      width: 750,
      height: 1334,
      backgroundColor: "#fff",
      debug: false,
      pixelRatio: 1,
      blocks: [{
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
    this.setData({
      posterConfig: posterConfig
    });
  },

  showAd() {
    // 用户触发广告后，显示激励视频广告
    if (videoAd) {
      videoAd.show().catch(() => {
        // 失败重试
        videoAd.load()
          .then(() => videoAd.show())
          .catch(err => {
            console.log('激励视频 广告显示失败')
          })
      })
    }
  },
  onPosterSuccess(e) {
    console.log('qwq')
    const {
      detail
    } = e;
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
    let successPic = app.globalData.successPic ?
      app.globalData.successPic :
      "https://image.idealclover.cn/projects/Wear-A-Mask/avatar.png";
    return {
      title: "一起来为头像带上口罩吧！",
      imageUrl: successPic,
      path: "/pages/index/index",
      success: function(res) {}
    };
  }
});