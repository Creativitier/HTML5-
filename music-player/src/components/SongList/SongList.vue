<template>
 <div id="wrapper">
   <ul class='song-container scroller'>
    <li>
     <div>
       <ul class='catalog'>
         <li>歌曲</li>
         <li>歌手</li>
         <li>专辑</li>
       </ul>
     </div>
    </li>

     <li v-for="(item, index) in songList" >
          <ul class="space-around list-song">
            <li class=lyrics>
              <div class="playing">
                <svg class="icon"  style="font-size: 30px;" v-if="isActive!==index">
                  <use xlink:href="#icon-gequming"></use>
                </svg>
                <div v-else="isActive===index">
                  <img src="../../assets/wave.gif" alt="">
                </div>
              </div>
              <p class=hidden :title="item.songname"> {{ item.songname }}</p>
            </li>
            <li class=singer  @click="isClick">
              <div class="playing">
                <svg class="icon" style="font-size: 30px;" @click="isShow(index)" v-if="isActive!==index">
                  <use xlink:href="#icon-bofang"></use>
                </svg>
                <svg class="icon" style="font-size: 30px;"  @click="isHide(index)" v-else="isActive===index">
                  <use xlink:href="#icon-zantingtingzhi"></use>
                </svg>
              </div>
              <p class=hidden>{{ item.singername }}</p>
            </li>
            <li class=album>
              <div class="playing">
                <svg class="icon" style="font-size:25px;">
                  <use xlink:href="#icon-zhuanji"></use>
                </svg>
              </div>
              <p class=hidden>{{ item.albumname }}</p>
            </li>
          </ul>
        </li>

    <li>
     <div class='loading space-around' style="display: none;">
       <div class="loader">
        <div class="loader-inner ball-clip-rotate-multiple">
          <div></div>
          <div></div>
        </div>
      </div>
     </div>

     <div class='loadMore space-around'>
       <svg class="icon" style="font-size:40px;">
         <use xlink:href="#icon-loadmore"></use>
       </svg>
     </div>
    </li>
   </ul>
 </div>
</template>

<script>
  import IScroll from 'iscroll'
  export default {
    name: 'songList',
    data() {
      return {
        Scroll: null,
        isActive: -1,
        //判断是点击还是播放
        isFlag: true
      }
    },
    props: {
      songList: {
        type: Array,
        default: []
      },
      arr: {
        type: Array,
        default: []
      }
    },
    created() {
      this.$nextTick(() => {
        this.initScroll()
      })
    },
    methods: {
      initScroll() {
        this.Scroll =  new IScroll('#wrapper', {
          scrollbars: 'custom',
          mouseWheel: true,
          shrinkScrollbars: 'scale',
          interactiveScrollbars: true,
          bounceEasing: 'elastic',
          bounceTime: 1200
        })
      },
      isShow(index) {
        this.isActive = index
        this.$emit('isNow', index)
      },
      isHide(index) {
        this.isActive = -1
        this.$emit('isNow', index)
      },
      isClick() {
        this.isFlag = !this.isFlag
        this.$emit('isShowPic', this.isFlag)
      },
    },
    watch: {
      songList() {
        this.$nextTick(() => {
          this.initScroll()
        })
      },
      arr() {
        if(this.isActive!==-1) {
          this.isActive = -1
        } else {
          this.isActive = this.arr[0]
        }
      }
    },
  }
</script>

<style lang=scss>
  @import '../../scss/SongList'
</style>
