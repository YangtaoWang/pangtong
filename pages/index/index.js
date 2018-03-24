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
    showErrorComponent: true,
    music: [{
      postId: 0,
      playing: false,
      title: "乔布斯的魔力演讲",
      music: {
        url: "http://ws.stream.qqmusic.qq.com/C100003507bR0gDKBm.m4a?fromtag=38",
        title: "夜夜夜夜-齐秦",
        coverImg: "http://y.gtimg.cn/music/photo_new/T002R150x150M000001TEc6V0kjpVC.jpg?max_age=2592000"
      }
    }, {
      postId: 1,
      playing: false,
      title:"有效管理你的健康",
      music: {
        currentTime: 0,
        url: "http://od.open.qingting.fm/vod/00/00/0000000000000000000025922518_64.m4a",
        title: "鬼迷心窍-李宗盛",
        coverImg: "http://y.gtimg.cn/music/photo_new/T002R150x150M000002xOmp62kqSic.jpg?max_age=2592000"
      }
    }, {
      postId: 2,
      playing: false,
      title:"怎么健康活到40岁",
      music: {
        currentTime: 0,
        url: "http://ws.stream.qqmusic.qq.com/C100004HLusI2lLjZy.m4a?fromtag=38",
        title: "女儿情-万晓利",
        coverImg: "http://y.gtimg.cn/music/photo_new/T002R150x150M000004Wv5BO30pPc0.jpg?max_age=2592000"
      }
    }, {
      postId: 3,
      playing: false,
      title: "心理学：人的身体入侵大脑",
      music: {
        currentTime: 0,
        url: "http://ws.stream.qqmusic.qq.com/C100002mWVx72p8Ugp.m4a?fromtag=38",
        title: "恋恋风尘-老狼",
        coverImg: "http://y.gtimg.cn/music/photo_new/T002R150x150M000001VaXQX1Z1Imq.jpg?max_age=2592000",
      }
    }],
    coursetitle:"",
    // currentIndex用于判断变背景
    currentIndex: -1,
    // 存放播放音乐的下标
    _currentIndex: -1,
    // 是否触发过关闭
    isStoped: false


  },
  toCourse: function (e) {
    wx.navigateTo({
      url: '../course/course?id=' + e.currentTarget.dataset.id,
    })
  },
  toPlayer: function(){
    var that = this;
    wx.navigateTo({
      url: '../player/player?id=' + that.data._currentIndex,
    })
  },
  // 弹框上面的按钮播放
  playbgm: function () {
    if(!this.data.isStoped){
      bgm.play();
    }else{
      console.log("走了")
      var index = this.data._currentIndex;
      // 为了避免过快点击卡死，可以不加定时器
      setTimeout(()=>{
        bgm.src = this.data.music[index].music.url;
        bgm.startTime = this.data.music[index].music.currentTime;
        bgm.title = this.data.music[index].music.title;
        
      },300)
      
    }
    // 修改按钮指示数据
    this.setData({
      controlShow: true,
      currentIndex: this.data._currentIndex
    })
    
  },
  // // 弹框上面的按钮暂停
  pausebgm: function () {
    bgm.pause();
    // 修改按钮指示数据
    this.setData({
      controlShow: false,
      currentIndex: -1
    })
  },
 
  playorpause:function(e){
    var id = e.target.dataset.id;
    var playing = "music[" + e.target.dataset.id + "].playing";
    // 未播放状态时：第一次点击，且没有播放
    // && this.data.currentIndex == -1 未定判断条件
    if (!this.data.music[id].playing ) {// 第一次播放
      
      bgm.startTime= this.data.music[id].music.currentTime;
      bgm.src = this.data.music[id].music.url;
      bgm.title = this.data.music[id].music.title;

      // 全局开启播放器出现的标记
      util.playerData.played = true;
      console.log(bgm.title)


      this.setData({
        isShow: true,
        [playing]: true,
        currentIndex: id,
        _currentIndex: id,
        coursetitle: this.data.music[id].title
      })
      // util.playerData.conTitle = this.coursetitle;
      console.log(this.data.music[id].playing)

    } else { 
      // 播放状态时,判断是否点击是自己
      // 如果是自己
      if(this.data.currentIndex == id){
        bgm.pause();
        // 修改判断的切换播放的标记
        this.setData({
          currentIndex: -1,
          [playing]: false
        })
        

      }else{
        // 如果点击的是其他按钮
        bgm.src = this.data.music[id].music.url;
        bgm.startTime = this.data.music[id].music.currentTime;
        bgm.title = this.data.music[id].music.title;
        // util.playerData.conTitle = this.coursetitle;
        this.setData({
          [playing]: true,
          currentIndex: id,
          _currentIndex: id,
          coursetitle: this.data.music[id].title
        })

      }
    
    }

  // // 判断
  //   var currentIndex = this.data.currentIndex;
  //   var id = e.target.dataset.id;
  //   console.log("第二次走")
  //   this.setData({
  //     currentIndex: id,
  //     _currentIndex: id,
  //     coursetitle: this.data.music[id].title
  //   })
  //   // obj.music.url !== bgm.src
  //   // 用数据结构里面的playing做标记
  //   var playing = "music[" + e.target.dataset.id + "].playing";
  //   if(!this.data.music[id].playing){// 第一次播放
  //     // bgm.play();
  //     bgm.startTime= this.data.music[id].music.currentTime;
  //     bgm.src = this.data.music[id].music.url;
  //     // bgm.seek(this.data.music[id].music.currentTime)
  //     bgm.title = this.data.music[id].music.title;
     
  //     // 全局开启播放器出现的标记
  //     util.playerData.played = true;
      
  //     this.setData({
  //       [playing]: true
  //     })
  //     console.log(this.data.music[id].playing)
       
  //   } else { //再次点击暂停
  //     this.setData({
  //       currentIndex: -1
  //     })
  //     bgm.pause();
  //     // 修改判断的切换播放的标记
  //     this.setData({
  //       [playing]: false
  //     })
  //   }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 模拟加载不出来的组件
    setTimeout(()=>{
      this.setData({
        showErrorComponent: false
      })
    }, 1000)
  
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
   
    // *******方案一*******
    // 进入时获取上一次点击播放的id，
    var that = this;
    var currentIndex = that.data._currentIndex;
    // 页面加载时，判断然后修改播放状态按钮
    if(bgm.paused){
      // 返回时是暂停
      that.setData({
        controlShow: false,
        currentIndex: -1,
        coursetitle: util.playerData.conTitle,
        duration: util.playerData.time_total_str
      })
    }else{
      // var currentIndex = this.data._currentIndex;
      console.log("走了显示")
      that.setData({
        controlShow: true,
        currentIndex: currentIndex,
        coursetitle: util.playerData.conTitle
      
      })
    }
    // that.setData({
    //   courseTitle: util.playerData.conTitle,
    //   duration: util.playerData.conDuration
    // })

    // 监听暂停事件
    bgm.onPause(function () {
      console.log("启动了暂定");
      // 修改按钮指示数
      that.setData({
        controlShow: false,
        currentIndex: -1
      })
    })

    // 监听播放事件
    bgm.onPlay(function () {
      console.log("启动了播放");
      // 修改按钮指示数据
      // var index = that.data.;
      that.setData({
        controlShow: true,
        currentIndex: that.data._currentIndex
      })
    })
    // 监听更新事件
    bgm.onTimeUpdate(function () {
      console.log("启动了更新");
      var currentIndex = that.data._currentIndex;
      var currentTime = "music[" + currentIndex + "].music.currentTime";
      // console.log(bgm.title)
        // 修改按钮指示数据
        that.setData({
          [currentTime]: bgm.currentTime,
          duration: util.formatTime(bgm.duration)
        })

        util.playerData.passed_str = util.formatTime(bgm.currentTime),
        util.playerData.time_total_str = util.formatTime(bgm.duration),
        util.playerData.poiLeft = ((bgm.currentTime / bgm.duration)) * 265
        
      
    })

    bgm.onEnded(function(){

      that.setData({
        controlShow: false,
        currentIndex: -1
      })

    })

    bgm.onStop(function(){
      // 点击暂停，开始暂停的标记

      console.log(bgm.src)
      that.setData({
        controlShow: false,
        currentIndex: -1,
        isStoped: true
      })

    })
    bgm.onError(function(errCode){
      console.log(errCode)
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

