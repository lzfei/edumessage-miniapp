//app.js
App({
  onLaunch: function () {
    let _t = this;
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        if (res.code) {
          //发起网络请求
          wx.request({
            url: this.globalData.url + '/miniapps/getopenid',
            method: 'POST',
            data: {
              code: res.code
            },
            header: {
              'content-type': 'application/json'
            },
            success: function (res) {
              _t.globalData.openid = res.data.data.openid;
              wx.setStorage({
                key: 'openid',
                data: res.data.data.openid
              })
              wx.setStorage({
                key: 'wxUser',
                data: res.data.data
              })
            }
          })
        }
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
    // 获取用户位置
    wx.getLocation({
      type: 'wgs84',
      success: function (res) {
        let latitude = res.latitude
        let longitude = res.longitude
        let speed = res.speed
        let accuracy = res.accuracy
        wx.setStorage({
          key: "latitude",
          data: latitude
        })
        wx.setStorage({
          key: "longitude",
          data: longitude
        })
      }
    }),
    // 获取屏幕高度
    wx.getSystemInfo({
      success: function (res) {
        _t.globalData.scrollHeight = res.windowHeight - 49;
      }
    });
    wx.getSystemInfo({
      success: function (res) {
        // 可使用窗口宽度、高度
        _t.globalData.windowHeight = res.windowHeight
        _t.globalData.windowWidth = res.windowWidth
      }
    })
  },

  globalData: {
    userInfo: null,
    url: 'https://www.edumessage.xyz',
    // url: 'http://127.0.0.1:3000',
    scrollHeight: 0,
    // 每页显示条数 limit
    limit: 15,
    uploadtoken: '',
    windowHeight: 555,
    windowWidth: 375,
    openid: ''
  }
})