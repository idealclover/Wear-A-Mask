// pages/index/index.js
const app = getApp();

Page({
  /**
   * 页面的初始数据
   */
  data: {
    bgPic: null,
    picChoosed: false
  },

  assignPicChoosed() {
    if (this.data.bgPic) {
      this.setData({
        picChoosed: true
      });
    } else {
      this.setData({
        picChoosed: false
      });
    }
  },
  bindGetUserInfo: function(e) {
    console.log(e.detail.userInfo)
    if (e.detail.userInfo){
      //用户按了允许授权按钮
      app.globalData.userInfo = e.detail.userInfo;
      this.setData({
        userInfo: e.detail.userInfo,
        bgPic: e.detail.userInfo.avatarUrl
      });
      this.assignPicChoosed();
    } else {
      //用户按了拒绝按钮
    }
  },
  getAvatar() {
    if (app.globalData.userInfo) {
      this.setData({
        bgPic: app.globalData.userInfo.avatarUrl
      });
      this.assignPicChoosed();
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo;
          this.setData({
            userInfo: res.userInfo,
            bgPic: res.userInfo.avatarUrl
          });
          this.assignPicChoosed();
        }
      });
    }
  },
  chooseImage(from) {
    wx.chooseImage({
      count: 1,
      sizeType: ["original", "compressed"],
      sourceType: [from.target.dataset.way],
      success: res => {
        let tempFilePaths = res.tempFilePaths;
        this.setData({
          bgPic: tempFilePaths[0]
        });
        this.assignPicChoosed();
      },
      fail: res => {
        this.assignPicChoosed();
      },
      complete: res => {
        this.assignPicChoosed();
      }
    });
  },
  nextPage() {
    app.globalData.bgPic = this.data.bgPic;
    wx.navigateTo({
      url: "../imageeditor/imageeditor"
    });
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
