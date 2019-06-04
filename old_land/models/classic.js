import {HTTP} from '../util/http.js'
export class ClassicModel extends HTTP{
  getLatest(sCallback){
    //此处发送http请求
    this.request({
      url: 'classic/latest',
      success:(res)=>{
        // console.log(res)
        sCallback(res)//把数据传回去
        this._setLatestIndex(res.index)
        let key = this._getKey(res.index)
        wx.setStorageSync(key, res)
        // console.log(res.index)
      }
    })
    // return res 此处因为异步则无法return
  }
  getClassic(index,nextOrPrevious,sCallback){
    //缓存中找key
    let key = nextOrPrevious=='next'? this._getKey(index+1) : this._getKey(index-1)
    let classic = wx.getStorageSync(key)
    if(!classic){
      //缓存中没有向服务器发送请求
      this.request({
        url: `classic/${index}/${nextOrPrevious}`,
        success:(res)=>{
          wx.setStorageSync(this._getKey(res.index),res)
          sCallback(res) 
        }
      })
    }else{
      sCallback(classic) 
    }
    
  }
  getMyFavor(success){
    const params = {
      url:'classic/favor',
      success: success
    }
    this.request(params)
  }
  isFirst(index){
    return index == 1 ? true : false;
  }
  isLatest(index){
    let latestIndex = this._getLatestIndex(index)
    return latestIndex == index ? true : false;
  }
  _setLatestIndex(index){
    //将最新期刊inde保存在storage中
    //latest是缓存的名称，index是缓存的值
    //同步写入缓存setStorageSync
    //异步！异步！写入缓存
    wx.setStorageSync('latest',index)
  }
  _getLatestIndex(){
    const index =  wx.getStorageSync('latest')
    return index
  }
  _getKey(index){
    //动态获取key
    let key = 'classic-' + index;
    return key//返回
  }
}

  // getPrevious(index,sCallback){
  //   this.request({
  //     url: 'classic/'+index+'/previous',
  //     success:(res)=>{
  //       sCallback(res)
  //     }
  //   })
  // }
  // getNext(){
  //   this.request({
  //     url: 'classic/'+index+'/next',
  //     success:(res)=>{
  //       sCallback(res)
  //     }
  //   })
  // }