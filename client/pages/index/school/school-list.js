Page({
  data: {
    schoolList: [
    ],
    category:'',
    longitude: '',
    latitude: '',
    isShowRefresh: false,
    isShowLoadMore: false,
    limit: getApp().globalData.limit,
    times: 0 //加载更多的次数
  },
  /**
 * 生命周期函数--监听页面加载
 */
  onLoad: function (options) {
    let _t = this;
    this.setData({
      category: options.category
    }) 
    this.getList(this.data.limit, this.data.limit * this.data.times, '')
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
    this.setData({
      isShowRefresh: true,
      times: 0
    })
    this.getList(this.data.limit, this.data.limit * this.data.times, 'down')
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    let _t = this;
    this.setData({
      isShowLoadMore: true,
      times: _t.data.times + 1
    })
    this.getList(this.data.limit, this.data.limit * this.data.times, 'up')
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  getList: function (limit, offset, types) {
    let _t = this;

    const requestTask = wx.request({
      url: getApp().globalData.url + '/miniapps/getschoollist',
      method: 'POST',
      data: {
        limit: limit,
        offset: offset,
        category: _t.data.category,
        longitude: wx.getStorageSync('longitude'),
        latitude: wx.getStorageSync('latitude')
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        if (types === 'down') {
          _t.setData({
            isShowRefresh: false
          })
          wx.stopPullDownRefresh(); // 数据请求成功后，停止刷新
        }
        if (types === 'up') {
          _t.setData({
            isShowLoadMore: false
          })
        }
        if (_t.data.times === 0) {
          _t.data.schoolList = [];
        }
        res['data']['data'].forEach(cell => {
          cell['age'] = new Date().getFullYear() - cell['founddate'];
          cell['distance'] = cell['dist']['calculated'].toFixed(1);
          _t.data.schoolList.push(cell);
        });
        _t.setData({
          schoolList: _t.data.schoolList
        })
      }
    })
  }
})