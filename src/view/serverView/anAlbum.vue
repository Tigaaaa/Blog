<template>
    <el-upload
    v-model:file-list="anAlbum.list"
    :action="uploadUrl"
    :headers="getHeaders"
    name='img'
    :data="anAlbum"
    list-type="picture-card"
    :on-preview="handlePictureCardPreview"
    :on-remove="handleRemove"
  >
    <el-icon><Plus /></el-icon>
  </el-upload>

  <el-dialog v-model="dialogVisible">
    <img w-full :src="dialogImageUrl" alt="Preview Image" />
  </el-dialog>
</template>

<script>
import {reactive} from 'vue'
import {useRoute} from 'vue-router'
import {selectAlbum} from '@/utils/api'
 export default {
   name:'anAlbum',
   setup(){
     const route=new useRoute();
     
     let uploadInfo={
       uploadUrl:'http://localhost:8000/album/postPhotos',
       getHeaders:{
         'Accept': 'application/json'
       },
       dialogVisible: false,
       dialogImageUrl: ''
     }

     let anAlbum=reactive({
       id:route.query.id,
       list:[],
       jsonList:[]
     });
     
     selectAlbum(anAlbum.id)
     .then(res=>{
       anAlbum.jsonList=res.data[0].photos;
       anAlbum.list=JSON.parse(res.data[0].photos);
     })
     .catch(err=>console.log(err.message))

    function handlePictureCardPreview(file) {
      uploadInfo.dialogVisible = true
      uploadInfo.dialogImageUrl = file.url
    }
    function handleRemove(){
      
    }

     return {
       ...uploadInfo,
       anAlbum,

       handlePictureCardPreview,
       handleRemove,
     }
   },
 }
</script>

<style lang='scss' scoped>

</style>