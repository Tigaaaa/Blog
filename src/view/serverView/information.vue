<template>
    <div class="warp">
        <el-upload
        class="avatar-uploader"
        :action="uploadUrl"
        :headers="getHeaders"
        name="profile"
        :show-file-list="false"
        :on-success="handleAvatarSuccess"
        :before-upload="beforeAvatarUpload">
            <img v-if="profileUrl" :src="profileUrl" class="avatar">
            <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
        </el-upload>
        <p>上传头像</p>
        <el-upload
        class="back-uploader"
        :action="uploadBackUrl"
        :headers="getHeaders"
        name="background"
        :show-file-list="false"
        :on-success="handleAvatarSuccess"
        :before-upload="beforeAvatarUpload">
            <img v-if="backUrl" :src="backUrl" class="back">
            <el-icon v-else class="back-uploader-icon"><Plus /></el-icon>
        </el-upload>
        <p>上传背景</p>
    </div>
</template>

<script>
import axios from '@/utils/request'
    export default{
        name:'informationView',
        setup(){
            let baseURL=axios.defaults.baseURL;
            let getHeaders={
                    'Accept': 'application/json'
                };
            let profileInfo={
                profileUrl:baseURL+"/static/profile/img2.jpg",
                uploadUrl:baseURL+'/root/postProfile',
            }
            let backInfo={
                backUrl:baseURL+"/static/background/img3.jpg",
                uploadBackUrl:baseURL+'/root/postBackground',
            }

            //成功上传
            function handleAvatarSuccess(res){
                alert(res.message);
            }
            //上传检验
            function beforeAvatarUpload(file){
                const isJPG = file.type === 'image/jpeg';
                const isLt2M = file.size / 1024 / 1024 < 2;

                if (!isJPG) {
                    alert('上传图片只能是 JPG 格式!');
                }
                if (!isLt2M) {
                    alert('上传图片大小不能超过 2MB!');
                }
                return isJPG && isLt2M;
            }


            return {
                ...profileInfo,
                ...backInfo,
                getHeaders,

                handleAvatarSuccess,
                beforeAvatarUpload
            }
        }
    }
</script>

<style lang="scss" scoped>
.warp{
    width:100%;
    height:100%;
    display:flex;
    flex-direction:column;
    align-items:center;
    justify-content:center;
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
        border-radius:50%;
        font-size: 28px;
        color: #8c939d;
        width: 178px;
        height: 178px;
        line-height: 178px;
        text-align: center;
    }
    .avatar {
        border-radius:50%;
        width: 178px;
        height: 178px;
        display: block;
        object-fit:cover;
    }
    .back-uploader .el-upload {
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
    }
    .back-uploader .el-upload:hover {
        border-color: #409EFF;
    }
    .back-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 178px;
        height: 178px;
        line-height: 178px;
        text-align: center;
    }
    .back {
        width: 178px;
        height: 178px;
        display: block;
        object-fit:cover;
    }
}

</style>