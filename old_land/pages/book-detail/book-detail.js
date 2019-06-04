import {BookModel} from '../../models/book.js'
import {LikeModel} from '../../models/like.js'
let BookM = new BookModel()
let LikeM = new LikeModel()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    detail: null,
    comments: [],
    likeStatus: false,
    likeCount: 0,
    posting:false//是否打开输入框
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading()
    const id = options.bookId
    // console.log(id)
    let detail = BookM.getDetail(id)
    let comments = BookM.getComments(id)
    let likeStatus = BookM.getLikeStatus(id)
    Promise.all([detail,comments,likeStatus])
    //all所有的子promise执行完成后才触发回调函数
    //.race任意一子promise执行完后立马触发回调函数 不会等待，
    //res携带的是竞争成功的回调结果
    .then(res=>{
      // console.log('promise.all',res)
      this.setData({
        detail: res[0],
        comments: res[1].comments ,  
        likeStatus: res[2].like_status,
        likeCount: res[2].fav_nums 
      })
    })
    // BookM.getDetail(id).then(res=>{
    //   console.log(res)
    //   this.setData({
    //     detail: res  
    //   })
    // })
    // BookM.getComments(id).then(res=>{
    //   console.log(res)
    //   this.setData({
    //     comments: res.comments  
    //   })
    // })
    // BookM.getLikeStatus(id).then(res=>{
    //   console.log(res)
    //   this.setData({
    //     likeStatus: res.like_status,
    //     likeCount: res.fav_nums 
    //   })
    // })
    wx.hideLoading()
  },
  onLike:function(event){
    // console.log(event)
    let behavior = event.detail.behavior
    // console.log(behavior)
    LikeM.like(behavior, this.data.detail.id, 400)
  },
  onFakePost(event){
    this.setData({
      posting: true
    })
  },
  onCancel(event){
    this.setData({
      posting: false
    })
  },
  onPost(event){
    //传来tapping事件或者是input事件
    const comment = event.detail.text || event.detail.value
    // console.log(comment)
    if(!comment){return}
    if(comment.length>12){
      wx.showToast({
        title: '短评最多输入12个字',
        icon:'none'
      })
      return
    }
    BookM.postComment(this.data.detail.id,comment)
    .then(res=>{
      wx.showToast({
        title: '+1',
        icon:'none'
      })
      this.data.comments.unshift({
        content: comment,
        nums: 1
      })
      this.setData({
        comments: this.data.comments,
        posting: false
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

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})