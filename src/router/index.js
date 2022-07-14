import {createRouter,createWebHistory} from 'vue-router'
import routes from './routes'
import { cookieLog } from '@/utils/api'
import store from '@/store'

const router=createRouter({
    history:createWebHistory(),
    routes
})
router.beforeEach((to,from,next)=>{
    if(to.meta.isServer){
        if(!store.state.login){
            cookieLog()
            .then(res=>{
                store.dispatch('login',{
                    name:res.data.name,
                    isRoot:res.data.isRoot
                })
                if(res.data.isRoot)
                    next();
                else{
                    alert("请登录管理员账号！");
                    next('/user/login');
                }   
            })
            .catch(err=>{
                console.log(err.message);
                alert("请登录管理员账号！");
                next('/user/login');
            })
        }
        else if(!store.state.isRoot){
            alert("请登录管理员账号！");
            next('/user/login');
        }
        else next();
    }
    else next();
})

export default router;
