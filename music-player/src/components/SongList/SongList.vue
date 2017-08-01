<template>
 <div id=songList>
   <ul class=song-container>
    <li>
     <div>
       <ul class='catalog'>
         <li>歌曲</li>
         <li>歌手</li>
         <li>专辑</li>
       </ul>
     </div>
    </li>

    <li v-if="songList">
     <ul class="space-around list-song"  v-for="(item, index) in songList">
      <li class=lyrics>
        <div class="playing">
          <svg class="icon" style="font-size: 30px;">
            <use xlink:href="#icon-gequming"></use>
          </svg>
          <!-- <div class="">
            <img src="../../assets/wave.gif" alt="">
          </div> -->
        </div>
        <!--<p>{{ item.songname }}</p>-->
      </li>
      <li class=singer>
        <div class="playing">
          <svg class="icon" style="font-size: 30px;">
            <use xlink:href="#icon-bofang"></use>
          </svg>

          <!-- <svg class="icon" style="font-size: 30px;">
            <use xlink:href="#icon-zantingtingzhi"></use>
          </svg> -->
        </div>
        <!--<p>{{ item.singername }}</p>-->
      </li>
      <li class=album>
        <div class="playing">
          <svg class="icon" style="font-size:25px;">
            <use xlink:href="#icon-zhuanji"></use>
          </svg>
        </div>
        <!--<p>{{ item.albumname }}</p>-->
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
  import {bus} from 'common/bus'
  export default {
    name: 'songList',
    data() {
      return {
        songList: []
      }
    },
    mounted() {
      bus.$on('songDetail', function (data) {
        this.songList = data.songlist
        console.log(this.songList)
      })
    }
  }
</script>

<style scoped lang=scss>
  @import '../../scss/SongList'
</style>
