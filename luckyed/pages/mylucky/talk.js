const app = getApp();
var imglist = [];
Page({
  data: {
    info: [],
    flag:false
  },
  onLoad: function (options) {
    var tagcolor = options.color;
    getApp().globalData.point_Id = options.id;
    showView: (options.showView == "true" ? true : false)
    this.getData();
    this.setData({
      tagcolor: tagcolor
    })
    if (options.scene) {
      let scene = decodeURIComponent(options.scene) 
      scene = scene.split(';')
      let obj = {}
      for (let i = 0; i < scene.length; i++) {
        let item = scene[i].split(':')
        obj[item[0]] = item[1]
      }
      // 将options.id 替换为scene中提取的id 以保证后续业务不受影响
      options.id = obj.id
    }
  },
  getData: function () {
    var that = this;
    var openid = wx.getStorageSync('openid');
    var uid = wx.getStorageSync('uid');
    wx.request({
      url: app.luckyurl + '/index.php?g=Api&m=Mylable&a=opinion',
      data: {
        openid: openid,
        uid: uid,
        id: getApp().globalData.point_Id
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
  formSubmit: function(e) {
      var that =this;
      var openid = wx.getStorageSync('openid');
      var uid = wx.getStorageSync('uid');
      if (e.detail.value.content.length == 0) {
        wx.showToast({
          title: '请输入专业观点！',
          icon: 'loading',
          duration: 1500
        })
        setTimeout(function () {
          wx.hideToast()
        }, 2000)
      } else {
        wx.request({
          url: app.luckyurl + '/index.php?g=Api&m=Mylable&a=do_opinion',
          data: {
            openid: openid,
            uid: uid,
            card_id: getApp().globalData.point_Id,
            content: e.detail.value.content,
            item_img: imglist
        },
          header: {
            "Content-Type": "application/x-www-form-urlencoded"
          },
          method: "POST",
          success: function (res) {
            wx.showToast({
              title: '观点发表成功',
              icon: 'success',
              duration: 3000
            })
            setTimeout(function () {
              wx.hideToast()
            }, 2000)
            wx.navigateBack ({
              url:'../../pages/mylucky/pointlist'
            })
          }
        })
      }
  },
  checkimg: function () {
    var that = this;
    wx.chooseImage({
      count: 4,   
      sizeType: ['compressed'],  
      sourceType: ['album', 'camera'], 
      success: function (res) {
        that.setData({
          imglist: res.tempFilePaths
        })
        var imglist = that.data.imglist
        if (imglist.length >= 4) {
          that.setData({ flag: true })
        }
        that.upimgs({
          url: app.luckyurl + '/index.php?g=Api&m=Imgupload&a=upload',
          path: imglist
        })
      }
    })
  },
  upimgs: function (data) {
    var that = this,
      i = data.i ? data.i : 0,
      success = data.success ? data.success : 0,
      fail = data.fail ? data.fail : 0;
    wx.uploadFile({
      url: data.url,
      filePath: data.path[i],
      name: 'file',
      header: {
        'content-type': 'multipart/form-data'
      },
      success: function (res) {
        var obj = {};
        obj = JSON.parse(res.data)
        imglist.push(obj.info);
        success++;
        if (i == data.path.length - 1) {
          wx.showModal({
            content: '上传成功',
            success: function (res) {
              console.log(res)
            }
          })
        } else {
          wx.showToast({
            title: '图片上传中',
            icon: "loading"
          })
        }
      },
      fail: function (res) {
        fail++;
        console.log('fail:' + i + "fail:" + fail);
      },
      complete: function (res) {
        i++;
        if (i == data.path.length) {//当图片传完时，停止调用
          console.log('成功：' + success + " 失败：" + fail);
        } else {
          data.i = i;
          data.success = success;
          data.fail = fail;
          that.upimgs(data);
        }
      }
    })
  },
  viewimg: function (e) {
    wx.previewImage({
      current: e.target.dataset.src,
      urls: this.data.imglist
    })
  }
})