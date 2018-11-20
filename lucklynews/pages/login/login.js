
var util = require('../../utils/util.js');
var app = getApp()
Page({
  data: {
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  onLoad: function () {
  },
  bindGetUserInfo: function (e) {
    var that = this;
    console.log(wx.getStorageSync('all_type'));
    console.log(wx.getStorageSync('all_url'));
    console.log(e.detail.userInfo);
    if (e.detail.userInfo) {
      //app.globalData.headImg = e.detail.userInfo.avatarUrl;

      wx.login({
        success: res => {
          console.log(res);
          var pmapa = {};
          pmapa.code = res.code;
          var client_url = app.globalData.http_url + "/api/Public/login.html";
          util.PostAll(client_url, pmapa, function (rest) {
            if (rest.data.code == 1) {
              //console.log(rest.data.info.unionid);
              var pmapt = {};
              pmapt.nickname = e.detail.userInfo.nickName;
              pmapt.headimgurl = e.detail.userInfo.avatarUrl;
              pmapt.openid = rest.data.info.openid;
              pmapt.unionid = rest.data.info.unionid;
              pmapt.sex = e.detail.userInfo.gender;
              pmapt.province = e.detail.userInfo.province;
              pmapt.city = e.detail.userInfo.city;
              pmapt.country = e.detail.userInfo.country;
              var client_urlt = app.globalData.http_url + "/api/Public/login_c.html";
              util.PostAll(client_urlt, pmapt, function (restc) {
                if (restc.data.code == 1) {
                  wx.setStorageSync('memberinfo', restc.data.info);
                  util.toast('授权成功！');
                  setTimeout(function () {
                    wx.reLaunch({
                      url: wx.getStorageSync('all_url')
                    })
                  }, 1500)
                } else {
                  util.toast('参数错误3！');
                }
              });
            } else {
              util.toast('参数错误4！');
            }
          });
        }
      })
    } else {
      wx.showToast({
        title: "为了您更好的体验,请先同意授权",
        icon: 'none',
        duration: 2000
      });
    }
  },

})