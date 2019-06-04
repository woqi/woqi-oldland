// components/tag/index.js
Component({
  /**
   * 组件的属性列表
   */
  options:{
    multipleSlots: true//展示插槽
  },
  externalClasses:['tag-class'],//外部样式
  properties: {
    text: String,
    num: Number
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    onTap(event){
      this.triggerEvent('tapping',{
        //触发自定义事件使用triggerEvent
        text: this.properties.text
      })
    }
  }
})
