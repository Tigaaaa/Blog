import {createRouter,createWebHistory} from 'vue-router'
import routes from './routes'
//import {useStore} from 'vuex'
import store from '@/store/index'

const router=createRouter({
    history:createWebHistory(),
    routes
})
//const store=new useStore();
router.beforeEach((to,from,next)=>{
    if(to.meta.isServer){
        if(store.state.isRoot)
            next();
        else{
            alert("请登录管理员账号！");
            next('/user/login');
        }
    }
    else next();
})

export default router;
