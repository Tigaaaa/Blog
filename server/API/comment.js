let db=require('../db/index')

exports.postCom=(req,res)=>{
    var sql='insert into comment (userName,content) values (?,?)';
    db.query(sql,[req.body.params.name,req.body.params.content],(err,data)=>{
        if(err){
            return res.send('错误：'+err.message)
        }
        res.send(data);
    })
}
exports.getCom=(req,res)=>{
    var sql='select * from comment';
    db.query(sql,(err,data)=>{
        if(err){
            return res.send('错误：'+err.message)
        }
        res.send(data);
    })
}
exports.selectCom=(req,res)=>{
    var sql='select * from comment where commentId=?';
    db.query(sql,[req.query.id],(err,data)=>{
        if(err){
            return res.send('错误：'+err.message)
        }
        res.send(data);
    })
}