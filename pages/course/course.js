// pages/course/course.js
// var allplay = require('../../utils/allplay.js');
const util = require('../../utils/util'),
  bgm = util.playerData.bgm,
  cav_obj = util.cavData.cxt_arc;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    scroll: 0,
    titleArr: ["怎么健康活到100岁", "怎么健康活到101岁", "怎么健康活到102岁", '乔布斯的魔力演讲', '有效管理你的健康', '怎么健康活到104岁', '心理学： 人的身体入侵了大脑'],
    courseId:"",
    // 判断是否展开高度的标志
    down: false,
    // 课程列表预设高度
    height: 464,
    heightFlag: true,
    // 控制弹框是否显示
    isShow: false,
    // 控制弹窗上面的按钮改变
    controlShow: true,
    duration: "00:00"
  },
  // 展开课程列表高度
  open: function (){
    // this.setData({
    //   down: !this.data.down
    // })
    // 这个变化的高度应该是根据数据动态变化的
    if(this.data.heightFlag){
      this.setData({
        height: 928,
        heightFlag: !this.data.heightFlag
      })
  
    }else{
      this.setData({
        height: 464,
        heightFlag: !this.data.heightFlag
      })
    }
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    // console.log(options.id)
    wx.setNavigationBarTitle({
      title: that.data.titleArr[options.id]
    });
    that.setData({
      courseId: options.id
    });

  },
  toPlayer: function(e){
    wx.navigateTo({
      url: '../player/player?id='+ e.currentTarget.dataset.id,
    })
  }
  ,
  toText: function(){
    wx.navigateTo({
      url: '../../pages/text/text'
    })
  },
  playbgm: function () {
    util.playbgm(bgm, this)
  },
  pausebgm: function () {
    util.pausebgm(bgm, this)
  },
  addFollow: function (e) {
    console.log(e.currentTarget.dataset.id);
    var value = wx.getStorageSync('followed');
    if (!value) {
      value = [];
      value.push(e.currentTarget.dataset.id);
      wx.setStorageSync('followed', value);
      console.log("第一次创建缓存并添加")
      // 弹窗提示
      wx.showToast({
        title: '关注成功',
        icon: 'success',
        duration: 2000,
        mask: true
      })
    } else {
      if (value.indexOf(e.currentTarget.dataset.id) == -1) {
        value.push(e.currentTarget.dataset.id);
        wx.setStorageSync('followed', value);
        console.log("添加了" + e.currentTarget.dataset.id);
        // 弹窗提示
        wx.showToast({
          title: '关注成功',
          icon: 'success',
          duration: 2000,
          mask: true
        })
      }else{
        // 之前已经关注过该课程提示
        wx.showToast({
          title: '已关注',
          icon: 'success',
          duration: 2000,
          mask: true
        })
      }
    }
    console.log( wx.getStorageSync('followed'))

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    util.cir_stopdraw(cav_obj)
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    util.isbgmPaused(bgm, this);
    util.alreadyPlayed(this);
    util.getDuration(bgm, this)
    util.watchPause(bgm, this)
    util.watchPlay(bgm, this)
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    console.log("course页面隐藏")
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