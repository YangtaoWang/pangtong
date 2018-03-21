// var allplay = require("../../utils/allplay")；
const util = require('../../utils/util'),
      bgm = util.playerData.bgm;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    followFlag: true,
    imgUrls: [
      'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
      'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg',
      'http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg'
    ],
    indicatorDots: false,
    autoplay: true,
    interval: 5000,
    serieArr: [100, 101, 102],
    scroll:0,
    // 控制弹框是否显示
    isShow: false,
    // 控制弹窗上面的按钮改变
    controlShow: true,
    // 时长
    duration:"00:00",
    showErrorComponent: true


  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    setTimeout(()=>{
      this.setData({
        showErrorComponent: false
      })
    }, 1000)
  
  },
  toCourse: function(e){
    wx.navigateTo({
      url: '../course/course?id=' + e.currentTarget.dataset.id,
    })
  },
  // 点击组件跳转到音乐播放器,点击红色按键也跳转
  toPlayer: function(e){
    wx.navigateTo({
      url: '../player/player?id=' + e.currentTarget.dataset.id
    })
  },
  // 弹框上面的按钮播放
  playbgm: function(){
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
  pausebgm: function(){
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
  }
  ,
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  // 添加缓存
  addFollow: function (e) {
    console.log(e.target.dataset.title);
    var value = wx.getStorageSync('followed');
    if (!value) {
      value = [];
      value.push(e.target.dataset.title);
      wx.setStorageSync('followed', value);
      console.log("第一次创建缓存并添加")
    } else {
      if (value.indexOf(e.target.dataset.title) == -1) {
        value.push(e.target.dataset.title);
        wx.setStorageSync('followed', value);
        console.log("添加了" + e.target.dataset.title);
      }
    }
    console.log("处理之后的缓存为" + wx.getStorageSync('followed'))

  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    // *******方案一*******
    // // 页面加载时，用util中数据调整本页面按钮的数据
    // this.setData({
    //   controlShow: util.playerData.playbtnFlag
    // })
    // *******方案一*******
    // 页面加载时，判断是否播放状态修改按钮
    if(bgm.paused){
      this.setData({
        controlShow: false
      })
    }else{
      this.setData({
        controlShow: true
      })
    }
    // console.log("按钮的状态" + util.playerData.playbtnFlag)
    // 将播放器的played标志，赋值给isShow，用于是否能显示弹窗
    this.setData({
      isShow: util.playerData.played
    })
    // 加载播放内容的总时间
    var duration = util.formatTime(bgm.duration);
    
    console.log(duration)
    // 如果没有获取到bgm.duration就默认是"00:00"
    if(duration == "NaN:NaN" ){
      this.setData({
        duration: "00:00"
      })
    }else{
      // 有值的话，正常赋值
      this.setData({
        duration: duration
      })
    }
    console.log(this.data.duration)
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
    return {
      title: '尚德-知识变相',
      desc: '最具人气的小程序学习平台!'
    }
  }
})

