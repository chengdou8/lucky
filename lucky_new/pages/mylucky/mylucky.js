const app = getApp()
Page({
  data: {
    headImg: wx.getStorageSync('userInfo').head_img,
    menu: true
  },
  onLoad: function () {
  },
  openMenu: function () {
    this.setData({
      menu: false
    })
  },
  closeMenu: function () {
    this.setData({
      menu: true
    })
  },
  home: function () {
    wx.redirectTo({
      url: '/pages/index/index'
    })
  },
  mylucky: function () {
    wx.redirectTo({
      url: '/pages/mylucky/mylucky'
    })
  }
})