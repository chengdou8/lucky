const app = getApp()

Page({
  data: {
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  onLoad: function () {
    wx.getSetting({
      success: function (res) {
        if (res.authSetting['scope.userInfo']) {
          wx.getUserInfo({
            success: function (res) {
              wx.showToast({
                title: "您已经授权",
                icon: 'none',
                duration: 2000
              });
            }
          })
        }
      }
    })
  },
  bindGetUserInfo: function (e) {
    var that = this;
    if (e.detail.userInfo) {
      app.globalData.headImg = e.detail.userInfo.avatarUrl;
      wx.login({
        success: res => {
          wx.request({
            url: app.luckyurl+'/index.php?g=Api&m=Public&a=login',
            data: {
              code: res.code,
              iv: e.detail.iv,
              encryptedData: e.detail.encryptedData,
            },
            method: 'post',
            header: {
              'content-type': 'application/x-www-form-urlencoded'
            },
            success: function (res) {
              if(res.data.code==1) {
                wx.request({
                  url: app.luckyurl +'/index.php?g=Api&m=Public&a=login_c',
                  data: {
                    openid: res.data.info.openid,
                    unionid: res.data.info.unionid,
                    nickname: e.detail.userInfo.nickName,
                    headimgurl: e.detail.userInfo.avatarUrl,
                    sex: e.detail.userInfo.gender,
                    province: e.detail.userInfo.province,
                    city: e.detail.userInfo.city,
                    country: e.detail.userInfo.country
                  },
                  method: 'post',
                  header: {
                    'content-type': 'application/x-www-form-urlencoded'
                  },
                  success: function(res) {
                    var userInfo = res.data.info
                    wx.setStorageSync('userInfo', userInfo)
                    wx.setStorageSync('openid', userInfo.openid)
                    wx.setStorageSync('uid', userInfo.id)
                    wx.showToast({
                      title: "您已成功授权",
                      icon: 'success',
                      duration: 2000
                    })
                    setTimeout(function () {
                      wx.redirectTo({
                        url: '/pages/index/index'
                      })
                    }, 1500)
                  }
                })
              }
            }
          })
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
  bind:function() {
    wx.navigateTo({
      url: '/pages/index/index'
    })
  }
})