
const playerData = {
  // 是否第一次打开播放器，打开后，可以显示音乐弹框
  played: false,
  // 背景音乐
  bgm: wx.getBackgroundAudioManager(),
  // 播放暂停按钮状态
  playbtnFlag: false,
  // 播放了多久
  passed_str: "00:00",
  // 变红色的进度条
  bar_width: 0,
  // 滑动按钮的相对位置
  poiLeft: 0

}
const changeplayState = function(){
  
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
// 改变播放和暂停按钮的状态
const changebtnFlag = () =>{
  playerData.playbtnFlag = !playerData.playbtnFlag;
  return playerData.playbtnFlag
}
module.exports = {
  checkScroll,
  changebtnFlag,
  formatTime,
  playerData
}
