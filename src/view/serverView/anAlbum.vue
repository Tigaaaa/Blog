<template>
    <el-upload
    v-model:file-list="anAlbum.list"
    :action="uploadUrl"
    :headers="getHeaders"
    name='img'
    :data="anAlbum"
    list-type="picture-card"
    :on-success="handleAvatarSuccess"
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
import {selectAlbum,deletPhotos} from '@/utils/api'
import axios from '@/utils/request'
 export default {
   name:'anAlbum',
   setup(){
     const route=new useRoute();
     //upload准备
     let uploadInfo={
       uploadUrl:axios.defaults.baseURL+'/album/postPhotos',
       getHeaders:{
         'Accept': 'application/json'
       },
       dialogVisible: false,
       dialogImageUrl: ''
     }
     //上传图片信息
     let anAlbum=reactive({
       id:route.query.id,
       list:[],
       jsonList:[]
     });
     
     //获取照片
     function selectAlb(){
      selectAlbum(anAlbum.id)
      .then(res=>{
        anAlbum.jsonList=res.data[0].photos;
        anAlbum.list=JSON.parse(res.data[0].photos);
      })
      .catch(err=>console.log(err.message))
     }
     function handleAvatarSuccess(){
       selectAlb();
     }
     //预览
    function handlePictureCardPreview(file) {
      uploadInfo.dialogVisible = true
      uploadInfo.dialogImageUrl = file.url
    }
    //删除
    function handleRemove(file){
      deletPhotos(file.url,JSON.stringify(anAlbum.list),anAlbum.id)
      .then(res=>{
        alert(res.data.message);
        if(res.data.status==0)
          selectAlb();
      })
      .catch(err=>console.log(err.message))
    }

    selectAlb();

     return {
       ...uploadInfo,
       anAlbum,

       selectAlb,
       handleAvatarSuccess,
       handlePictureCardPreview,
       handleRemove,
     }
   },
 }
</script>

<style lang='scss' scoped>

</style>