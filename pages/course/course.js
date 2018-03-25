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
    height: 488,
    heightFlag: true,
    // 控制弹框是否显示
    isShow: false,
    // 控制弹窗上面的按钮改变
    controlShow: true,
    duration: "00:00",
    music: [{
      postId: 0,
      playing: false,
      title: "乔布斯的魔力演讲",
      music: {
        duartion:"04:46",
        currentTime: 0,
        url: "http://ws.stream.qqmusic.qq.com/C100003507bR0gDKBm.m4a?fromtag=38",
        title: "夜夜夜夜-齐秦",
        coverImg: "http://y.gtimg.cn/music/photo_new/T002R150x150M000001TEc6V0kjpVC.jpg?max_age=2592000"
      }
    }, {
      postId: 1,
      playing: false,
      title: "有效管理你的健康",
      music: {
        // 要真实数据
        duration: 0,
        currentTime: 0,
        url: "http://od.open.qingting.fm/vod/00/00/0000000000000000000025922518_64.m4a",
        title: "鬼迷心窍-李宗盛",
        coverImg: "http://y.gtimg.cn/music/photo_new/T002R150x150M000002xOmp62kqSic.jpg?max_age=2592000"
      }
    }, {
      postId: 2,
      playing: false,
      title: "怎么健康活到40岁",
      music: {
        duration: 0,
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
        duration: 0,
        currentTime: 0,
        url: "http://ws.stream.qqmusic.qq.com/C100002mWVx72p8Ugp.m4a?fromtag=38",
        title: "恋恋风尘-老狼",
        coverImg: "http://y.gtimg.cn/music/photo_new/T002R150x150M000001VaXQX1Z1Imq.jpg?max_age=2592000",
      }
    }, {
      postId: 4,
      playing: false,
      title: "广播电视基础课程1",
      music: {
        duration: 0,
        currentTime: 0,
        url: "http://image.kaolafm.net/mz/audios/201803/e87b841f-6483-458d-9c37-204a61b5271b.mp3",
        title: "无怨无悔",
        coverImg: "http://y.gtimg.cn/music/photo_new/T002R150x150M000001VaXQX1Z1Imq.jpg?max_age=2592000",
      }
    }, {
      postId: 5,
      playing: false,
      title: "广播电视基础课程2",
      music: {
        duration: 0,
        duration: 0,
        currentTime: 0,
        url: "http://image.kaolafm.net/mz/audios/201803/739aee86-5e9d-4755-a439-9400aa1cedaa.mp3",
        title: "无怨无悔",
        coverImg: "http://y.gtimg.cn/music/photo_new/T002R150x150M000001VaXQX1Z1Imq.jpg?max_age=2592000",
      }
    }, {
      postId: 6,
      playing: false,
      title: "广播电视基础课程3",
      music: {
        duration: 0,
        currentTime: 0,
        url: "http://image.kaolafm.net/mz/audios/201803/ab8e5f95-7a7c-4205-bd40-92ac9ad24050.mp3",
        title: "无怨无悔",
        coverImg: "http://y.gtimg.cn/music/photo_new/T002R150x150M000001VaXQX1Z1Imq.jpg?max_age=2592000",
      }
    }, {
      postId: 7,
      playing: false,
      title: "广播电视基础课程4",
      music: {
        duration: 0,
        currentTime: 0,
        url: "http://image.kaolafm.net/mz/audios/201803/e87b841f-6483-458d-9c37-204a61b5271b.mp3",
        title: "无怨无悔",
        coverImg: "http://y.gtimg.cn/music/photo_new/T002R150x150M000001VaXQX1Z1Imq.jpg?max_age=2592000",
      }
    }],
    coursetitle: "",
    // currentIndex用于判断变背景
    currentIndex: 0,
    // 储存播放时的下标
    _currentIndex: 0,
    // 是否触发过关闭
    isStoped: false
  },
  // 展开课程列表高度
  open: function (){
    // this.setData({
    //   down: !this.data.down
    // })
    // 这个变化的高度应该是根据数据动态变化的
    if(this.data.heightFlag){
      this.setData({
        height: 980,
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
    var that = this;
    // 将播放器的played标志，赋值给isShow，用于是否能显示弹窗
    this.setData({
      isShow: util.playerData.played
    })
    // *******方案一*******
    // 页面加载时，用util中数据调整本页面按钮的样式
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

    // 监听暂停事件
    bgm.onPause(function () {
      console.log("启动了暂定");
      // 修改按钮指示数据
      that.setData({
        controlShow: false,
        currentIndex: -1
      })

    })
    // 监听播放事件
    bgm.onPlay(function () {
      console.log("启动了播放");
      // 修改按钮指示数据
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
      var duration = "music[" + currentIndex + "].music.duration";
      // console.log(bgm.title)
      // 修改按钮指示数据
      that.setData({
        [currentTime]: bgm.currentTime,
        [duration]: bgm.duration,
        duration: util.formatTime(bgm.duration)
      })


      util.playerData.passed_str = util.formatTime(bgm.currentTime),
        util.playerData.time_total_str = util.formatTime(bgm.duration),
        util.playerData.poiLeft = ((bgm.currentTime / bgm.duration)) * 265


    })

    bgm.onEnded(() => {

      var index = this.data._currentIndex;
      if (index < this.data.music.length - 1) {

        bgm.src = this.data.music[index + 1].music.url;
        bgm.startTime = this.data.music[index + 1].music.currentTime;
        bgm.title = this.data.music[index + 1].music.title;

        this.setData({
          _currentIndex: index + 1,
          currentIndex: index + 1
        })
      }

    })

    bgm.onStop(function () {
      // 点击暂停，开始暂停的标记

      console.log(bgm.src)
      that.setData({
        controlShow: false,
        currentIndex: -1,
        isStoped: true
      })

    })

    bgm.onPrev(() => {
      var index = this.data._currentIndex;
      if (index > 0) {
        bgm.src = this.data.music[index - 1].music.url;
        bgm.startTime = this.data.music[index - 1].music.currentTime;
        bgm.title = this.data.music[index - 1].music.title;
        util.playerData.conTitle = this.data.music[index - 1].title;
        util.playerData.playingId = index - 1;


        this.setData({
          _currentIndex: index - 1,
          currentIndex: index - 1
        })
      }

    })



    bgm.onNext(() => {

      var index = this.data._currentIndex;
      if (index < this.data.music.length - 1) {
        bgm.src = this.data.music[index + 1].music.url;
        bgm.startTime = this.data.music[index + 1].music.currentTime;
        bgm.title = this.data.music[index + 1].music.title;
        util.playerData.conTitle = this.data.music[index + 1].title;
        util.playerData.playingId = index + 1;

        this.setData({
          _currentIndex: index + 1,
          currentIndex: index + 1
        })
      }

    })


    
   
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
  clickPlay: function (e) {
    var id = e.currentTarget.dataset.id;
    
    if (bgm.src !== this.data.music[id].music.url) {
      bgm.src = this.data.music[id].music.url;
      // 加一层判断条件，等于duration的话，重新归零,否则播放完成后，再点击不能播放了
      if (this.data.music[id].music.duration == this.data.music[id].music.currentTime){
        bgm.startTime = 0
      }else{
        bgm.startTime = this.data.music[id].music.currentTime;
      } 
      bgm.title = this.data.music[id].title;
      // 全局开启播放器出现的标记
      util.playerData.played = true;
      // 存储音乐的title,返回其他页面时，同步标题
      util.playerData.conTitle = this.data.music[id].title;
      // 用于判断播放id,进入本页面时，标红显示
      util.playerData.playingId = id;

      this.setData({
        isShow: true,
        currentIndex: id,
        _currentIndex: id,
        coursetitle: this.data.music[id].title
      })
    }

  },
  // 弹框上面的按钮播放
  playbgm: function () {
    if (!this.data.isStoped) {
      bgm.play();
    } else {
      console.log("走了")
      var index = this.data._currentIndex;
      // 为了避免过快点击卡死，可以不加定时器
      setTimeout(() => {
        bgm.src = this.data.music[index].music.url;
        bgm.startTime = this.data.music[index].music.currentTime;
        bgm.title = this.data.music[index].title;
        util.playerData.conTitle = this.data.music[id].title;

      }, 300)

    }
    // 修改按钮指示数据
    this.setData({
      controlShow: true,
      currentIndex: this.data._currentIndex
    })
    
  },
  // 弹框上面的按钮暂停
  pausebgm: function () {
    bgm.pause();
    // ******方案2******
    // 修改按钮指示数据
    this.setData({
      controlShow: false,
      currentIndex: -1
    })
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