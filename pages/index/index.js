// pages/index/index.js
const app = getApp();

Page({
  /**
   * 页面的初始数据
   */
  data: {
    bgPic: null,
    picChoosed: false,
    imgList: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    currentHatId: 1,
    hatCenterX: 150,
    hatCenterY: 150,
    hatSize: 100,
    // cancelCenterX: wx.getSystemInfoSync().windowWidth / 2 - 50 - 2,
    // cancelCenterY: 100,
    handleCenterX: 201,
    handleCenterY: 200,
    scale: 1,
    rotate: 0
  },
  onReady() {
    this.getAvatar();
    this.hat_center_x = this.data.hatCenterX;
    this.hat_center_y = this.data.hatCenterY;
    // this.cancel_center_x = this.data.cancelCenterX;
    // this.cancel_center_y = this.data.cancelCenterY;
    this.handle_center_x = this.data.handleCenterX;
    this.handle_center_y = this.data.handleCenterY;

    this.scale = this.data.scale;
    this.rotate = this.data.rotate;

    this.touch_target = "";
    this.start_x = 0;
    this.start_y = 0;
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
        bgPic: app.globalData.userInfo.avatarUrl.replace(/132/g, '0')
      });
      this.assignPicChoosed();
    } else {
      // console.log(res.userInfo.avatarUrl);
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo;
          this.setData({
            userInfo: res.userInfo,
            bgPic: res.userInfo.avatarUrl.replace(/132/g, '0')
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
      sourceType: ['album', 'camera'],
      success: res => {
        let src = res.tempFilePaths;
        wx.navigateTo({
          url: `../upload/upload?src=${src}`
        })
      },
      complete: res => {
        this.assignPicChoosed();
      }
    });
  },
  chooseImg(e) {
    this.setData({
      currentHatId: e.target.dataset.hatId
    });
  },
  touchStart(e) {
    if (e.target.id == "hat") {
      this.touch_target = "hat";
    } else if (e.target.id == "handle") {
      this.touch_target = "handle";
    } else {
      this.touch_target = "";
    }

    if (this.touch_target != "") {
      this.start_x = e.touches[0].clientX;
      this.start_y = e.touches[0].clientY;
    }
  },
  touchEnd(e) {
    this.hat_center_x = this.data.hatCenterX;
    this.hat_center_y = this.data.hatCenterY;
    // this.cancel_center_x = this.data.cancelCenterX;
    // this.cancel_center_y = this.data.cancelCenterY;
    this.handle_center_x = this.data.handleCenterX;
    this.handle_center_y = this.data.handleCenterY;
    // }
    this.touch_target = "";
    this.scale = this.data.scale;
    this.rotate = this.data.rotate;
  },
  touchMove(e) {
    var current_x = e.touches[0].clientX;
    var current_y = e.touches[0].clientY;
    var moved_x = current_x - this.start_x;
    var moved_y = current_y - this.start_y;
    if (this.touch_target == "hat") {
      this.setData({
        hatCenterX: this.data.hatCenterX + moved_x,
        hatCenterY: this.data.hatCenterY + moved_y,
        // cancelCenterX: this.data.cancelCenterX + moved_x,
        // cancelCenterY: this.data.cancelCenterY + moved_y,
        handleCenterX: this.data.handleCenterX + moved_x,
        handleCenterY: this.data.handleCenterY + moved_y
      });
    }
    if (this.touch_target == "handle") {
      this.setData({
        handleCenterX: this.data.handleCenterX + moved_x,
        handleCenterY: this.data.handleCenterY + moved_y,
        // cancelCenterX: 2 * this.data.hatCenterX - this.data.handleCenterX,
        // cancelCenterY: 2 * this.data.hatCenterY - this.data.handleCenterY
      });
      let diff_x_before = this.handle_center_x - this.hat_center_x;
      let diff_y_before = this.handle_center_y - this.hat_center_y;
      let diff_x_after = this.data.handleCenterX - this.hat_center_x;
      let diff_y_after = this.data.handleCenterY - this.hat_center_y;
      let distance_before = Math.sqrt(
        diff_x_before * diff_x_before + diff_y_before * diff_y_before
      );
      let distance_after = Math.sqrt(
        diff_x_after * diff_x_after + diff_y_after * diff_y_after
      );
      let angle_before =
        (Math.atan2(diff_y_before, diff_x_before) / Math.PI) * 180;
      let angle_after =
        (Math.atan2(diff_y_after, diff_x_after) / Math.PI) * 180;
      this.setData({
        scale: (distance_after / distance_before) * this.scale,
        rotate: angle_after - angle_before + this.rotate
      });
    }
    this.start_x = current_x;
    this.start_y = current_y;
  },
  combinePic() {
    app.globalData.bgPic = this.data.bgPic;
    app.globalData.scale = this.scale;
    app.globalData.rotate = this.rotate;
    app.globalData.hat_center_x = this.hat_center_x;
    app.globalData.hat_center_y = this.hat_center_y;
    app.globalData.currentHatId = this.data.currentHatId;
    wx.navigateTo({
      url: "../combine/combine"
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
