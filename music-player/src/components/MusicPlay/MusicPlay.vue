<template>
 <div id=player>
   <ul class=controller>
    <li class=prev>
      <svg class="icon" style="font-size: 40px;">
        <use xlink:href="#icon-shangyishou"></use>
      </svg>
    </li>
    <li class=pause @click="isCompare">
      <div v-if="!playing" >
        <svg class="icon" style="font-size: 40px;">
          <use xlink:href="#icon-liebiaozhongbofanganniu"></use>
        </svg>
      </div>
      <div v-if="playing">
        <svg class="icon" style="font-size: 40px;">
          <use xlink:href="#icon-zanting"></use>
        </svg>
      </div>
    </li>
    <li class=next>
      <svg class="icon" style="font-size: 40px;">
        <use xlink:href="#icon-xiayishou"></use>
      </svg>
    </li>
   </ul>

   <div>
     <!-- 歌词名字和歌手 -->
     <div>
       <span class=album-name>{{ song }}</span> /&nbsp;
       <span class=only-singer>{{ singer }}</span>
     </div>

     <div class=play-progress>
       <!-- 播放时间和总时间 -->
      <span class=play-time>{{ currentTime }}</span> /&nbsp; <span> {{ allTime }}</span>
      <!-- 音量控制 -->
      <div class=volume ref="parentVolumn">
       <span>
        <svg class="icon" style="font-size: 20px;">
          <use xlink:href="#icon-volumn"></use>
        </svg>
       </span>
       <div ref="childVolumn"></div>
      </div>
     </div>
     <!-- 进度条 -->
     <div class=progress-bar ref="parentProgress">
      <div ref="childProgress"></div>
     </div>

     <audio ref="audio"></audio>
   </div>

 </div>
</template>

<script>
  export default {
    name: 'player',
    data() {
      return {
        audioElement: null,
        playing: false,
        //记录当前点击的
        nowTime: true,
        index: 0,
        timer: null,
        song: '歌曲',
        singer: '歌手',
        allTime: '总时间',
        currentTime: '此刻播放时间'
      }
    },
    created() {
      this.$nextTick(() => {
        this.audioElement = this.$refs.audio
        this.dragVolumn(this.$refs.parentVolumn, this.$refs.childVolumn)
        this.dragProgress(this.$refs.parentProgress, this.$refs.childProgress)
      })
    },
    props:{
    //songList和iNow用于当前点击获取的index
    songList: {
        type: Array,
        default: []
      },
      iNow: {
        type: Number,
        default: -1
      },
      isFlag: {
        type: Boolean,
        default: true
      }
    },
    watch: {
      iNow() {
        if(this.audioElement !== null) {
          this.audioElement.src= this.songList[this.iNow].m4a
          this.song = this.songList[this.iNow].songname
          this.singer = this.songList[this.iNow].singername
          this.nowUpTime()
        }
      },
      isFlag() {
        this.isPlaying(this.audioElement.paused)
      }
    },
    methods: {
      isPlaying(compare) {
        let _this = this
        if(compare) {
          this.audioElement.play()
          this.audioElement.volume = 1
          this.timer = setInterval(() => {
            this.nowUpTime()
          }, 1000)

          this.playing = true
        } else {
          this.audioElement.pause()
          this.playing = false
          clearInterval(this.timer)
        }
        this.audioElement.addEventListener('canplaythrough', () => {
          _this.allTime = _this.changeTime(this.audioElement.duration)
        })
      },
      changeTime(time) {
          let iH = this.toZero(Math.floor(time/3600))
          let iM = this.toZero(Math.floor(time%3600/60))
          let iS = this.toZero(Math.floor(time%60))

          return iH +  ':' + iM + ':' + iS
      },
      toZero(nowTime) {
        if(nowTime < 10) {
          return '0' + nowTime
        } else {
          return '' + nowTime
        }
      },
      isCompare() {
        if(!this.audioElement.src) return
        this.playing = !this.playing
        this.isPlaying(this.audioElement.paused)
        this.$emit('send', [this.iNow, this.playing] )
      },
      dragVolumn(parentElement, childElement) {
        let _this = this
        parentElement.addEventListener('mousedown',function (ev) {
          var disX = ev.clientX - childElement.offsetLeft
          document.onmousemove = function (ev) {
            var L = ev.clientX - disX
            if(L < 0){
              L = 0
            } else if (L > parentElement.offsetWidth - childElement.offsetWidth) {
              L = parentElement.offsetWidth - childElement.offsetWidth
            }
            childElement.style.left = L + 'px'
            var scale = L /(parentElement.offsetWidth - childElement.offsetWidth)
            _this.audioElement.volume = scale
          }
          document.onmouseup = function () {
            this.onmousemove = null
            this.onmouseup = null
          }
        })
      },
      dragProgress(parentElement, childElement) {
        let _this = this
        parentElement.addEventListener('mousedown',function (ev) {
          var disX = ev.clientX - childElement.offsetLeft
          document.onmousemove = function (ev) {
            var L = ev.clientX - disX
            if(L < 0){
              L = 0
            } else if (L > parentElement.offsetWidth - childElement.offsetWidth) {
              L = parentElement.offsetWidth - childElement.offsetWidth
            }
            childElement.style.left = L + 'px'
            var scale = L /(parentElement.offsetWidth - childElement.offsetWidth)
            _this.audioElement.currentTime = scale * _this.audioElement.duration
//            console.log(_this.audioElement.currentTime)
//            _this.nowUpTime(parentElement, childElement)
          }
          document.onmouseup = function () {
            this.onmousemove = null
            this.onmouseup = null
          }
        })
      },
      nowUpTime() {
        this.currentTime = this.changeTime(this.audioElement.currentTime)
        var scale = this.audioElement.currentTime/this.audioElement.duration
        this.$refs.childProgress.style.left = scale * (this.$refs.parentProgress.offsetWidth - this.$refs.childProgress.offsetWidth ) + 'px'

        if(scale === 1) {
          this.$refs.childProgress.style.left = 0
          this.audioElement.pause()
          this.playing = false
          this.$emit('send', [this.iNow, this.playing] )
          clearInterval(this.timer)
        }
      }
    }
  }
</script>

<style lang=scss>
  @import '../../scss/Player'
</style>
