// pages/follow/follow.js
const util = require('../../utils/util');
const bgm = util.playerData.bgm;
// 开辟初始空间放缓存
var value;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    scroll: 0,
    followItem: [],
    showFlag: true,
    titleArr: [{ title: "怎么健康活到100岁", show: 1, id: 0 }, { title: "怎么健康活到101岁", show: 1, id: 1}, { title: "怎么健康活到102岁", show: 1, id:2 }, { title: "乔布斯马丽丽演讲", show: 1, id:3 }, { title: "有效管理你的健康", show: 1, id:4 }, { title: '怎么健康活到104岁', show: 1, id:5 }, { title: '心理学： 人的身体入侵了大脑', show: 1, id:6 }],
    // 控制弹框是否显示
    isShow: false,
    // 控制弹窗上面的按钮改变
    controlShow: true,
    // 关注按钮是否显示
    showHeart: false,
    duration: "00:00"
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
    console.log("followonload")
  },
  toCourse: function (e) {
    wx.navigateTo({
      url: '../course/course?id='+ e.currentTarget.dataset.id,
    })
  },
  toPlayer: function (e) {
    wx.navigateTo({
      url: '../player/player?id='+ e.currentTarget.dataset.id
    })
  },
  toText: function(){
    wx.navigateTo({
      url: '../../pages/text/text',
    })
  },
  toIndex: function(){
    wx.switchTab({
      url: '../index/index',
    })
  },
  // 弹框上面的按钮播放
  playbgm: function () {
    bgm.play();
    // 修改util中播放按钮的标志数据，并同步的本地数据
    // var res = util.changebtnFlag()
    // this.setData({
    //   controlShow: res
    // })
    // 修改按钮指示数据
    this.setData({
      controlShow: true
    })

  },
  // 弹框上面的按钮暂停
  pausebgm: function () {
    bgm.pause();
    // 修改util中播放按钮的标志数据，并同步的本地数据
    // var res = util.changebtnFlag()
    // this.setData({
    //   controlShow: res
    // })
    // 修改按钮指示数据
    this.setData({
      controlShow: false
    })
  },
  // 取消关注
  cancelFollow: function (e) {
    // 取消时，取id,修改本地缓存
    value = wx.getStorageSync('followed');
    console.log(e.target.dataset.titleid)
    for (var i = 0; i < value.length; i++) {
      if (parseInt(value[i]) == e.target.dataset.titleid) {
        value.splice(i, 1);
        wx.setStorageSync('followed', value);
      }
    }
    console.log(wx.getStorageSync('followed'))
    // 修改数据，取show，变样式
    var show = "followItem[" + e.target.dataset.show +"].show";
    this.setData({
      [show]:0 
    })
    // 弹出提示框
    wx.showToast({
      title: '取消成功',
      icon: 'success'
    })
    console.log("取消该关注，删除本地缓存，但数据还没有更新")

  }
  ,
  addFollow: function(e){
    var value = wx.getStorageSync('followed');
    value.push(e.target.dataset.titleid);
    wx.setStorageSync('followed', value);
    var show = "followItem[" + e.target.dataset.show + "].show";
    this.setData({
      [show]: 1
    })

    // 弹出提示框
    wx.showToast({
      title: '重新添加关注',
      icon: 'success'
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    console.log("followonready")
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    console.log("followonshow")
    value = wx.getStorageSync('followed');
    console.log(value)
    if (value.length != 0) {
      this.setData({
        showFlag: false
      })
    }
    //拿到id之后进行数据的筛选并复制给data中的followItem
    var tempArr = [];

    for (var item of value){
      var itemc = parseInt(item);
      tempArr.push(this.data.titleArr[itemc])
    }
    this.setData({
      followItem: tempArr
    })
    console.log(this.data.followItem)

    // 将播放器的played标志，赋值给isShow，用于是否能显示音乐弹窗
    this.setData({
      isShow: util.playerData.played
    })
    // *******方案一*******
    // // 页面加载时，用util中数据调整本页面按钮的数据
    // this.setData({
    //   controlShow: util.playerData.playbtnFlag
    // })

    // *******方案2*******
    // 页面加载时，判断是否播放状态修改按钮
    if (bgm.paused) {
      this.setData({
        controlShow: false
      })
    } else {
      this.setData({
        controlShow: true
      })
    }
    // 加载播放内容的总时间
    var duration = util.formatTime(bgm.duration)
    this.setData({
      duration: duration
    })

    var that = this;
    // 监听暂停事件
    bgm.onPause(function () {
      console.log("启动了暂定");
      // 修改按钮指示数据
      that.setData({
        controlShow: false
      })

    })
    // 监听播放事件
    bgm.onPlay(function () {
      console.log("启动了播放");
      // 修改按钮指示数据
      that.setData({
        controlShow: true
      })
    }) 
   
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    if (value.length == 0) {
      this.setData({
        showFlag: true
      })
    }
    this.setData({
      followItem: value
    })
    console.log("离开该页面，更新关注的数据，另外向服务器发送更新后的数据")

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },
  onPageScroll: function (e) {
    var that = this;
    util.checkScroll(e, that);
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    return {
      title: '尚德-知识变相',
      desc: '最具人气的小程序学习平台!'
    }
  }
})