// pages/publish/ask/ask-detail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: '',
    publishDetail: {},
    imageWidth: 375,
    scrollHeight: getApp().globalData.scrollHeight + 30,
    isShow: false,
    concernText: '关注',
    answer: '',
    answerLength: 0,
    isAnswer: false,
    showTopTips: false,
    isShowRefresh: false,
    isShowLoadMore: false,
    limit: getApp().globalData.limit,
    times: 0, //加载更多的次数
    answerList: [],
    answerCount: 0,
    hotCategory: '',
    isMine: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let _t = this;
    if (options.category == 0) {
      this.setData({
        hotCategory: '回答'
      })
    }
    if (options.category == 1) {
      this.setData({
        hotCategory: '评论'
      })
    }
    if (options.type) {
      this.setData({
        isMine: true
      })
    }else {
      this.setData({
        isMine: false
      })
    }
    this.setData({
      id: options.id,
      imageWidth: (getApp().globalData.windowWidth - 30 - 18) / 3
    })
    const requestTask = wx.request({
      url: getApp().globalData.url + '/miniapps/getpublishdetail',
      method: 'POST',
      data: {
        '_id': this.data.id
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
          _t.setData({
            publishDetail: res['data']['data']
          })
          wx.getStorageSync('wxUser')['concern'].forEach(cell => {
            if (res['data']['data']['openid'] == cell['openid'] && cell['type'] == 1) {
              _t.setData({
                concernText: '已关注'
              })
            }
          }) 
      }
    })
    this.getAnswerCount();
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
    this.getAnswerCount();
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
    this.getAnswerCount();
    this.getList(this.data.limit, this.data.limit * this.data.times, 'up')
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },

  previewImage: function (e) {
    let list = [];
    e.currentTarget.dataset.list.forEach(item => {
      list.push('http://' + item);
    })
    wx.previewImage({
      current: e.currentTarget.id,
      urls: list // 需要预览的图片http链接列表
    })
  },
  // 关注
  doConcern: function (e) {
    let _t = this;
    if (this.data.concernText == '已关注') {
      return;
    }
    this.setData({
      isShow: true
    })

    const requestTask = wx.request({
      url: getApp().globalData.url + '/miniapps/doconcern',
      method: 'POST',
      data: {
        'mine_openid': wx.getStorageSync('openid'),
        'user_openid': e.currentTarget.dataset.openid
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        console.log(res);
        if (res.data.status === 1) {
          _t.setData({
            isShow: false,
            concernText: '已关注'
          })
        }
      }
    })
  },
  // 回答
  doAnswer: function () {
    this.setData({
      isAnswer: true
    })
  },
  publishAnswer: function () {
    let _t = this;
    if (this.data.answerLength === 0) {
      this.setData({
        showTopTips: true,
        errorMsg: '请填写您的回答'
      })
      setTimeout(function () {
        _t.setData({
          showTopTips: false
        })
      }, 2000)
      return
    }
    wx.showLoading({
      title: '正在发布'
    })
    const requestTask = wx.request({
      url: getApp().globalData.url + '/miniapps/addanswer',
      method: 'POST',
      data: {
        des: _t.data.answer,
        user_name: getApp().globalData.userInfo.nickName,
        avatar_url: getApp().globalData.userInfo.avatarUrl,
        image_url: _t.data.imageUrlList,
        q_id: _t.data.id,
        source: 1
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        wx.hideLoading();
        if (res.data.status === 1) {
          _t.setData({
            isAnswer: false
          })
          _t.getAnswerCount();
          _t.getList(_t.data.limit, 0, '')
        }
      }
    })
    
  },
  cancelAnswer: function () {
    this.setData({
      isAnswer: false
    })
  },
  bindKeyInput: function(e) {
    this.setData({
      answer: e.detail.value,
      answerLength: e.detail.value.length
    })
  },

  // 获取列表
  getList: function (limit, offset, types) {
    let _t = this;

    const requestTask = wx.request({
      url: getApp().globalData.url + '/miniapps/getanswerlist',
      method: 'POST',
      data: {
        limit: limit,
        offset: offset,
        q_id: _t.data.id
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
          _t.data.answerList = [];
        }
        res['data']['data'].forEach(cell => {
          _t.data.answerList.push(cell);
        });
        _t.setData({
          answerList: _t.data.answerList
        })
      }
    })
  },

  // 获取回复数量
  getAnswerCount: function () {
    let _t = this;
    const requestTask = wx.request({
      url: getApp().globalData.url + '/miniapps/getanswercount',
      method: 'POST',
      data: {
        'q_id': _t.data.id
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        _t.setData({
          answerCount: res['data']['count']
        })
      }
    })
  },

  deletePublish: function(e) {
    wx.showModal({
      content: '确定删除吗？',
      success: function (res) {
        if (res.confirm) {
          const requestTask = wx.request({
            url: getApp().globalData.url + '/miniapps/deletemypublish',
            method: 'POST',
            data: {
              '_id': e.currentTarget.dataset._id
            },
            header: {
              'content-type': 'application/json'
            },
            success: function (res) {
              wx.navigateTo({
                url: '/pages/my/mypublish/mypublish'
              })
            }
          })
        } else if (res.cancel) {
          
        }
      }
    })
  },

  goHome: function () {
    wx.switchTab({
      url: '/pages/publish/index'
    })
  }
})