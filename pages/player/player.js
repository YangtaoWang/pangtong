// pages/player/player.js
const util = require('../../utils/util'),
      bgm = util.playerData.bgm;
      // playbtnFlag = util.playerData.playbtnFlag;

// 定义滑动的差值
var y=0;
Page({
  /**
   * 页
   */
  data: {
    // 播放和暂停按钮标志
    controlShow: true,
    titleArr: ["怎么健康活到100岁", "怎么健康活到101岁", "怎么健康活到102岁", '乔布斯的魔力演讲', '有效管理你的健康', '怎么健康活到104岁', '心理学： 人的身体入侵了大脑'],
    // 移动后维护的数据
    touches:{},
    // 音频总时间
    time_total_str: "00:00",
    // 已经播放时间
    passed_str: "00:00",
    // 播放过进度条颜色
    bar_width: 0,
    // 暂停状态
    pause: true,
    // 进度条按钮绝对定位
    poiLeft: 0,
    // 按钮移动位置加上之前的绝对定位
    point: 0,
    // 每次移动后累加的移动值
    passed_end:0,
    // 音乐播放时走过的距离
    passed_dis:0,
    // 埋点数据发送标识
    sendFlag1:true,
    sendFlag2:true,
    sendFlag3:true,
    sendFlag4:true,
    // 列表滑动起点
    startTouch:0,
    // 最上面往上滑动的距离，起始值30
    top:30,
    // 课程列表滑动了
    move:0,
    // 三按钮吸顶标志
    fixedFlag:false,
    // 课程列表的起始高度
    listHeight:250,
    // 课程列表渲染的个数
    listCount:12,
    // 页面上下滑动了多少
    scroll:0,
    checkHeight:309

  },
  toText: function () {
    wx.navigateTo({
      url: '../../images/text/text'
    })
  },
  stop: function () {
    util.pausebgm(bgm, this)
   
  },
  // 播放音乐的方法
  play: function () {

    util.playbgm(bgm, this)

    
    // wx.playBackgroundAudio({
    //   dataUrl: 'http://ws.stream.qqmusic.qq.com/C100003507bR0gDKBm.m4a?fromtag=38',
    //   title: '鬼迷心窍'
    // });
    // // 播放的同时更新数据



  },
  mytouchstart: function (e) {
    console.log(e.touches[0].pageX)
    this.setData({
      touches: {
        // 触控时的起点位置
        startPos: e.touches[0].pageX,
        // 每次滑动初始化滑动值为0
        move: 0,
        // 滑动前的绝对位置存起来
        left: this.data.poiLeft,
        // 滑动前的进度条背景长度存起来
        bar: this.data.bar_width
      }
    })
    // console.log("startPos:" + e.touches[0].pageX)
  },
  mytouchmove: function (e) {
    var touches = this.data.touches;
    // 在滑动的过程中修改move的值
    touches.move = e.touches[0].pageX - touches.startPos;
    console.log("绝对定位"+this.data.poiLeft);
    // 播放状态时 音频走过的距离加上移动的距离需要大于0小于265
    var totalDis = this.data.passed_dis + this.data.touches.move;
    // 非播放状态 累加的距离需要大于0小于265
    var totalBet = this.data.passed_end + this.data.touches.move;
    if (!bgm.src){
      console.log(totalBet);
      if (!this.check(totalBet)){ return };
      
    }else{
      console.log(totalDis);
      if (!this.check(totalDis)) { return } 
      // return掉之后后面的就不会执行了
    }  
    // 每次移动的时候修改数据
    this.setData({
      touches: touches,
      // 按钮的绝对定位
      poiLeft: this.data.touches.move + this.data.touches.left,
      bar_width: this.data.touches.move + this.data.touches.bar,
      // 按钮移动位置加上之前的绝对定位
      point: this.data.poiLeft
    })
      
  },
  // 封装用于判断是否超出
  check: function (params) {
    if (params < 0 ) {
      this.setData({
        poiLeft: 0,
        bar_width: 0
      })
      return false;
    } else if (params > 265) {
      this.setData({
        poiLeft: 265,
        bar_width: 265
      })
      return false;
    }else{
      return true
    }
  }
  ,
  mytouchend: function(){
    this.setData({
      passed_end: this.data.touches.move + this.data.passed_end
    })
    if(bgm.paused){
      bgm.play();
      this.setData({
        controlShow: true
      })
    }
    // 移动结束时用按钮移动位置加上之前的绝对定位也就是point，获取需要设置的时间
    var position = Math.floor((this.data.point) / 265 * bgm.duration);  
   // console.log(position)
    
    bgm.seek(position);
      

  },

  /**
   * 生命周期函数--监听页面加载
   */

  onLoad: function (options) {
    
    var that = this;
    
    wx.setNavigationBarTitle({
      title: that.data.titleArr[options.id]
    });
    // 首次进入
    if (bgm.src !== "http://ws.stream.qqmusic.qq.com/C100003507bR0gDKBm.m4a?fromtag=38") {
      
      util.playbgm(bgm, that);
      // 播放标记词played改为true,用于是否显示底部播放器弹窗
      util.playerData.played = true;
    }
    // 方案1页面加载时，用util中数据调整本页面按钮的样式
    
      that.setData({
        passed_str: util.playerData.passed_str,
        bar_width: util.playerData.bar_width,
        poiLeft: util.playerData.poiLeft,
        time_total_str: util.playerData.durationTime

      })
    
    // if (util.playerData.played) {
    //   that.setData({
    //     passed_str: util.formatTime(bgm.currentTime),
    //     time_total_str: util.formatTime(bgm.duration),
    //     poiLeft: ((bgm.currentTime / bgm.duration)) * 265,
    //     bar_width: ((bgm.currentTime / bgm.duration)) * 265
    //   })
    // }
    


    

    util.isbgmPaused(bgm, this);
    util.watchPause(bgm, this)
    util.watchPlay(bgm, this)
    // 监听音乐自然结束的事件
    // util.watchEnd(bgm, this)
   
   
      bgm.onEnded(function () {
        that.setData({
          controlShow: false
        })
      })
    
    
    // 实时监听
    util.onTime(bgm, this)
    // 监听音乐手动停止的事件
    bgm.onStop(function(){
      console.log("stop")
      // 修改是否手动关闭播放器标志
      util.playerData.selfStop= true;
      // 将之前同步到的播放器数据再次放到一个专用于再次播放的数据结构中
      // util.playerData.stopData.dataUrl = util.playerData.dataUrl;
      // util.playerData.stopData.currentTime = util.playerData.currentTime;
      // util.playerData.stopData.duration = util.playerData.duration;
      // console.log(util.playerData.stopData)
      // 同时修改播放按钮标记
      that.setData({
        controlShow: false
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
    console.log("playeronshow")
    var that = this;
    wx.getSystemInfo({
      success: function (res) {
        console.log(res)
        var per = res.screenWidth / 375;
        that.setData({
          checkHeight: 309 * per
        })
      }
    });
    


    
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    console.log("走过了"+this.data.passed_str)
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    console.log("走过了" + this.data.passed_str)
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
    console.log(e.scrollTop)
    console.log(this.data.checkHeight)
    if(e.scrollTop> this.data.checkHeight){
      this.setData({
        fixedFlag: true
      })
    }else{
      this.setData({
        fixedFlag: false
      })
    }

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