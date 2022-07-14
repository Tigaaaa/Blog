let db=require('../db/index')

exports.postProfile=(req,res)=>{
    let file=req.file;
    let url=`http://localhost:8000/${file.destination}/${file.filename}`;
    res.send({
        status:0,
        url:url,
        message:"成功上传头像！"
    });
}