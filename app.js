//app.js
const util = require('utils/util'),
  bgm = util.playerData.bgm;
App({
  onLaunch: function () {

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        console.log("code码"+res.code)
      }
    })
    // 获取用户信息
    wx.getSetting({
      success(res) {
        // 打印用户已经授权的信息
        console.log(res.authSetting)
        // 如果用户没有设置的userInfo可用
        if (!res.authSetting['scope.userInfo']) {
          // ，则向用户发起授权请求
          wx.authorize({
            scope: 'scope.userInfo',
            success() {
              // 用户已经同意小程序使用用户信息，          
              console.log("授权成功");
              // 查看用户授权的的个人信息
              wx.getUserInfo({
                success: res => {
                  // 可以将 res 发送给后台解码出 unionId
                  console.log(res.userInfo)
                  // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
                  // 所以此处加入 callback 以防止这种情况
                  // if (this.userInfoReadyCallback) {
                  //   this.userInfoReadyCallback(res)
                  // }
                }
              })
            }
          })
        }else{
          // 如果用户已经授权个人信息，则打印出来
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              console.log(res.userInfo)
            }
          })
        }
      }
    })
  },
  onHide: function(){
    console.log("后台")
  },
  globalData: {
    // bgm: wx.getBackgroundAudioManager(),
    // 是否弹出底部播放器弹窗
    // palyed: false
  },
  globalFunc:{

  }
})