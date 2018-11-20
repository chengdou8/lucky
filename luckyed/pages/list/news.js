// pages/news/news.js
var app = getApp();
Page({
    data: {
        newsList:[]
    },
    onLoad: function() {
      var that = this
      
      wx.request({
        url: 'http://www.xhjinshawater.com/api.php?op=a_news', //api接口地址
        data: {},
        header: {
          'content-type': 'application/json'
        },
        success: function (res) {
          console.log(res.data)
          that.setData({
            newsList:res.data
          })
        }
      })
    }  
})