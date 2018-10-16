// pages/my/index.js
const app = getApp()
Page({
  data: {
    motto: '欢迎使用贝贝辅导通',
    userInfo: {},
    hasUserInfo: app.globalData.userInfo ? true : false,
    // canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../home/home'
    })
  },
  concernList: function() {
    wx.navigateTo({
      url: '/pages/my/concern/concern'
    })
  },
  myPublish: function () {
    wx.navigateTo({
      url: '/pages/my/mypublish/mypublish'
    })
  },
  message: function () {
    wx.navigateTo({
      url: '/pages/my/message/message'
    })
  },
  aboutUs: function () {
    wx.navigateTo({
      url: '/pages/my/aboutus/aboutus'
    })
  },
  onShow: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function(e) {
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})