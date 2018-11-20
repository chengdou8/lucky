//index.js
//获取应用实例
var util = require('../../utils/util.js');
var app = getApp()
Page({
  onLoad: function (res) {
    var that = this;
    wx.setStorageSync('all_url','/pages/index/index');
    if (!wx.getStorageSync('memberinfo')) {
      wx.reLaunch({
        url: '/pages/login/login'
      })
    }
    that.setData({
      headImg: wx.getStorageSync('memberinfo').head_img,
    });
  },

  formSubmit: function (e) {
    if (e.detail.value.mymajor.length == 0) {
      util.toast('输入你的专业!');
      return false;
    }
    if (e.detail.value.mytaste.length == 0) {
      util.toast('输入专业心得!');
      return false;
    }
    var pmapt = {};
    pmapt.openid = wx.getStorageSync('memberinfo').unionid;
    pmapt.uid = wx.getStorageSync('memberinfo').id;
    pmapt.mylable = e.detail.value.mymajor;
    pmapt.card_description = e.detail.value.mytaste;
    var client_urlt = app.globalData.http_url + "/api/Index/dolable.html";
    util.PostAll(client_urlt, pmapt, function (restc) {
      if (restc.data.code == 1) {
        util.toast('提交成功！');
        setTimeout(function () {
          wx.navigateTo({
            url: '/pages/detail/detail?id=' + restc.data.info
          })
        }, 1500)
      } else {
        util.toast('参数错误a！');
      }
    });
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
