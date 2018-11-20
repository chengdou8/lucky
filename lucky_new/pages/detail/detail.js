const app = getApp()

Page({
  data: {
    member_id:'',
    card_name:'',
    card_description:'',
    score:'',
    flag: false
  },
  onLoad: function (options) {
    var that = this;
    var openid = wx.getStorageSync('userInfo').unionid
    var uid = wx.getStorageSync('userInfo').id
    wx.setStorageSync('id', options.id)
    wx.request({
      url: app.luckyurl + '/index.php?g=Api&m=Index&a=show_card',
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      method: "POST",
      data: {
        openid: openid,
        id: options.id,
        uid: uid
      },
      success: function (res) {
        if (res.data.code == 1) {
          that.setData({
            member_id: res.data.info.member_id,
            card_name: res.data.info.card_name,
            card_description: res.data.info.card_description,
            headImg:res.data.info.head_img,
            score: res.data.info.score
          })
          console.log(wx.getStorageSync('userInfo').id + "/" + res.data.info.member_id)
          if (wx.getStorageSync('userInfo').id == res.data.info.member_id) {
            that.setData({
              flag: true
            })
          }
          wx.setStorageSync('card_name', res.data.info.card_name)
        } else {
          wx.showToast({
            title: res.data.message,
            icon: 'loading',
            duration: 1000
          })
        }
      },
      fail: function () {
        wx.showToast({
          title: '服务器网络错误!',
          icon: 'loading',
          duration: 1500
        })
      }
    })
  },
  onShareAppMessage: function () {
    var article_id = wx.getStorageSync('id');
    var card_name = wx.getStorageSync('card_name');
    var path = '/pages/detail/detail?id=' + article_id;
    return {
      title: card_name,
      path: path
    }
  },
  score: function() {
    wx.navigateTo({
      url: '/pages/score/score?id=' + wx.setStorageSync('id')
    })
  }
})