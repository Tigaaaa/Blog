<template>
  <router-view></router-view>
</template>

<script>
export default {
  name: 'App',
}
</script>

<style>
html{
  padding: 0;
  margin: 0;
  font-style:normal;
  font-size:62.5%;
}
body, h1, h2, h3, h4, h5, h6, ul, ol, li, dl, dt, dd, header, menu, section, p, input, td, th, ins {
  padding: 0;
  margin: 0;
  font-style:normal;
  font-size:1.4rem;
}
a{
  text-decoration: none;
  color:#000;
}
.hov:hover{
  text-decoration:underline;
}
input{
  border:none;
  outline:none;
}
li,ul{
  list-style:none;
}
body{
  height: 100vh;
  
  display: flex;
    justify-content: center;
    align-items: center;
    background-image:url(./assets/img3.jpg);
    background-repeat:no-repeat;
    background-size:cover;
}
.blk{
  background-color: rgba(255, 255, 255, 0.8);
}
.sd{
  box-shadow: 0 0.2rem 0.2rem 0.2rem #bbb;
}
.m{
  margin: 0.8rem;
}
.hid{
  overflow:hidden;
  white-space:nowrap;
  text-overflow:ellipsis;
}

.tag{
    padding:0.5rem;
    margin-left:1rem;
    border-radius:0.5rem;
    background-color:rgb(164, 187, 230);
    user-select:none;

    float:left;
}

@media screen and (max-width:2468px){
  .main-box,.server-box{
      width:80vw;
      height:90vh;
      border-radius:0.5rem;
  }
  .l-box{
    width:10vw;
  }
  .log-reg-box{
    width: 40rem;
    height: 45rem;
    top:4rem;
    left:4rem;
  }
}
@media screen and (max-width:700px){
  .main-box,.server-box{
      width: 100vw;
      height: 100vh;
      border-radius:0;
  }
  .l-box{
    position:absolute;
    width:5%;
    overflow:hidden;
    background-color:#fff;
    opacity:0.5;
    transition:1s;
  }
  .l-box:hover{
    width:15rem;
    opacity:1;
  }
  .r-box{
    display:none;
  }
  .log-reg-box{
    width:90%;
    height:80%;
    left:0.5rem;
  }
}
</style>
