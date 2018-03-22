// var allplay = require("../../utils/allplay")；
// var timer;
// // 页面渲染完成 
// var cxt_arc = wx.createCanvasContext('canvasArc');
// //创建并返回绘图上下文context对象。
// var start = -.5;
// // 每一秒修改的距离
// var speed = 2 / 286;
const util = require('../../utils/util'),
      bgm = util.playerData.bgm,
      cav_obj = util.cavData.cxt_arc;

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
    showErrorComponent: true,
    durationTime:"",
    currentTime:""


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
    console.log(util)
  
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
  playbgm: function () {
    util.playbgm(bgm, this);
    
  },
  pausebgm: function () {
    util.pausebgm(bgm, this);
    
  },
 
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    util.cir_stopdraw(cav_obj)
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
    
    util.isbgmPaused(bgm ,this);
    util.alreadyPlayed(this);
    util.getDuration(bgm, this);
    util.watchPause(bgm, this);
    util.watchPlay(bgm, this);

    // bgm.onTimeUpdate(()=>{
    //   this.setData({
    //     durationTime: bgm.duration,
    //     currentTime: bgm.currentTime
    //   })
    //   console.log(this.data.currentTime + ":" + this.data.durationTime);
      
    // })

    

    if (this.data.isShow == true){
      var start = (bgm.currentTime/bgm.duration)*2 - 0.5;
      util.cavData.start = start;
      if (!bgm.paused) {
        util.drawCanvas(cav_obj);
      } else {
        util.cir_update(cav_obj)
      }
    }
   
    
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

