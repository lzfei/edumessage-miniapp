// pages/map/index.js
Page({
  data: {
    longitude: wx.getStorageSync('longitude'),
    latitude: wx.getStorageSync('latitude'),
    markers: [{
      iconPath: "../../image/my-position.png",
      id: 0,
      latitude: wx.getStorageSync('longitude'),
      longitude: wx.getStorageSync('latitude'),
      width: 50,
      height: 50
    }],
  },
  regionchange(e) {
    console.log(e.type)
  },
  markertap(e) {
    console.log(e.markerId)
  },
  controltap(e) {
    console.log(e.controlId)
  }
})