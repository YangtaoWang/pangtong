
// pages/player/player.js
const util = require('../../utils/util'),
  bgm = util.playerData.bgm;
      

// 定义滑动的差值
var y=0;
Page({
  /*** 页*/
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
    checkHeight:309,
    music: [{
      postId: 0,
      playing: 0,
      title: "乔布斯的魔力演讲",
      music: {
        url: "http://ws.stream.qqmusic.qq.com/C100003507bR0gDKBm.m4a?fromtag=38",
        title: "夜夜夜夜-齐秦",
        coverImg: "http://y.gtimg.cn/music/photo_new/T002R150x150M000001TEc6V0kjpVC.jpg?max_age=2592000"
      }
    }, {
      postId: 1,
      playing: 0,
      title: "有效管理你的健康",
      music: {
        url: "http://ws.stream.qqmusic.qq.com/C100003GdCmG4NkEOR.m4a?fromtag=38",
        title: "鬼迷心窍-李宗盛",
        coverImg: "http://y.gtimg.cn/music/photo_new/T002R150x150M000002xOmp62kqSic.jpg?max_age=2592000"
      }
    }, {
      postId: 2,
      playing: 0,
      title: "怎么健康活到40岁",
      music: {
        url: "http://ws.stream.qqmusic.qq.com/C100004HLusI2lLjZy.m4a?fromtag=38",
        title: "女儿情-万晓利",
        coverImg: "http://y.gtimg.cn/music/photo_new/T002R150x150M000004Wv5BO30pPc0.jpg?max_age=2592000"
      }
    }, {
      postId: 3,
      playing: 0,
      title: "心理学：人的身体入侵大脑",
      music: {
        url: "http://ws.stream.qqmusic.qq.com/C100002mWVx72p8Ugp.m4a?fromtag=38",
        title: "恋恋风尘-老狼",
        coverImg: "http://y.gtimg.cn/music/photo_new/T002R150x150M000001VaXQX1Z1Imq.jpg?max_age=2592000",
      }
    }],
    isSlider: false

  },
  toText: function () {
    wx.navigateTo({
      url: '../../images/text/text'
    })
  },
  stop: function () {
    // 暂停音乐
    bgm.pause();
    this.setData({
      controlShow: false
    })
  },
  // 播放音乐的方法
  play: function () {
    bgm.play();
    this.setData({
      controlShow: true
    })

    // var that = this;
    // wx.playBackgroundAudio({
    //   dataUrl: 'http://ws.stream.qqmusic.qq.com/C100003507bR0gDKBm.m4a?fromtag=38',
    //   title: '鬼迷心窍'
    // });
    // 播放的同时更新数据
    // bgm.onTimeUpdate(function () {
    //     that.setData({
    //       passed_str: that.formatTime(bgm.currentTime),
    //       time_total_str: that.formatTime(bgm.duration),
    //       poiLeft: ((bgm.currentTime / bgm.duration) )*265,
    //       bar_width: ((bgm.currentTime / bgm.duration)) *265,
    //       passed_dis: ((bgm.currentTime / bgm.duration)) * 265
    //     });
    //     // console.log(bgm.currentTime)
    //     var per = (bgm.currentTime/bgm.duration).toFixed(2);

    //     console.log(per);
    //     if(per == 0.25&&that.data.sendFlag1){
    //       console.log("发送0.25");
    //       that.setData({
    //         sendFlag1: false
    //       })
    //     }
    //     if(per==0.50&&that.data.sendFlag2){
    //       console.log("发送0.50")
    //       that.setData({
    //         sendFlag2: false
    //       })
    //     }
    //     if (per == 0.75 &&that.data.sendFlag3){
    //       console.log("发送0.75");
    //       that.setData({
    //         sendFlag3: false
    //       })
    //     }
    //     if(per==1.00&& that.data.sendFlag4){
    //       console.log("发送完成1.0");
    //       that.setData({
    //         sendFlag4: false
    //       })
    //     }
           
    // });


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
      },
      isSlider:true
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
      passed_end: this.data.touches.move + this.data.passed_end,
      isSlider: false
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

  // 格式化时间
  formatTime: function (seconds) {
    return [
      parseInt(seconds / 60 % 60),
      parseInt(seconds % 60)
    ]
      .join(":")
      .replace(/\b(\d)\b/g, "0$1");
  }
  ,
  /**
   * 生命周期函数--监听页面加载
   */

  onLoad: function (options) {

    console.log("playeronload")
    var that = this;
    
    wx.setNavigationBarTitle({
      title: that.data.music[options.id].title
    });
    
    // 页面加载时，判断是否播放状态修改按钮
    //页面加载时，如果是暂停状态，用util中数据调整本页面按钮的样式
    if (bgm.paused) {
      that.setData({
        passed_str: util.playerData.passed_str,
        bar_width: util.playerData.bar_width,
        poiLeft: util.playerData.poiLeft,
        controlShow: false
      })
    } else {
      that.setData({
        controlShow: true
      })
    }
    // 监听暂停事件
    bgm.onPause(function(){
      console.log("启动了暂定");
      // 修改按钮指示数据
      that.setData({
        controlShow: false
      })

    })
    // 监听播放事件
    bgm.onPlay(function(){
      console.log("启动了播放");
      // 修改按钮指示数据
      that.setData({
        controlShow: true
      })
    })
    bgm.onStop(function () {
      console.log("启动了手动停止");
      // 修改按钮指示数据
      that.setData({
        controlShow: false
      })
    })
    bgm.onEnded(function(){
      that.setData({
        controlShow: false
      })
    })


    bgm.onTimeUpdate(function () {
      if(!that.data.isSlider){
        that.setData({
          passed_str: that.formatTime(bgm.currentTime),
          time_total_str: that.formatTime(bgm.duration),
          poiLeft: ((bgm.currentTime / bgm.duration)) * 265,
          bar_width: ((bgm.currentTime / bgm.duration)) * 265,
          passed_dis: ((bgm.currentTime / bgm.duration)) * 265
        });
      }
      
      // console.log(bgm.currentTime)
      // 埋点数据
      var per = (bgm.currentTime / bgm.duration).toFixed(2);
      console.log(per);
      if (per == 0.25 && that.data.sendFlag1) {
        console.log("发送0.25");
        that.setData({
          sendFlag1: false
        })
      }
      if (per == 0.50 && that.data.sendFlag2) {
        console.log("发送0.50")
        that.setData({
          sendFlag2: false
        })
      }
      if (per == 0.75 && that.data.sendFlag3) {
        console.log("发送0.75");
        that.setData({
          sendFlag3: false
        })
      }
      if (per == 1.00 && that.data.sendFlag4) {
        console.log("发送完成1.0");
        that.setData({
          sendFlag4: false
        })
      }

      // 更新util中相对应的公共数据
      util.playerData.passed_str = that.data.passed_str;
      util.playerData.bar_width = that.data.bar_width;
      util.playerData.poiLeft = that.data.poiLeft;

    });

    bgm.onError(function(errCode){
      console.log(errCode)
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
    // 适配上滑到哪里fixed吸顶
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