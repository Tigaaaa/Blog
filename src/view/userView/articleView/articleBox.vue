<template>
    <article class="box">
        <div class='articleCover'>
            <img :src="coverUrl"/>
            <router-link :to="{
                path:'/user/article',
                query:{
                    id:id
                }}"></router-link>
        </div>
        <h3 class="title hid">{{title}}</h3>
    </article>
</template>

<script>

    export default{
        name:'articleBox',
        props:['title','id','coverUrl'],
    }
</script>

<style lang="scss" scoped>
.box{
    width:100%;
    height:100%;
    background:white;
    border-radius:0.5rem;

    display:flex;
    flex-direction:column;
    align-items:center;
    justify-content:center;
    .articleCover{
        width:90%;
        height:85%;
        position:relative;
        display:flex;
        justify-content:center;
        align-items:center;
        overflow:hidden;
        img{
            min-width:100%;
            min-height:100%;
            object-fit:cover;
        }
        a{
            width:100%;
            height:100%;
            position:absolute;
            left:0;
            top:0;
        }
    }
    .title{
        font-size:2.5rem;
    }
}

</style>