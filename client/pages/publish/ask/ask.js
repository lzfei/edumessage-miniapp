const qiniuUploader = require("../../../utils/qiniuUploader");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showTopTips: false,
    errorMsg: '',
    des: '',
    main: '',
    desLength: 0,
    mainLength: 0,
    files: [],
    imageUrlList: [],
    category: 0,
    title: '',
    placeholder: '',
    placeholder2: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let _placeholder = '';
    let _title = '';
    let _placeholder2 = '';
    if (options.category == 0) {
      _title = '提问'
      _placeholder = '您的问题...'
      _placeholder2 = '问题描述...'
    }
    if (options.category == 1) {
      _title = '分享'
      _placeholder = '现在的想法...'
    }
    this.setData({
      title: _title,
      placeholder: _placeholder,
      placeholder2: _placeholder2,
      category: options.category
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

  bindKeyInput: function (e) {
    this.setData({
      main: e.detail.value,
      mainLength: e.detail.value.length
    })
  },

  bindKeyInput2: function (e) {
    this.setData({
      des: e.detail.value
    })
  },

  publish: function () {
    let _t = this;

    if (this.data.mainLength === 0) {
      this.setData({
        showTopTips: true,
        errorMsg: '请填写' + _t.data.placeholder
      })
      setTimeout(function () {
        _t.setData({
          showTopTips: false
        })
      }, 2000)
      return
    }
    wx.showLoading({
      title: '正在发表'
    })
    const requestTask = wx.request({
      url: getApp().globalData.url + '/miniapps/publish',
      method: 'POST',
      data: {
        main: _t.data.main,
        des: _t.data.des,
        openid: wx.getStorageSync('openid'),
        user_name: getApp().globalData.userInfo.nickName,
        avatar_url: getApp().globalData.userInfo.avatarUrl,
        source: 1,
        image_url: _t.data.imageUrlList,
        category: _t.data.category,
        answer_count: 0
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        wx.hideLoading();
        if (res.data.status === 1) {
          wx.switchTab({
            url: '/pages/publish/index'
          })
        }
      }
    })
  },
  chooseImage: function (e) {
    let that = this;
    wx.chooseImage({
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        let tempFilePaths = res.tempFilePaths
        that.setData({
          files: that.data.files.concat(tempFilePaths)
        });
        tempFilePaths.forEach(item => {
          // 交给七牛上传
          qiniuUploader.upload(item, (res) => {
            that.data.imageUrlList.push(res.imageURL);
          }, (error) => {
            console.log('error: ' + error);
          }, {
              region: 'SCN',
              domain: 'qiniu.edumessage.xyz',
              uptoken: getApp().globalData.uploadtoken
            }, (res) => {
            });
        })
  
      }
    })
  },
  previewImage: function (e) {
    wx.previewImage({
      current: e.currentTarget.id, // 当前显示图片的http链接
      urls: this.data.files // 需要预览的图片http链接列表
    })
  }
})