<template>
    <el-upload
    class="avatar-uploader"
    :action="uploadUrl"
    :headers="getHeaders"
    :data="avatarForm"
    name="profile"
    :show-file-list="false"
    :on-success="handleAvatarSuccess"
    :before-upload="beforeAvatarUpload">
        <img v-if="imageUrl" :src="imageUrl" class="avatar">
        <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
    </el-upload>
</template>

<script>
import {reactive} from 'vue'
    export default{
        name:'informationView',
        setup(){
            let imageUrl="http://localhost:8000/static/profile/img2.jpg";
            let uploadUrl='http://localhost:8000/root/postProfile';
            let avatarForm=reactive({
                userName:'name',
            })
            let getHeaders={
                    'Accept': 'application/json'
                };

            //成功上传
            function handleAvatarSuccess(res) {
                alert(res.message);
            }
            //上传检验
            function beforeAvatarUpload(file) {
                const isJPG = file.type === 'image/jpeg';
                const isLt2M = file.size / 1024 / 1024 < 2;

                if (!isJPG) {
                    this.$message.error('上传头像图片只能是 JPG 格式!');
                }
                if (!isLt2M) {
                    this.$message.error('上传头像图片大小不能超过 2MB!');
                }
                return isJPG && isLt2M;
            }


            return {
                imageUrl,
                uploadUrl,
                avatarForm,
                getHeaders,

                handleAvatarSuccess,
                beforeAvatarUpload
            }
        }
    }
</script>

<style scoped>
.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>