// pages/book/book.js
import {BookModel} from '../../models/book.js'
import {Random} from '../../util/common.js'
let BookM = new BookModel()
Page({
  data: {
    books:[],
    searching: false,
    str: ''//默认不需要加载更多js，更新数据
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    BookM.getHotList()
    .then(res=>{
      // console.log(res)
      this.setData({
        books: res
      })
      
    })
    //正确promise调用
    // BookM.getHotList()
    // .then(res=>{
    //   console.log(res,'第一次')
    //   return BookM.getMyBookCount()
    // })
    // .then(res=>{
    //   console.log(res,'第二次')
    //   return BookM.getMyBookCount()
    // })
    // .then(res=>{
    //   console.log(res,'第三次')
    // })
    
    //回调调用
    // const hotList = BookM.getHotList()
    // hotList.then(
    //   res => {
    //     console.log(res)
    //     BookM.getMyBookCount()
    //     .then(
    //       res=>{console.log(res)}
    //     )
    //   } 
    // )
    // const promise = new Promise ((resolve,reject)=>{
    //   wx.getSystemInfo({
    //     success:res=>resolve(res),
    //     fail:error=>reject(error)
    //   })//获取系统信息，异步
    // })
    // promise.then(
    //   res=>console.log(res),
    //   error=>console.log(error)
    // )
  },
  onSearching(event){
    this.setData({
      searching: true
    })
  },
  onCancel(event){
    this.setData({
      searching: false
    })
  },
  onReachBottom(){
    this.setData({
      str: Random(16)//更新数据
      //给一个随机字符串来激活oberver
    })
    // console.log(this.data.str)
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
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})