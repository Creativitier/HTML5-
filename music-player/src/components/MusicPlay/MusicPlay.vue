<template>
 <div id=player>
   <ul class=controller>
    <li class=prev>
      <svg class="icon" style="font-size: 40px;">
        <use xlink:href="#icon-shangyishou"></use>
      </svg>
    </li>
    <li class=pause>
      <div>
        <svg class="icon" style="font-size: 40px;">
          <use xlink:href="#icon-liebiaozhongbofanganniu"></use>
        </svg>
      </div>
      <!--<div>-->
        <!--<svg class="icon" style="font-size: 40px;">-->
          <!--<use xlink:href="#icon-zanting"></use>-->
        <!--</svg>-->
      <!--</div>-->
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
       <span class=album-name>ABC</span>
       <span class=only-singer>Andy</span>
     </div>

     <div class=play-progress>
       <!-- 播放时间和总时间 -->
      <span class=play-time>00:00</span>
      <span>00:00</span>
      <!-- 音量控制 -->
      <div class=volume>
       <span>
        <svg class="icon" style="font-size: 40px;">
          <use xlink:href="#icon-yinliang"></use>
        </svg>
       </span>
       <div></div>
      </div>
     </div>

     <!-- 进度条 -->
     <div class=progress-bar>
      <div></div>
     </div>

   </div>

 </div>
</template>

<script>
  export default {
    name: 'player'
  }
</script>

<style scoped lang=scss>
  @import '../../scss/Player'
</style>
