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

    <li v-for="item in songList">
       <ul class="space-around list-song">
        <li class=lyrics>
          <div class="playing">
            <svg class="icon" style="font-size: 30px;">
              <use xlink:href="#icon-gequming"></use>
            </svg>
            <!-- <div class="">
              <img src="../../assets/wave.gif" alt="">
            </div> -->
          </div>
          <p class=hidden :title="item.songname">{{ item.songname }}</p>
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
  export default {
    name: 'songList',
    props: {
      songList: {
        type: Array,
        default: []
      }
    }
  }
</script>

<style lang=scss>
  @import '../../scss/SongList'
</style>
