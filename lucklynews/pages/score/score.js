//index.js
//获取应用实例
var util = require('../../utils/util.js');
var app = getApp()
Page({
  onLoad: function (options) {
    var that = this;
    wx.setStorageSync('all_url', '/pages/score/score?id=' + options.id);
    if (!wx.getStorageSync('memberinfo')) {
      wx.reLaunch({
        url: '/pages/login/login'
      })
    }
    wx.setStorageSync('card_id', options.id)
    var pmapt = {};
    pmapt.openid = wx.getStorageSync('memberinfo').unionid;
    pmapt.uid = wx.getStorageSync('memberinfo').id;
    pmapt.id = wx.getStorageSync('card_id');
    var client_urlt = app.globalData.http_url + "/api/Index/view.html";
    util.PostAll(client_urlt, pmapt, function (res) {
      if (res.data.code == 1) {
        that.setData({
          headImg: res.data.info.head_img,
          card_name: res.data.info.card_name,
          card_description: res.data.info.card_description,
          score: res.data.info.score,
          min: res.data.minscore,
          max: res.data.maxscore,
          u_openid: res.data.info.u_openid
        })
        wx.setStorageSync('u_openid', res.data.info.u_openid)
        wx.setStorageSync('view_id', res.data.info.view_id)
      } else if (res.data.code == 10001) {
        util.toast(res.data.message);
        setTimeout(function () {
          wx.navigateTo({
            url: '/pages/login/login'
          })
        }, 1500)
      }else
      {
        util.toast(res.data.message);
      }
    });
  },
  sliderBindchange: function (e) {
    this.setData({
      text: e.detail.value
    })
    wx.setStorageSync('scored', e.detail.value)
  },
  scores: function () {
    var that=this;
    var pmapt = {};
    pmapt.openid = wx.getStorageSync('memberinfo').unionid;
    pmapt.uid = wx.getStorageSync('memberinfo').id;
    pmapt.card_id = wx.getStorageSync('card_id');
    pmapt.u_openid = wx.getStorageSync('u_openid');
    pmapt.view_id = wx.getStorageSync('view_id');
    pmapt.score= wx.getStorageSync('scored');
    pmapt.type = 2;
    var client_url = app.globalData.http_url + "/api/Index/doview.html";
    util.PostAll(client_url, pmapt, function (res) {
      if (res.data.code == 1) {
        var pmapt = {};
        pmapt.id = wx.getStorageSync('card_id');
        that.onLoad(pmapt);
      } else {
        util.toast(res.data.message);
      }
    });
  }
})
