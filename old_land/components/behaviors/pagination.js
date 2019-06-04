const paginationBev= Behavior({
  data:{
    dataArray:[],//分页不断加载的数据
    total: null,
    noneResult: false,
    loading:false
  },
  methods:{
    setMoreData(dataArray){
      const tempArray = this.data.dataArray.concat(dataArray)
      this.setData({
        dataArray: tempArray
      })
    },
    getCurrentStart(){
      return this.data.dataArray.length
    },
    setTotal(total){
      this.data.total = total
      if(total == 0){
        this.setData({
          noneResult:true
        })
      }
    },
    hasMore(){
      //是否还有更多数据加载
      if(this.data.dataArray.length >=this.data.total){
        return false
      }else{
        return true
      }
    },
    initialize(){
      //清空数据
      this.setData({
        dataArray: [],
        noneResult:false
      })
      // this.data.dataArray = [];
      this.data.total = null
    },
    _locked(){
      this.setData({
        loading:true//上锁
      })
    },
    _unLocked(){
      this.setData({
        loading:false//解锁
      })
    }

  }
})
export{paginationBev}