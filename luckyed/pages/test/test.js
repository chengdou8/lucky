Page({
    modelToast: function (e) {
      var model = e.target.dataset.model;
      if (model == 1) {
        feedbackApi.showToast({ title: 'test shoToast title' })//调用  
      }
      if (model == 2) {
        feedbackApi.showToast({
          title: 'test shoToast title',
          icon: '/pages/templateImg/loading.gif'
        })
      }
      if (model == 3) {
        feedbackApi.showToast({
          title: 'test shoToast title',
          duration: 3000
        })
      }
      if (model == 31) {
        feedbackApi.showToast({
          title: 'test shoToast title',
          duration: 10000
        })
        setTimeout(function () {
          feedbackApi.hideToast();
        }, 2000)
      }
      if (model == 4) {
        feedbackApi.showToast({
          title: 'test shoToast title',
          mask: false
        })
      }
      if (model == 5) {
        feedbackApi.showToast({
          title: 'test shoToast title',
          cb: function () {
            console.log('回调进来了，可以制定业务啦')
          }
        })
      }
    },
    onLoad: function (e) {
      wx.setNavigationBarTitle({
        title: 'test showToast'
      })
    }
})