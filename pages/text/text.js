// pages/text/text.js
const util = require('../../utils/util'),
  bgm = util.playerData.bgm;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 是否音乐弹框显示
    isShow: false,
    isStoped: false,
    startTime: 0,
    startSrc: "",
    startTitle: ""

  },
  // // 弹框上面的按钮暂停
  pausebgm: function () {
    bgm.pause();
    // 修改按钮指示数据
    this.setData({
      controlShow: false
    })
  },
  playbgm: function(){
    if (!this.data.isStoped) {
      bgm.play();
    } else {
     console.log(this.data)
      // 为了避免过快点击卡死，可以不加定时器
      // setTimeout(() => {
        bgm.src = this.data.startSrc;
        bgm.startTime = this.data.startTime;
        bgm.title = this.data.startTitle;
        util.playerData.conTitle = this.data.startTitle;

      // }, 300)

    }

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    // 将播放器的played标志，赋值给isShow，用于是否能显示弹窗
    this.setData({
      isShow: util.playerData.played
    })
    if (bgm.src === "" || bgm.paused) {
      // 返回时是暂停
      that.setData({
        controlShow: false,
        coursetitle: util.playerData.conTitle,
        duration: util.playerData.time_total_str
      })
    } else {
      // var currentIndex = this.data._currentIndex;
      // console.log("走了显示")
      that.setData({
        controlShow: true,
        coursetitle: util.playerData.conTitle,
        duration: util.playerData.time_total_str

      })
    }
    this.setData({
      startSrc: bgm.src,
      startTitle: bgm.title
    })

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

   

    // 监听更新事件
    bgm.onTimeUpdate(function () {
      console.log("启动了text更新");
      // var currentIndex = that.data._currentIndex;
      // var currentTime = "music[" + currentIndex + "].music.currentTime";
      // var duration = "music[" + currentIndex + "].music.duration";
      // console.log(bgm.title)
      // 修改按钮指示数据
      
      that.setData({
        startTime: bgm.currentTime
      })
      console.log(that.data.startTime)
    })

    bgm.onStop(function () {
      // 点击暂停，开始暂停的标记
      that.setData({
        controlShow: false,
        isStoped: true
      })

    })



  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
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
  onPageScroll: function(e){
    var that = this;
    util.checkScroll(e, that);
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})