
Component({
  options:{
    multipleSlots: true
  },
  properties: {
    mytype:{
      type: String
    }
  },
  data: {

  },
  methods: {
    onGetUserInfo(event){
      this.triggerEvent('userLoggingInfo',event.detail,{})
      //将用户信息传出去
    }
  }
})
