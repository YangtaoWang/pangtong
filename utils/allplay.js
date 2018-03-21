const bgm = wx.getBackgroundAudioManager();
const stop = () => {
  // 暂停音乐
  bgm.pause();
}
// 播放音乐的方法
const play =  (_this) => {
    var that = _this;
    wx.playBackgroundAudio({
      dataUrl: 'http://ws.stream.qqmusic.qq.com/C100003507bR0gDKBm.m4a?fromtag=38',
      title: '鬼迷心窍'
    });


  }
const mytouchstart =  (e) => {
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
}
const mytouchmove = (e) => {
  var touches = this.data.touches;
  // 在滑动的过程中修改move的值
  touches.move = e.touches[0].pageX - touches.startPos;
  console.log("绝对定位" + this.data.poiLeft);
  // 播放状态时 音频走过的距离加上移动的距离需要大于0小于265
  var totalDis = this.data.passed_dis + this.data.touches.move;
  // 非播放状态 累加的距离需要大于0小于265
  var totalBet = this.data.passed_end + this.data.touches.move;
  if (!bgm.src) {
    console.log(totalBet);
    if (!this.check(totalBet)) { return };

  } else {
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
}
// 封装用于判断是否超出
const check =  (params) => {
  if (params < 0) {
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
  } else {
    return true
  }
}
const mytouchend = ()=> {
  this.setData({
    passed_end: this.data.touches.move + this.data.passed_end
  })
  if (bgm.paused) {
    bgm.play();
    // this.play();
  }
  // 移动结束时用按钮移动位置加上之前的绝对定位也就是point，获取需要设置的时间
  var position = Math.floor((this.data.point) / 265 * bgm.duration);

  // console.log(position)
  bgm.seek(position);
}

// 格式化时间
const formatTime = (seconds) => {
  return [
    parseInt(seconds / 60 % 60),
    parseInt(seconds % 60)
  ]
    .join(":")
    .replace(/\b(\d)\b/g, "0$1");
}
const playerData = {
  played: false,
  controlShow: true,
  touches: {},
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
  passed_end: 0,
  // 音乐播放时走过的距离
  passed_dis: 0,
  // 埋点数据发送标识
  sendFlag1: true,
  sendFlag2: true,
  sendFlag3: true,
  sendFlag4: true
}

module.exports = {
  bgm,
  playerData,
  play,
  stop,
  mytouchstart,
  mytouchmove,
  mytouchend,
  check,
  formatTime  
}