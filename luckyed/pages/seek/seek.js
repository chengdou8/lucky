//获取应用实例
const app = getApp()

// 当前页数  
var pageAskNum = 1;
var pageRewardNum = 1;
var limit = 5;
var count;

Page({
  data: {
    clientHeight: 0,
    currentTab: 0,
    aske_list: [],
    reward_list: [],
    hideAskHeader: true,
    hideAskBottom: true,
    hideRewardHeader: true,
    hideRewardBottom: true,
    totalPages: '',
    pageAskNum: 1,
    pageRewardNum: 1,
    limit: 5,
    hideAskBottomMore: true
  },
  onLoad: function () {
    var that = this;
    if (wx.getStorageSync('currentTab') != 0 ) {
      that.setData({
        currentTab: wx.getStorageSync('currentTab')
      })
    }
    /** 
     * 获取系统信息 
     */
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          clientHeight: res.windowHeight
        });
      }
    });
  },
  onShow: function () {
    var that = this;
    that.loadAskData(1);
    that.loadRewardData(1);
  },
  loadAskData: function (pageAskNum) {
    var that = this
    var openid = wx.getStorageSync('openid')
    var uid = wx.getStorageSync('uid')
    var pageIndex = that.data.pageAskNum;
    wx.request({
      url: app.luckyurl + '/index.php?g=Api&m=Reward&a=seek_aske',
      data: {
        openid: openid,
        uid: uid,
        p: pageAskNum,
        limit: 5
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      method: 'POST',
      success: function (res) {
        var dataModel = res.data;       
        getApp().globalData.totalAskPages = Math.ceil(dataModel.count / limit);
        if (dataModel.code == 1) {
          var tempArray = that.data.aske_list;
          tempArray = tempArray.concat(dataModel.info);
          if (pageAskNum == 1) {
            that.setData ({
              aske_list: dataModel.info,
              hideAskHeader: true
            })
          } else if (pageAskNum > 1 & pageAskNum <= getApp().globalData.totalAskPages) {
            that.setData({
              aske_list: tempArray,
              hideAskBottom: false,
              hideAskBottomMore:true
            })
          } else {
            that.setData({
              hideAskBottom: true,
              hideAskBottomMore: false
            })
            return;
          }
        }
      }
    })
  },
  loadRewardData: function (pageRewardNum) {
    var that = this
    var openid = wx.getStorageSync('openid')
    var uid = wx.getStorageSync('uid')
    var pageIndex = that.data.pageRewardNum;
    wx.request({
      url: app.luckyurl + '/index.php?g=Api&m=Reward&a=reward_list',
      data: {
        openid: openid,
        uid: uid,
        p: pageRewardNum,
        limit: 5
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      method: 'POST',
      success: function (res) {
        var dataModel = res.data;
        getApp().globalData.totalRewardPages = Math.ceil(dataModel.count / limit);
        if (dataModel.code == 1) {
          var tempArray = that.data.reward_list;
          tempArray = tempArray.concat(dataModel.info);
          if (pageRewardNum == 1) {
            that.setData({
              reward_list: dataModel.info,
              hideRewardHeader: true
            })
          } else if (pageRewardNum > 1 & pageRewardNum <= getApp().globalData.totalRewardPages) {
            that.setData({
              reward_list: tempArray,
              hideRewardBottom: false,
              hideRewardBottomMore: true
            })
          } else {
            that.setData({
              hideRewardBottom: true,
              hideRewardBottomMore: false
            })
            return;
          }
        }
      }
    })
  },
  loadMoreAsk: function () {
    var that = this;
    if (that.data.pageAskNum == getApp().globalData.totalAskPages) {
      that.setData({
        hideAskBottom: true,
        hideAskBottomMore:false
      })
      return;
    } else {
      var tempCurrentPage = that.data.pageAskNum;
      tempCurrentPage = tempCurrentPage + 1;
      that.setData({
        pageAskNum: tempCurrentPage,
        hideAskBottom: false
      })
      that.loadAskData(tempCurrentPage);
    }
  },
  loadMoreReward: function () {
    var that = this;
    if (that.data.pageRewardNum == getApp().globalData.totalRewardPages) {
      that.setData({
        hideRewardBottom: true,
        hideRewardBottomMore: false
      })
      return;
    } else {
      var tempCurrentPage = that.data.pageRewardNum;
      tempCurrentPage = tempCurrentPage + 1;
      that.setData({
        pageRewardNum: tempCurrentPage,
        hideRewardBottom: false
      })
      that.loadRewardData(tempCurrentPage);
    }
  },
  // 寻师问道下拉刷新
  refreshAsk: function (e) {
    var that = this;
    that.setData({
      pageAskNum: 1,
      scrollTop: 0,
      hideAskHeader: false
    })
    that.loadAskData(1);
  },
  // 悬赏问道下拉刷新
  refreshReward: function (e) {
    var that = this;
    that.setData({
      pageRewardNum: 1,
      hideRewardHeader: false
    })
    that.loadRewardData(1);
  },
  //该方法绑定了页面滚动时的事件
  scroll: function (event) {
    this.setData({
      scrollTop: event.detail.scrollTop
    });
  },
  mark: function (e) {
    var id = e.currentTarget.id;
    var app = getApp();

    app.requestMarkid = id
    wx.navigateTo({
      url: '../../pages/mark/mark?id="id"&member_id="member_id"'
    })
  },
  toAnswer: function(e) {
    var id = e.currentTarget.id
    wx.navigateTo({
      url: '../../pages/answer/answer?id=' + id
    })
  },
  viewpoint: function (e) {
    var cart_id = e.currentTarget.id
    var u_openid = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '../../pages/point/point?id=' + cart_id + '&u_openid=' + u_openid
    })
  },
  otherlucky: function(e) {
    var uid = e.currentTarget.id
    var u_openid = e.currentTarget.dataset.id
    var nickname = e.currentTarget.dataset.name
    wx.navigateTo({
      url: '../../pages/otherlucky/otherlucky?uid=' + uid + '&u_openid=' + u_openid + '&nickname=' + nickname
    })
  },
  /** 
     * 滑动切换tab 
     */
  bindChange: function (e) {
    var that = this;
    that.setData({ currentTab: e.detail.current });
  },
  /** 
   * 点击tab切换 
   */
  swichNav: function (e) {
    var that = this;
    if (this.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      that.setData({
        currentTab: e.target.dataset.current
      })
    }
  }
})  