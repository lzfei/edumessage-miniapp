Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: '',
    schoolInfo: {},
    schoolDetail: {},
    carousel: [
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _t = this;
    this.setData({
      id: options.id
    })
    const requestTask = wx.request({
      url: getApp().globalData.url + '/miniapps/getschoolinfo',
      method: 'POST',
      data: {
        '_id': this.data.id
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        res['data']['data']['age'] = new Date().getFullYear() - res['data']['data']['founddate'],
        _t.setData({
          schoolInfo: res['data']['data']
        })
      }
    })

    const _requestTask = wx.request({
      url: getApp().globalData.url + '/miniapps/getschooldetail',
      method: 'POST',
      data: {
        'school_id': this.data.id
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        _t.setData({
          schoolDetail: res['data']['data']
        })
        _t.setData({
          carousel: res['data']['data']['image']
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
  },

  makePhoneCall: function () {
    let _t = this;
    wx.makePhoneCall({
      phoneNumber: _t.data.schoolDetail.phone
    })
  }
})