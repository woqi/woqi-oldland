import {config} from '../config.js' 
const tips = {//错误提示码
  1:'抱歉，出现了一个错误',
  1005:'不正确的开发者key，请前往www.7yue.pro申请',
  3000: '期刊不存在'
}
export class HTTP{
  request({url,data={},method='GET'}){//外部调用
    return new Promise((resolve,reject)=>{
      this._request(url,resolve,reject,data,method)
    })
  }
  _request(url,resolve,reject,data={},method='GET'){//内部调用,必填参数放在默认参数之前
    wx.request({
      url: config.api_base_url + url,
      method: method,
      data: data,
      header:{
        'content-type':'application/json',
        'appkey': config.appkey
      },
      success:(res)=>{
        let code = res.statusCode.toString()
        if(code.startsWith('2')){
          resolve(res.data)
        }else{
          reject()
          let error_code = res.data.error_code
          this._show_error(error_code)
        }
      },
      fail:(err)=>{
        reject()
        this._show_error(1)
      }
    })
  }
  _show_error(error_code){
    //私有方法,展示错误提示码
    if(!error_code){
      error_code = 1;
    }
    const tip = tips[error_code]
    wx.showToast({
      title: tip ? tip : tips[1],
      icon:'none',
      duration: 3000
    })
  }
}