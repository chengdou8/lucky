//index.js
//获取应用实例
var util = require('../../utils/util.js');
var app = getApp()
Page({
  onLoad: function (options) {
    var that = this;
    var pmapt = {};
    pmapt.openid = wx.getStorageSync('memberinfo').unionid;
    pmapt.uid = wx.getStorageSync('memberinfo').id;
    pmapt.id = options.id;
    var client_urlt = app.globalData.http_url + "/api/Index/show_card.html";
    util.PostAll(client_urlt, pmapt, function (res) {
      if (res.data.code == 1) {
        that.setData({
          card_name: res.data.info.card_name,
          card_description: res.data.info.card_description,
          headImg: res.data.info.head_img,
          score: res.data.info.score,
          ewm_img: res.data.info.result
        })
        wx.setStorageSync('card_name', res.data.info.card_name)
        wx.setStorageSync('card_id', res.data.info.id)
      } else {
        util.toast('参数错误2！');
      }
    });
  },
  onShareAppMessage: function () {
    var path = '/pages/score/score?id=' + wx.getStorageSync('card_id');
    return {
      title: wx.getStorageSync('card_name'),
      path: path
    }
  },
  score: function () {
    wx.navigateTo({
      url: '/pages/score/score?id=' + wx.getStorageSync('card_id')
    })
  }
})
