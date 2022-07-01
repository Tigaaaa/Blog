let express=require('express')
let session=require('express-session')
/*let cors=require('cors')
app.use(cors());*/
let bodyParser=require('body-parser')
let router=require('./router')

let app=express()

app.use(session({
    name:'session_id',
    secret:'mycookie',
    resave:false,
    saveUninitialized:true,
    cookie:{
        maxAge:1000*60
    }
}));

/*跨域处理*/
app.all("*",(req,res,next)=>{
    //设置允许跨域的域名，*代表允许任意域名跨域
    res.header("Access-Control-Allow-Origin",req.headers.origin);
    res.header("Access-Control-Allow-Credentials","true");
    //允许的header类型
    res.header("Access-Control-Allow-Headers","content-type");
    res.header("Conten-type","application/json;charset=utf-8");
    //跨域允许的请求方式
    res.header("Access-Control-Allow-Methods","DELETE,PUT,POST,GET,OPTIONS");
    if (req.method.toLowerCase() == 'options')
        res.send(200);  //让options尝试请求快速结束
    else
        next();
});


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(router)

app.listen(8000,()=>{
    console.log('服务器启动');
})