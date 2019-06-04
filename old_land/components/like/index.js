// components/like/index.js
Component({
  properties:{
    like:{
      type: Boolean,
      // observer:function(){}
    },
    count:{
      type:Number
    },
    readOnly:{
      type: Boolean,
    },
  },
  data: {
    //私有外部无法访问
    // count: 9,
    // like: true,
    yesSrc: 'images/like.png',
    noSrc: 'images/dislike.png'
  },
  methods:{
    onLike:function(event){
      if(this.properties.readOnly){
        return
      }
      let like = this.properties.like
      let count = this.properties.count
      count = like? count-1 : count+1
      this.setData({
        count:count,
        like: !like
      })
      //激活该事件
      let behavior = this.properties.like ?'like':'cancel'
      // this.triggerEvent('自定义事件名称',{传递自己定义的属性},{一般不使用这个参数})
      //小程序中激活该事件
      this.triggerEvent('like',{
        behavior: behavior
      })
    }
  },

})
