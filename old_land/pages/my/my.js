import {BookModel} from '../../models/book.js'
import {ClassicModel} from '../../models/classic.js'
let BookM = new BookModel()
let ClassicM = new ClassicModel()

Page({
  data: {
    authorized:false,//切头像
    userInfo: null,
    bookCount:0,
    classics: null
  },
  onLoad: function (options) {
    this.userAuthorized()
    this.getMyBookCount()
    this.getMyFavor()
  },
  getMyBookCount(){
    BookM.getMyBookCount()
    .then(res=>{
      this.setData({
        bookCount: res.count 
      })
    })
  },
  getMyFavor(){
    ClassicM.getMyFavor(res=>{
      // console.log(res)
      this.setData({
        classics:res
      })
    })
  },
  onGetUserInfo(event){
    const userInfo = event.detail.userInfo
    if(userInfo){
      this.setData({
        authorized:true,
        userInfo:userInfo
      })
    }
    
  },
  onShareAppMessage: function () {

  },
  onJumpToAbout(event){
    wx.navigateTo({
      url:'/pages/about/about',
    })
  },
  userAuthorized(){
    //判断用户是否授权
    wx.getSetting({
      success:data=>{
        if(data.authSetting['scope.userInfo']){
          // console.log('授权')
          wx.getUserInfo({
            success:data=>{
              this.setData({
                authorized:true,
                userInfo: data.userInfo
              })
            }
          })
        }else{
          // console.log('未授权')
        }
      }
    })
  },
  getUser(event){
    console.log(event)
  },
  
})