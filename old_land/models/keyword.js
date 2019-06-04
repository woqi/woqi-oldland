import {HTTP} from '../util/http-promise.js'
 class KeywordModel extends HTTP{
  q = 'q'
  maxLength = 10
  getHistory(){
   let words =  wx.getStorageSync(this.q)
   if(!words){
     return []
   }
   return words
  }
  getHot(){
    return this.request({
      url:'/book/hot_keyword'
    })
  }
  addToHistory(keyword){
    let words = this.getHistory()//拿到历史关键字
    const has = words.includes(keyword)
    if(!has){
      //超过10数组末尾数据删除，新kerword添加到第一位
      let length = words.length
      if(length>= this.maxLength){
        words.pop()
      }
      words.unshift(keyword)
      wx.setStorageSync(this.q,words)
    }
    
  }
}
export{KeywordModel}