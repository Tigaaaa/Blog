export default[
    {
        path:'',
        redirect:'/user'
    },
    {
        path:'/user',
        component:()=>import('@/view/userView/userView'),
        children:[
            {
                path:'',
                redirect:'/user/articleList',
                meta:{
                    keepAlive:true
                }
            },
            {
                path:'articleList',
                component:()=>import('@/view/userView/articleView/articleList'),
                meta:{
                    keepAlive:true
                }
            },
            {
                path:'tagSelect',
                component:()=>import('@/view/userView/articleView/tagSelectList')
            },
            {
                path:'article',
                component:()=>import('@/view/userView/articleView/anArticle')
            },
            {
                path:'album',
                component:()=>import('@/view/userView/albumView/albumList')
            },
            {
                path:'anAlbum',
                component:()=>import('@/view/userView/albumView/anAlbum')
            },
            {
                path:'comment',
                component:()=>import('@/view/userView/commentView/commentView')
            },
            {
                path:'login',
                component:()=>import('@/view/userView/login'),
                meta:{
                    keepAlive:true
                }
            },
        ]
    },
    {
        path:'/server',
        component:()=>import('@/view/serverView/serverView'),
        meta:{isServer:true},
        children:[
            {
                path:'/server',
                redirect:'/server/admArt'
            },
            {
                path:'admArt',
                component:()=>import('@/view/serverView/admArt')
            },
            {
                path:'admAlb',
                component:()=>import('@/view/serverView/admAlbum')
            },
            {
                path:'anAlbum',
                component:()=>import('@/view/serverView/anAlbum')
            },
            {
                path:'postArt',
                component:()=>import('@/view/serverView/postArtView'),
                meta:{
                    keepAlive:true
                }
            },
            {
                path:'modArt',
                component:()=>import('@/view/serverView/postArtView')
            },
            {
                path:'information',
                component:()=>import('@/view/serverView/information')
            },
        ]
    }
]