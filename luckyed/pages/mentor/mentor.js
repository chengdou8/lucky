//mentor.js
var app = getApp()
Page({
  data: {
    info:[],
    search: {
      searchValue: '',
      showClearBtn: false
    },
    searchResult: []
  },
  onLoad: function () {
    var that = this;
    var openid = wx.getStorageSync('openid');
    var uid = wx.getStorageSync('uid');

    wx.request({
      url: app.luckyurl + '/index.php?g=Api&m=Mentor&a=index',
      data: {
        openid: openid,
        uid: uid
      },
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      method: "POST",
      success: function (res) {
        that.setData({
          info: res.data.info
        })
      }
    })
  },
  otherlucky: function (e) {
    var uid = e.currentTarget.id
    var u_openid = e.currentTarget.dataset.id
    var nickname = e.currentTarget.dataset.name
    wx.navigateTo({
      url: '../../pages/otherlucky/otherlucky?uid=' + uid + '&u_openid=' + u_openid + '&nickname=' + nickname
    })
  },
  viewTag: function(e) {
    var tag_id = e.currentTarget.id
    var u_openid = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '../../pages/point/point?id=' + tag_id + '&u_openid=' + u_openid
    })
  },
  problem: function () {
    wx.navigateTo({
      url: '../../pages/mylucky/myproblem'
    })
  },
  //输入内容时
  searchActiveChangeinput: function (e) {
    const val = e.detail.value;
    this.setData({
      'search.showClearBtn': val != '' ? true : false,
      'search.searchValue': val
    })
  },
  //点击清除搜索内容
  searchActiveChangeclear: function (e) {
    this.setData({
      'search.showClearBtn': false,
      'search.searchValue': ''
    })
  },
  //点击聚集时
  focusSearch: function () {
    if (this.data.search.searchValue) {
      this.setData({
        'search.showClearBtn': true
      })
    }
  },
  //搜索提交
  searchSubmit: function () {
    const val = this.data.search.searchValue;
    if (val) {
      const that = this,
        app = getApp();
      wx.showToast({
        title: '搜索中',
        icon: 'loading'
      });
      wx.request({
        url: app.globalData.API_URL + 'searchTeam',
        data: {
          keywords: val,
          user_id: app.globalData.myInfo.user_id
        },
        method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
        // header: {}, // 设置请求的 header
        success: function (res) {
          // success
          let searchResult = res.data.data;
          const len = searchResult.length;
          for (let i = 0; i < len; i++) {
            searchResult[i]['team_avator'] = app.globalData.STATIC_SOURCE + searchResult[i]['team_avator'];
          }
          that.setData({
            searchResult: searchResult,
            'search.showClearBtn': false,
          })
        },
        fail: function () {
          // fail
        },
        complete: function () {
          // complete
          wx.hideToast();
        }
      })
    }
  }
})