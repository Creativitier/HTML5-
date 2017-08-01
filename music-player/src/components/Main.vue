<template>
  <div id="contaner">
    <div class="mask"></div>
    <div class="setBackImage" style="background-image: url(http://i.gtimg.cn/music/photo/mid_album_300/O/p/000cA5D92ZnJOp.jpg)"></div>

    <div id=main>
      <!--添加背景色-->
      <div class="mask"></div>
      <!-- 搜素框 -->
      <div class=search-box>
        <search-box></search-box>
      </div>

      <div class=wrapper-container>
        <!-- 歌曲列表 -->
        <div class=song-list>
          <song-list></song-list>
        </div>
        <!-- 歌词展示 -->
        <div class=lyrics>
          <lyrics></lyrics>
        </div>

      </div>
      <!-- 播放器 -->
      <div class=player>
        <music-play></music-play>
      </div>

    </div>
  </div>
</template>

<script>
  import SearchBox from './SearchBox/SearchBox'
  import SongList from './SongList/SongList'
  import Lyrics from './Lyrics/Lyrics'
  import MusicPlay from './MusicPlay/MusicPlay'
  export default {
  name: 'main',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  components: {
    SearchBox,
    SongList,
    Lyrics,
    MusicPlay
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='scss'>
   @import '../scss/main.scss'
</style>
