import {KeywordModel} from '../../models/keyword.js'
import {BookModel} from '../../models/book.js'
import {paginationBev} from '../behaviors/pagination.js'
let KeywordM = new KeywordModel()
let BookM = new BookModel()
Component({
  behaviors:[paginationBev],
  properties: {
    more:{
      type:String,
      observer:'loadMore'
    }
  },
  data: {
    historyWords:[],
    hotWords:[],
    // dataArray: [],
    searchingResult: false,
    q:'',
    loading:false,//防止重复加载，等待冷却时间，是否正在发送请求
    middleLoading: false
  },
  attached(){
    //组件的生命周期
    // const historyWords = KeywordM.getHistory()//此处是数组
    // const hotWords = KeywordM.getHot()//此处是promise
      this.setData({
        historyWords: KeywordM.getHistory(),
      })
    KeywordM.getHot().then(res=>{
      this.setData({
        hotWords: res.hot
      })
      // console.log(this.data.hotWords)
    })
  },
  methods: {
    loadMore(){
      if(!this.data.q){
        return//如果没有q不去请求数据
      }
      if(this.data.loading){
        return//正在请求状态就直接return
      }  
      if(this.hasMore()){
        // this.data.loading = true//上锁
        this._locked()
        BookM.search(this.getCurrentStart(),this.data.q)
        .then(res=>{
          this.setMoreData(res.books)
          // this.data.loading = false//解锁
          this._unLocked()
        },()=>{
          //请求失败，没网
          // this.data.loading = false//解锁
          this._unLocked()
        })
      }
      // const length = this.data.dataArray.length
      // BookM.search(length,this.data.q)
      // .then(res=>{
        // this.setMoreData(res.books)
        //老数据this.data.dataArray
        //新数据res.book
        // const tempArray = this.data.dataArray.concat(res.books)
        // this.setData({
          // dataArray: tempArray,
        // })
        // this.data.loading = false//解锁
      // })
    },
    onConfirm(event){
      const q = event.detail.value || event.detail.text//拿到搜索词
      this.setData({
        searchingResult: true,//保障小程序流畅程度，点击确定立马切换
        middleLoading: true,
        q:q
      })
      this.initialize()//每次搜索都是全新调用
      
      BookM.search(0,q)
      .then(res=>{
        this.setMoreData(res.books)
        this.setTotal(res.total)
        // this.setData({
          // dataArray: res.books,
          // q:q
        // })
        // console.log(this.data.dataArray)
        KeywordM.addToHistory(q)//为了让历史关键词更有效
        this.setData({
          middleLoading: false
        })
      })
      
    },
    onDelete(event){
      this.setData({
        searchingResult: false,
        q:''
      })
      this.initialize()
    },
    onCancel(event){
      this.initialize()
      this.triggerEvent('cancel',{},{})
      
    }

  }
})
