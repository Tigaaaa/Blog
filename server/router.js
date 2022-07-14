let express=require('express')
let router=express.Router()
let login=require('./API/login')
let article=require('./API/article')
let tag=require('./API/tag')
let comment=require('./API/comment')
let img=require('./API/img')
let album=require('./API/album')
let root=require('./API/root')
const multer = require('multer');

router.post('/login/register',login.register)
router.post('/login/login',login.login)
router.get('/login/cookie',login.cookieLogin)
router.get('/login/out',login.out)

router.get('/tag/getName',tag.getTagName)
router.get('/tag/select',tag.tagSelect)
router.get('/tag/getTags',tag.getTags)
router.post('/tag/add',tag.addTag)

router.get('/article/delete',article.delArt)
router.post('/article/postArt',article.postArt)
router.post('/article/modArt',article.modArt)
router.get('/article/list',article.getArtList)
router.get('/article/cont',article.getArtCont)
const coverStorage=multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,'static/cover')
    },
    filename:function(req,file,cb){
        cb(null,`${Date.now()}-${file.originalname}`)
    }
})
const coverUpload=multer({storage:coverStorage});
router.post('/article/postCover',coverUpload.single("img"),article.postCover)

router.post('/comment/postCom',comment.postCom)
router.get('/comment/getCom',comment.getCom)
router.get('/comment/getChildCom',comment.getChildCom)
router.get('/comment/select',comment.selectCom)

router.post('/img/postImg',multer({dest:'static/profile'}).array("img",1),img.postImg)

router.post('/album/create',album.create)
router.get('/album/getList',album.getList)
router.get('/album/selectAlbum',album.selectAlbum)
const albumStorage=multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,'static/album')
    },
    filename:function(req,file,cb){
        cb(null,`${Date.now()}-${file.originalname}`)
    }
})
const albumUpload=multer({storage:albumStorage});
router.post('/album/postPhotos',albumUpload.single("img"),album.postPhoto)
router.post('/album/postName',album.postName)
router.post('/album/delet',album.deletAlbum)
router.post('/album/deletPhotos',album.deletPhoto)

const profileStorage=multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,'static/profile')
    },
    filename:function(req,file,cb){
        cb(null,'img2.jpg')
    }
})
const backStorage=multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,'static/background')
    },
    filename:function(req,file,cb){
        cb(null,'img3.jpg')
    }
})
const profileUpload=multer({storage:profileStorage});
const backUpload=multer({storage:backStorage});
router.post('/root/postProfile',profileUpload.single('profile'),root.postProfile)
router.post('/root/postBackground',backUpload.single('background'),root.postBackground)

module.exports=router