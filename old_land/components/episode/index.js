
Component({
  properties: {
    index: {
      type:Number,
      observer:function(newVal,oldVal,changedPath){
        // console.log(newVal)//8
        // console.log(oldVal)//0
        // console.log(changedPath)[index]
        let val = newVal < 10 ? '0' + newVal : newVal;
        this.setData({
          _index: val
        })

      }
    }
  },
  data: {
    months:['一月','二月','三月','四月','五月','六月','七月','八月','九月','十月','十一月','十二月'],
    year: 0,
    month:'',
    _index: ''
  },
  attached:function(){
    let date = new Date();
    let year = date.getFullYear();
    let month = date.getMonth();
    this.setData({
      year,
      month: this.data.months[month]
    })  
  },
  /**
   * 组件的方法列表
   */
  methods: {

  }
})
