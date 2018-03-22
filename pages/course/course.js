// pages/course/course.js
// var allplay = require('../../utils/allplay.js');
const util = require('../../utils/util');
const bgm = util.playerData.bgm;
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
  // // 弹框上面的按钮播放
  // playbgm: function () {
  //   bgm.play();
  //   // *****方案一*****
  //   // // 修改util中播放按钮的标志数据，并同步的本地数据
  //   // var res = util.changebtnFlag()
  //   // this.setData({
  //   //   controlShow: res
  //   // })
  //   // ******方案2******
  //   // 修改按钮指示数据
  //   this.setData({
  //     controlShow: true
  //   })
    
  // },
  // // 弹框上面的按钮暂停
  // pausebgm: function () {
  //   bgm.pause();
  //   // 修改util中播放按钮的标志数据，并同步的本地数据
  //   // var res = util.changebtnFlag()
  //   // this.setData({
  //   //   controlShow: res
  //   // })
  //   // ******方案2******
  //   // 修改按钮指示数据
  //   this.setData({
  //     controlShow: false
  //   })
  // },
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
    // var that = this;
    // // 将播放器的played标志，赋值给isShow，用于是否能显示弹窗
    // this.setData({
    //   isShow: util.playerData.played
    // })
    // // *******方案一*******
    // // 页面加载时，用util中数据调整本页面按钮的样式
    // // this.setData({
    // //   controlShow: util.playerData.playbtnFlag
    // // })
    // // *******方案2*******
    // // 页面加载时，判断是否播放状态修改按钮
    // if (bgm.paused) {
    //   this.setData({
    //     controlShow: false
    //   })
    // } else {
    //   this.setData({
    //     controlShow: true
    //   })
    // }
    // // 加载播放内容的总时间
    // var duration = util.formatTime(bgm.duration)
    // this.setData({
    //   duration: duration
    // })

    // // 监听暂停事件
    // bgm.onPause(function () {
    //   console.log("启动了暂定");
    //   // 修改按钮指示数据
    //   that.setData({
    //     controlShow: false
    //   })

    // })
    // // 监听播放事件
    // bgm.onPlay(function () {
    //   console.log("启动了播放");
    //   // 修改按钮指示数据
    //   that.setData({
    //     controlShow: true
    //   })

    // })
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