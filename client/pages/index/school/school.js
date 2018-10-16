Page({
  data: {
    scrollHeight: getApp().globalData.scrollHeight,
    inputShowed: false,
    inputVal: "",
    grids: [
      { 'id': 1, name: '学前', icon: '../../../image/school/school-1.png' },
      { 'id': 2, name: '小学', icon: '../../../image/school/school-2.png' },
      { 'id': 3, name: '初中', icon: '../../../image/school/school-3.png' },
      { 'id': 4, name: '高中', icon: '../../../image/school/school-4.png' },
      { 'id': 5, name: '美术', icon: '../../../image/school/school-5.png' },
      { 'id': 6, name: '舞蹈', icon: '../../../image/school/school-6.png' },
      { 'id': 7, name: '声乐', icon: '../../../image/school/school-7.png' },
      { 'id': 8, name: '体育', icon: '../../../image/school/school-8.png' }
    ],
    schoolList: [
    ],
    searchSchoolList: [],
    searchTeacherList: []
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
  /**
* 生命周期函数--监听页面加载
*/
  onLoad: function (options) {
    let _t = this;
    const requestTask = wx.request({
      url: getApp().globalData.url + '/miniapps/getschoollist',
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
          schoolList: res['data']['data']
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