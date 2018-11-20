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
    // var user = wx.getStorageSync('user') || {};
    // var userInfo = wx.getStorageSync('userInfo') || {};
    // var openid = wx.getStorageSync('openid') || {};
    // var uid = wx.getStorageSync('uid') || {};

    var openId = (wx.getStorageSync('openId'))
    if (openId) {
      wx.getUserInfo({
        success: function (res) {
          that.setData({
            nickName: res.userInfo.nickName,
            avatarUrl: res.userInfo.avatarUrl,
          })
        },
        fail: function () {
          // fail
          console.log("获取失败！")
        },
        complete: function () {
          // complete
          console.log("获取用户信息完成！")
        }
      })
    } else {
      wx.login({
        success: function (res) {
          console.log(res.code)
          if (res.code) {
            wx.getUserInfo({
              withCredentials: true,
              success: function (res_user) {
                wx.request({
                  //后台接口地址
                  url: 'https://www.luckymp.com/index.php?g=Api&m=Public&a=login',
                  data: {
                    code: res.code,
                    encryptedData: res_user.encryptedData,
                    iv: res_user.iv
                  },
                  method: 'POST',
                  header: {
                    'content-type': 'application/x-www-form-urlencoded'
                  },
                  success: function (res) {
                    // this.globalData.userInfo = JSON.parse(res.data);
                    this.setData({
                      nickName: res.data.nickName,
                      avatarUrl: res.data.avatarUrl,
                    })
                    wx.setStorageSync('openId', res.data.openId);

                  }
                })
              }, fail: function () {
                wx.showModal({
                  title: '警告通知',
                  content: '您点击了拒绝授权,将无法正常显示个人信息,点击确定重新获取授权。',
                  success: function (res) {
                    if (res.confirm) {
                      wx.openSetting({
                        success: (res) => {
                          if (res.authSetting["scope.userInfo"]) {////如果用户重新同意了授权登录
                            wx.login({
                              success: function (res_login) {
                                if (res_login.code) {
                                  wx.getUserInfo({
                                    withCredentials: true,
                                    success: function (res_user) {
                                      wx.request({
                                        url: 'https://www.luckymp.com/index.php?g=Api&m=Public&a=login',
                                        data: {
                                          code: res_login.code,
                                          encryptedData: res_user.encryptedData,
                                          iv: res_user.iv
                                        },
                                        method: 'POST',
                                        header: {
                                          'content-type': 'application/x-www-form-urlencoded'
                                        },
                                        success: function (res) {
                                          that.setData({
                                            nickName: res.data.nickName,
                                            avatarUrl: res.data.avatarUrl,

                                          })
                                          wx.setStorageSync('openId', res.data.openId);
                                        }
                                      })
                                    }
                                  })
                                }
                              }
                            });
                          }
                        }, fail: function (res) {

                        }
                      })

                    }
                  }
                })
              }, complete: function (res) {


              }
            })
          }
        }
      })

    }
  },
  globalData: {
    userInfo: null
  },
  luckyurl: 'https://www.luckymp.com'
}
App(config);