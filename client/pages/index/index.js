//index.js
//获取应用实例
const app = getApp()
Page({
  data: {
    scrollHeight: getApp().globalData.scrollHeight - 48,
    inputShowed: false,
    inputVal: "",
    grids: [
      { 'id': 1, name: '找学校', url: '/pages/index/school/school', icon:'../../image/index-school.png'},
      { 'id': 2, name: '找老师', url: '/pages/index/teacher/teacher', icon: '../../image/index-teacher.png' },
      { 'id': 3, name: '限时优惠', url: '/pages/index/discounts/discounts', icon: '../../image/index-discounts.png' },
      { 'id': 4, name: '网络课程', url: '/pages/index/class/class', icon: '../../image/index-class.png' }
      ],
    carousel: [
      '../../image/carousel-1.jpg',
      '../../image/carousel-2.jpg',
      '../../image/carousel-3.jpg'
    ],
    // navbar
    tabs: ["选项一", "选项二", "选项三"],
    activeIndex: 1,
    sliderOffset: 0,
    sliderLeft: 0,
    publishList:[],
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
  onLoad: function () {
    
  },
  getHotAsk: function () {
    let _t = this;
    _t.data.publishList = [];
    const requestTask = wx.request({
      url: getApp().globalData.url + '/miniapps/gethotpublishlist',
      method: 'POST',
      data: {
        limit: 5,
        offset: 0
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        res['data']['data'].forEach(cell => {
          let _time = new Date().getTime() - new Date(cell.date).getTime();
          // 1小时 = 60 * 60 * 1000
          // 1天 = 24 * 3600000
          if (_time < 60 * 1000) {
            cell.date = '刚刚';
          }else if (_time < 24 * 3600000) {
            if (_time < 60 * 60 * 1000) {
              cell.date = Math.ceil(_time / 60000) + '分钟前';
            }
            if (_time > 60 * 60 * 1000 && _time < 24 * 60 * 60 * 1000) {
              cell.date = Math.ceil(_time / 3600000) + '小时前';
            }
          } else if (_time < 2 * 24 * 3600000) {
            cell.date = '昨天';
          } else if (_time < 10 * 24 * 3600000) {
            cell.date = Math.ceil(_time / (24 * 3600000)) + '天前'
          }
          _t.data.publishList.push(cell);
        });
        _t.setData({
          publishList: _t.data.publishList
        })
      }
    })
  },
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../map/index'
    })
  },

  quickAsk: function () {
    this.getuploadtoken();
    wx.showActionSheet({
      // itemList: ['提问', '发图文', '拍视频', '上传视频'],
      itemList: ['提问', '发图文'],
      success: function (res) {
        if (res.tapIndex === 0) {
          wx.navigateTo({
            url: '/pages/publish/ask/ask?category=0'
          })
        }
        if (res.tapIndex === 1) {
          wx.navigateTo({
            url: '/pages/publish/ask/ask?category=1'
          })
        }
        if (res.tapIndex === 2) {
          wx.navigateTo({
            url: '/pages/publish/ask/ask'
          })
        }
      },
      fail: function (res) {
        console.log(res.errMsg)
      }
    })
  },
  moreHotPublish: function () {
    wx.navigateTo({
      url: '/pages/publish/hotpublish'
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
    wx.hideLoading();
    this.getHotAsk();
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
  },

  citys: function () {
    wx.showModal({
      title: '提示',
      content: '其他城市陆续在开通中，尽情期待',
      success: function (res) {
        if (res.confirm) {
          console.log('用户点击确定')
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },

  getuploadtoken: function () {
    let _t = this;
    const requestTask = wx.request({
      url: getApp().globalData.url + '/qiniu/getuploadtoken',
      method: 'GET',
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        if (res.data.status === 1) {
          getApp().globalData.uploadtoken = res.data.data;
        }
      }
    })
  }
});