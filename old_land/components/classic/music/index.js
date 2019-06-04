// components/classic/music/index.js
import {classicBeh} from '../classic-beh.js'
let mMgr = wx.getBackgroundAudioManager()
// wx.getBackgroundAudioManager
Component({
  behaviors:[classicBeh],
  properties: {
    src:String,
    title: String
  },
  data: {
    playing:false,
    pauseSrc:'images/player@pause.png',
    playSrc: 'images/player@play.png'
  },
  attached:function(event){
    this._recoverStatus();
    this._monitorSwitch();
  },
  // detached(){
  //   // mMgr.stop();
  // },
  methods: {
    onPlay:function(event){
      //第一步切换图片
      if(!this.data.playing){
        //如果没播
        this.setData({
          playing: true
        })
        mMgr.src = this.properties.src
        mMgr.title = this.properties.title
      }else{
        this.setData({
          playing: false
        })
        mMgr.pause()
      }
    },
    _recoverStatus:function(){//恢复状态
      if(mMgr.paused){
        this.setData({
          playing:false
        })
        return
      }
      if(mMgr.src == this.properties.src){
        if (!mMgr.paused) {
          this.setData({
            playing: true
          })
        }
        // this.setData({
        //   playing:true
        // })
      }
    },
    _monitorSwitch:function(){
      mMgr.onPlay(()=>{//播放
        this._recoverStatus()
      })
      mMgr.onPause(()=>{//暂停
        this._recoverStatus()
      })
      mMgr.onStop(()=>{//关播放器，左上角
        this._recoverStatus()
      })
      mMgr.onEnded(()=>{//音乐自然播放完成
        this._recoverStatus()
      })
    }
  }
})


