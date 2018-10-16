Page({

  /**
   * 页面的初始数据
   */
  data: {
    grids: [
      { 'id': 1, name: '文化课老师', info: '语数外、物理化、政治', url: '/pages/index/teacher/teacher-list', icon: '../../../image/teacher/teacher-1.png' },
      { 'id': 2, name: '兴趣班老师', info: '乐器、舞蹈、美术', url: '/pages/index/teacher/teacher-list', icon: '../../../image/teacher/teacher-2.png' },
      { 'id': 3, name: '素质培养老师', info: '基础素质、人文素质', url: '/pages/index/teacher/teacher-list', icon: '../../../image/teacher/teacher-3.png' },
      { 'id': 4, name: '家庭教育老师', info: '亲自营地、家长学院', url: '/pages/index/teacher/teacher-list', icon: '../../../image/teacher/teacher-4.png' }
    ],
    teacherList: [
    ],
    scrollHeight: getApp().globalData.scrollHeight,
    searchSchoolList: [],
    searchTeacherList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let _t = this;
    const requestTask = wx.request({
      url: getApp().globalData.url + '/miniapps/getteacherlist',
      method: 'POST',
      data: {
        limit: 10,
        offset: 0,
        longitude: wx.getStorageSync('longitude'),
        latitude: wx.getStorageSync('latitude')
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        _t.setData({
          teacherList: res['data']['data']
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
  showInput: function () {
    this.setData({
      inputShowed: true
    });
  },
  hideInput: function () {
    this.setData({
      inputVal: "",
      inputShowed: false
    });
  },
  clearInput: function () {
    this.setData({
      inputVal: ""
    });
  },
  inputTyping: function (e) {
    this.setData({
      inputVal: e.detail.value
    });
    // 查询后台
    this.search(e.detail.value);
  },
  search: function (keyWords) {
    let _t = this;
    const requestTask = wx.request({
      url: getApp().globalData.url + '/miniapps/search',
      method: 'POST',
      data: {
        keywords: keyWords,
        longitude: wx.getStorageSync('longitude'),
        latitude: wx.getStorageSync('latitude')
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        _t.setData({
          searchSchoolList: res['data']['data']['school'],
          searchTeacherList: res['data']['data']['teacher']
        })
      }
    })
  }
})