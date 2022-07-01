<template>
    <ul>
        <li class="aphoto" v-for="(pho,index) in photos" :key="index">
            <div class="img" :title="pho.title"></div>
            <a class="imga" href="#"></a>
        </li>
    </ul>
</template>

<script>
import {reactive} from 'vue'
export default{
    name:'photosList',
    setup(){
        let photos=reactive([
            {title:'1'},
            {title:'2'},
            {title:'3'},
            {title:'4'},
            {title:'5'}
        ]);

        return {photos}
    }
}
</script>

<style scoped>

.aphoto{
    width:160px;
    height:160px;
    border-radius:10px;
    background-color:white;
    margin:15px;
    padding:10px;
    float:left;
}
.img,.imga{
    width:100%;
    height:100%;
    background-color:black;
    border-radius:10px;
}
</style>