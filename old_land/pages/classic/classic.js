// pages/classic/classic.js
import {ClassicModel} from '../../models/classic.js'
import {LikeModel} from '../../models/like.js'

let ClassicM = new ClassicModel()//实例化
let LikeM = new LikeModel()
Page({
  data: {
    classicData: null,
    latest:true,
    first:false,
    likeCount: 0,//被绑定的变量
    likeStatus: false//喜欢的状态默认不喜欢
  },
  onLoad: function (options) {
    //此处加载的是最新一期的期刊
    //使用小程序的缓存保存第一期的期刊
    ClassicM.getLatest((res)=>{
      // this._getLikeStatus(res.id,res.type)
      // 此时多发一次请求重复数据
      // console.log(res)
      this.setData({  
        // ...res  
        classicData: res,
        likeCount: res.fav_nums,
        likeStatus: res.like_status
      })
    })

    // http.request({
    //   url: 'classic/latest',
    //   success:(res)=>{
    //     console.log(res)
    //   }
    // })
    // let that = this//此处this指向data中的数据，es5方法
    // wx.request({
    //   url:"http://bl.7yue.pro/v1/classic/latest",
    //   header:{
    //     appkey:"exhOTMWcv3c2MRX5"
    //   },
    //   success:(res)=>{//异步数据接收处
    //     console.log(res)
    //     //箭头函数中this指向的data中this
    //   }
    // })
  },
  onLike:function(event){
    // console.log(event)
    let behavior = event.detail.behavior
    // console.log(behavior)
    LikeM.like(behavior, this.data.classicData.id, this.data.classicData.type)
  },
  onPrevious:function(event){
    // let index = this.data.classicData.index
    // ClassicM.getPrevious(index,(res)=>{
    //   console.log(res)
    //   this.setData({
    //     classicData: res,
    //     latest: ClassicM.isLatest(res.index),
    //     first: ClassicM.isFirst(res.index)
    //   })
    // }) 
    this._updateClassic('previous')
  },
  
  onNext:function(event){
    this._updateClassic('next')
  },
  _updateClassic: function(nextOrPrevious){
    let index = this.data.classicData.index
    ClassicM.getClassic(index, nextOrPrevious, (res)=>{
      this._getLikeStatus(res.id,res.type)
      // console.log(res)
      this.setData({
        classicData: res,
        latest: ClassicM.isLatest(res.index),
        first: ClassicM.isFirst(res.index)
      })
    })
  },
  _getLikeStatus:function(artID,category){
    LikeM.getClassicLikeStatus(artID,category, (res)=>{
      this.setData({
        likeCount: res.fav_nums,
        likeStatus: res.like_status
      })
    })
  }

})