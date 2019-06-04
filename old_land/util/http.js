import {config} from '../config.js' 
const tips = {//错误提示码
  1:'抱歉，出现了一个错误',
  1005:'不正确的开发者key，请前往www.7yue.pro申请',
  3000: '期刊不存在'
}
export class HTTP{
  request(params){
    // URL,data,method,
    if(!params.method){
      params.method = 'GET'
    }
    wx.request({
      url: config.api_base_url + params.url,
      method: params.method,
      data: params.data,
      header:{
        'content-type':'application/json',
        'appkey': config.appkey
      },
      success:(res)=>{
        let code = res.statusCode.toString()
        // console.log(code)//200
        if(code.startsWith('2')){
          params.success && params.success(res.data)//将res传递进来
        }else{
          let error_code = res.data.error_code
          this._show_error(error_code)
        }
      },
      fail:(err)=>{
        //此处情况比较少见
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
      duration: 2000
    })
  }
}