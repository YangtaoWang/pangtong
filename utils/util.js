
const playerData = {
  // 是否第一次打开播放器，打开后，可以显示音乐弹框
  played: false,
  // 背景音乐
  bgm: wx.getBackgroundAudioManager(),
  // 播放暂停按钮状态
  playbtnFlag: false,
  // 一下用于再次进入播放器页面更新页面数据
  // 播放了多久
  passed_str: "00:00",
  durationTime: "00:00",
  // 变红色的进度条
  bar_width: 0,
  // 滑动按钮的相对位置
  poiLeft: 0,
  // 是否手动关闭了后台音乐
  selfStop: false,
  // 以下三条是为了关闭播放器保存播放器当时的数据，以便于重新开启同一音乐，同一位置
  currentTime: "",
  duration:"",
  dataUrl:"" 
}


// 格式化时间
const formatTime = function (seconds) {
    return [
      parseInt(seconds / 60 % 60),
      parseInt(seconds % 60)
    ]
      .join(":")
      .replace(/\b(\d)\b/g, "0$1");
}

// 判断滑动高度，触发音乐弹窗是否隐藏
const checkScroll = (e, that) =>{
  
  if(playerData.played){
    if (e.scrollTop > that.data.scroll) {
      that.setData({
        isShow: false
      })
    } else {
      that.setData({
        isShow: true
      })
    }
  }
  
  that.setData({
    scroll: e.scrollTop
  })
}

// 播放器弹出框点击播放
const playbgm = function(bgm, _this){
  // 加入是关闭播放器后开启的播放为：
  if(playerData.selfStop){
    console.log("houtrue")
    console.log(playerData)
    wx.playBackgroundAudio({
      dataUrl: playerData.dataUrl,
      title: '鬼迷心窍',
    });
    // wx.seekBackgroundAudio({
    //   position: playerData.currentTime,
    // })
  }else{
    // 直接播放
    wx.playBackgroundAudio({
      dataUrl: 'http://ws.stream.qqmusic.qq.com/C100003507bR0gDKBm.m4a?fromtag=38',
      title: '鬼迷心窍'
    });
  }
    
  // 修改按钮指示数据
  _this.setData({
    controlShow: true
  });
  drawCanvas(cavData.cxt_arc)

}
// 播放器弹出框点击暂停
const pausebgm = function(bgm, _this){
  bgm.pause();
  // 修改按钮指示数据
  _this.setData({
    controlShow: false
  })
  stopCanvas();

}

// 页面加载时，判断是否播放状态修改按钮样式
const isbgmPaused = (bgm, _this)=>{
  if (bgm.paused) {
    _this.setData({
      controlShow: false
    })
  } else {
    _this.setData({
      controlShow: true
    })
  }
}

// 页面加载时，将播放器的played过一次的标志，赋值给isShow，用于是否能显示弹窗
const alreadyPlayed = (_this)=>{
  _this.setData({
    isShow: playerData.played
  })
} 

// 页面加载时，加载播放内容的总时间
const getDuration = (bgm, _this)=>
{
  var duration = formatTime(bgm.duration);
  // 如果没有获取到bgm.duration就默认是"00:00"
  if (duration == "NaN:NaN") {
    _this.setData({
      duration: "00:00"
    })
  } else {
    // 有值的话，正常赋值
    _this.setData({
      duration: duration
    })
  }
} 
const watchPause = (bgm, _this)=> {
  // 监听暂停事件
  bgm.onPause(function () {
    console.log("启动了暂定");
    // 修改按钮指示数据
    _this.setData({
      controlShow: false
    })
    stopCanvas();
  })
  

}

const watchPlay = (bgm, _this)=> {
  // 监听播放事件
  bgm.onPlay(function () {
    console.log("启动了播放");
    // 修改按钮指示数据
    _this.setData({
      controlShow: true
    })
    drawCanvas(cavData.cxt_arc)
  })

}

const watchEnd= function(bgm, _this){
  bgm.onEnded(()=> {
    _this.setData({
      controlShow: false
    })
  })
  console.log("end")
}

// 实时监听事件，设置埋点，以及将页面data实时更新的数据同步到util中共用数据
const onTime = function (bgm, that){
  bgm.onTimeUpdate(function () {
    console.log("触发了onTime")
    that.setData({
      passed_str: formatTime(bgm.currentTime),
      time_total_str: formatTime(bgm.duration),
      poiLeft: ((bgm.currentTime / bgm.duration)) * 265,
      bar_width: ((bgm.currentTime / bgm.duration)) * 265,
      passed_dis: ((bgm.currentTime / bgm.duration)) * 265
    });
   
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
    playerData.passed_str = that.data.passed_str;
    playerData.bar_width = that.data.bar_width;
    playerData.poiLeft = that.data.poiLeft;
    playerData.durationTime = that.data.time_total_str,
    playerData.currentTime = bgm.currentTime;
    playerData.duration = bgm.duration;
    playerData.dataUrl = bgm.src;

    // 测试使用

    

  });
}


// ********canvas的数据和方法*********
// 绘制进度条数据
const cavData = {
  start: -.5,
  timer: "",
  speed: 2 / 257,
  cxt_arc: wx.createCanvasContext('canvasArc')
}

// 画一圈停止时，重绘一个灰色的圆,以及初始化的时候画圆
const cir_stopdraw = function (obj) {
  obj.setLineWidth(2);
  obj.setStrokeStyle('#d2d2d2');
  obj.setLineCap('round')
  obj.beginPath();//开始一个新的路径 
  obj.arc(15, 15, 13, 0, 2 * Math.PI, false);
  //设置一个原点(106,106)，半径为100的圆的路径到当前路径 
  obj.stroke();
  obj.draw();
}

// 画圆的动画效果
const cir_update = function (cxt_arc) {

  cavData.start += cavData.speed;
  cxt_arc.setLineWidth(2);
  cxt_arc.setStrokeStyle('#d2d2d2');
  cxt_arc.setLineCap('round')
  cxt_arc.beginPath();//开始一个新的路径 
  cxt_arc.arc(15, 15, 13, 0, 2 * Math.PI, false);
  //设置一个原点(106,106)，半径为100的圆的路径到当前路径 
  cxt_arc.stroke();
  //对当前路径进行描边 
  cxt_arc.setLineWidth(2);
  cxt_arc.setStrokeStyle('#ee4a47');
  cxt_arc.setLineCap('round')
  cxt_arc.beginPath();//开始一个新的路径 
  cxt_arc.arc(15, 15, 13, -Math.PI * 1 / 2, Math.PI * cavData.start, false);
  cxt_arc.stroke();//对当前路径进行描边 
  cxt_arc.draw();
  console.log("画着呢" + cavData.start);
  if (cavData.start > 1.5) {
    clearInterval(cavData.timer)
    cavData.start = -.5;
    console.log("停止了")
    // 停止的话画一幅
    cir_stopdraw(cxt_arc);
  }
  cxt_arc.clearRect(0, 0, 212, 212);

}

//  开启画圆动画
const drawCanvas = function (obj) {
  clearInterval(cavData.timer)
  cavData.timer = setInterval(() => {
    cir_update(obj);
  }, 1000);
}

// 结束画圆动画
const stopCanvas = function () {
  clearInterval(cavData.timer);

}






module.exports = {
  playerData,
  checkScroll,
  formatTime,
  playbgm,
  pausebgm,
  isbgmPaused,
  alreadyPlayed,
  getDuration,
  watchPause,
  watchPlay,
  watchEnd,
  onTime,
  cavData,
  drawCanvas,
  stopCanvas,
  cir_stopdraw,
  cir_update

}
