// components/navi/index.js
Component({
  properties:{
    //此处数据从外部传到内部
    title:String,
    first: Boolean,
    latest: Boolean
  },
  data: {
    disLeftSrc: 'images/triangle.dis@left.png',
    leftSrc: 'images/triangle@left.png',
    disRightSrc: 'images/triangle.dis@right.png',
    rightSrc: 'images/triangle@right.png'
  },
  methods:{
    onLeft:function(event){
      //添加自定义事件
      if(!this.properties.latest){
        //如果是老的，不是最新的
        this.triggerEvent('left',{},{})
      }  
    },
    onRight:function(event){
      if(!this.properties.first){
        //如果不是第一期
        this.triggerEvent('right',{},{})
      }
    },
  }

})