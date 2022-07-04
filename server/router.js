let express=require('express')
let router=express.Router()
let login=require('./API/login')
let article=require('./API/article')
let tag=require('./API/tag')
let comment=require('./API/comment')

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

router.post('/comment/postCom',comment.postCom)
router.get('/comment/getCom',comment.getCom)
router.get('/comment/getChildCom',comment.getChildCom)
router.get('/comment/select',comment.selectCom)
module.exports=router