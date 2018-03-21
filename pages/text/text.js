// pages/text/text.js
const util = require('../../utils/util'),
  bgm = util.playerData.bgm;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 是否音乐弹框显示
    isShow: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
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
    var that = this;
    // 将播放器的played标志，赋值给isShow，用于是否能显示弹窗
    this.setData({
      isShow: util.playerData.played
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
  
  }
})