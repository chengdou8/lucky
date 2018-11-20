var util = require('../../utils/util.js');
var app = getApp()
Page({
  data: {
    menu: true
  },
  onLoad: function (options) {
    var that = this;
    var pmapt = {};
    pmapt.openid = wx.getStorageSync('memberinfo').unionid;
    pmapt.uid = wx.getStorageSync('memberinfo').id;
    var client_urlt = app.globalData.http_url + "/api/Index/mylabel.html";
    util.PostAll(client_urlt, pmapt, function (res) {
      if (res.data.code == 1) {
        that.setData({
          headImg: res.data.userinfo.head_img,
          badgelist: res.data.badgelist,
          badgelistzj: res.data.badgelistzj,
          badgelistjs: res.data.badgelistjs,
          badgelistjss: res.data.badgelistjss,
          badgelisttx: res.data.badgelisttx,
        })
      } else {
        util.toast('参数错误2！');
      }
    });
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
  },
  dealChange: function (event) {
    var id = event.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/pages/detail/detail?id=' + id
    })
  },
})