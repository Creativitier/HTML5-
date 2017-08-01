<template>
 <div id=searchBox>
   <input type=text class=search-song placeholder="关键字" @keyup.enter="searchMessage" v-model="keyWords"/>
   <button class="search-btn" @click="searchMessage">
     <svg class="icon">
       <use xlink:href="#icon-search"></use>
     </svg>
   </button>
 </div>
</template>

<script>
  import {getMessage} from 'common/getMessage'
  import {bus} from 'common/bus'
  export default {
    name: 'searchBox',
    data() {
      return {
         keyWords: '',
         page: 1,
         maxResult: 0,
         allPages: 0,
         w: '',
         contentlist: []
      }
    },
    methods: {
      //获取数据函数
      searchMessage() {
        if(!this.keyWords) return
        let keyWords = this.keyWords.replace(/\s./, '')
        getMessage(keyWords, this.page).then((response) => {
          let  _this = this
          this.setInit(response)
          bus.$emit('songDetail',{
            songlist: _this.contentlist
          })
        }).catch((error) => {
          console.log('error:' + error)
        })
      },
      //初始化数据函数
      setInit(response) {
        this.maxResult = response.maxResult
        this.w = response.w
        this.contentlist = response.contentlist
        this.allPages = response.allPages
      }
    }
  }
</script>

<style lang=sass>
  @import '../../scss/SearchBox'
</style>
