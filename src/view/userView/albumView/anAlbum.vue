<template>
  <ul class="photos">
    <li class="photo" v-for="p of list" :key="p.name" :title="p.name" :alt="p.name">
      <img :src="p.url"/>
    </li>
  </ul>
</template>

<script>
import {reactive,toRefs} from 'vue'
import {selectAlbum} from '@/utils/api'
import {useRoute} from 'vue-router'
 export default {
   name:'anAlbum',
   setup(){
     const route=new useRoute();
     let photos=reactive({
       list:[]
     })
     selectAlbum(route.query.id)
      .then(res=>{
        photos.list=JSON.parse(res.data[0].photos);
      })
      .catch(err=>console.log(err.message))

     return {
       ...toRefs(photos)
     }
   },
 }
</script>

<style scoped lang='scss'>
.photos{
  width:100%;
  .photo{
    margin:1rem;
    img{
      width:100%;
    }
  }
}

</style>