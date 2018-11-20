//app.js
var config = {
  globalData: {
    appid: 'wx56df322e7c71e5d7',
    secret: '8cd88da07fe2dcc5367dce24258a5b4f',
    Openid: null,
    Uid: null,
    AnswerDetailid: null,
    nickName:null,
    headImg:null,
    Sex:null,
    province:null,
    city:null,
    country:null,
    Balance:null,
    reward_id:null,
    u_Openid:null,
    card_Id:null,
    view_Id:null,
    tag_Id:null,
    point_Id:null,
    description:null,
    ctitle:null,
    anonymous:null,
    imglist:null
  },
  onLaunch: function () {
    //调用API从本地缓存中获取数据
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    var that = this
    var userInfo = wx.getStorageSync('userInfo') || {};
    var openid = wx.getStorageSync('openid') || {};
    var uid = wx.getStorageSync('uid') || {};

    if (wx.getStorageSync('openid') == '' && wx.getStorageSync('uid') == '') {
      wx.login({
        success: function (res_login) {
          if (res_login.code) {
            wx.getUserInfo({
              success: function (res) {
                var userInfo = res.userInfo
                getApp().globalData.headImg = userInfo.avatarUrl
                getApp().globalData.nickName = userInfo.nickName
                getApp().globalData.Sex = userInfo.gender
                getApp().globalData.province = userInfo.province
                getApp().globalData.city = userInfo.city
                getApp().globalData.country = userInfo.country
                wx.setStorageSync('userInfo', userInfo)
                var url = 'https://www.luckymp.com/index.php?g=Api&m=Public&a=login'
                wx.request({
                  url: url,
                  data: {
                    code: res_login.code
                  },
                  header: {
                    'content-type': 'application/x-www-form-urlencoded'
                  },
                  method: 'POST',
                  success: function (result) {
                    var obju = {}
                    obju.unionid = result.data.info.unionid
                    wx.setStorageSync('openid', obju.unionid)
                    var urlc = 'https://www.luckymp.com/index.php?g=Api&m=Public&a=login_c'
                    wx.request({
                      url: urlc,
                      data: {
                        openid: result.data.info.openid,
                        unionid: result.data.info.unionid,
                        headimgurl: getApp().globalData.headImg,
                        nickname: getApp().globalData.nickName,
                        sex: getApp().globalData.Sex,
                        province: getApp().globalData.province,
                        city: getApp().globalData.city,
                        country: getApp().globalData.country
                      },
                      header: {
                        'content-type': 'application/x-www-form-urlencoded'
                      },
                      method: 'POST',
                      success: function (res) {
                        var obj = {}
                        obj.uid = res.data.info.id
                        wx.setStorageSync('uid', obj.uid)
                      }
                    })
                  }
                })
              },
              fail: function () {
                wx.showModal({
                  title: '警告',
                  content: '您点击了拒绝授权，将无法正常使用共享绝招的功能体验。请再次点击重新授权，或者删除共享绝招小程序重新进入。',
                  confirmText:'重新授权',
                  success: function (res) {
                    if (res.confirm) {
                      console.log('用户点击重新授权')
                      wx.openSetting({
                        success: (res) => {
                          if (res.authSetting["scope.userInfo"]) {////如果用户重新同意了授权登录
                            wx.login({
                              success: function (res_login) {
                                if (res_login.code) {
                                  wx.getUserInfo({
                                    withCredentials: true,
                                    success: function (res) {
                                      var userInfo = res.userInfo
                                      getApp().globalData.headImg = userInfo.avatarUrl
                                      getApp().globalData.nickName = userInfo.nickName
                                      getApp().globalData.Sex = userInfo.gender
                                      getApp().globalData.province = userInfo.province
                                      getApp().globalData.city = userInfo.city
                                      getApp().globalData.country = userInfo.country
                                      wx.setStorageSync('userInfo', userInfo)

                                      var url = 'https://www.luckymp.com/index.php?g=Api&m=Public&a=login'
                                      wx.request({
                                        url: url,
                                        data: {
                                          code: res_login.code
                                        },
                                        header: {
                                          'content-type': 'application/x-www-form-urlencoded'
                                        },
                                        method: 'POST',
                                        success: function (result) {
                                          var obju = {}
                                          obju.unionid = result.data.info.unionid
                                          wx.setStorageSync('openid', obju.unionid)
                                          var urlc = 'https://www.luckymp.com/index.php?g=Api&m=Public&a=login_c'
                                          wx.request({
                                            url: urlc,
                                            data: {
                                              openid: result.data.info.openid,
                                              unionid: result.data.info.unionid,
                                              head_img: getApp().globalData.headImg,
                                              nickname: getApp().globalData.nickName,
                                              sex: getApp().globalData.Sex,
                                              province: getApp().globalData.province,
                                              city: getApp().globalData.city,
                                              country: getApp().globalData.country
                                            },
                                            header: {
                                              'content-type': 'application/x-www-form-urlencoded'
                                            },
                                            method: 'POST',
                                            success: function (res) {
                                              var obj = {}
                                              obj.uid = res.data.info.id
                                              wx.setStorageSync('uid', obj.uid)
                                            }
                                          })
                                        }
                                    
                                      })
                                    }
                                  })
                                }
                              }
                            })
                          }
                        }, fail: function (res) {
                            console.log(res)
                        }
                      })
                    }
                  }
                })
              }
            });
          } else {
            console.log('获取用户登录态失败！' + res.errMsg)
          }
        }
      });
    }   
  },
  luckyurl : 'https://www.luckymp.com'
}
App(config);