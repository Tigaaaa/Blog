let db=require('../db/index')

exports.cookieLogin=(req,res)=>{
    let name=req.session.name;
    if(name){
        res.send({
            status:200,
            message:'已登录',
            name:name,
            isRoot:req.session.isRoot
        })
    }
    else{return res.send({
        status:202,
        message:'登录信息已过期'
    })}
}
exports.register=(req,res)=>{
    var sql1='select * from user where name=?';
    var sql2='insert into user (name,password) values (?,?)';
    db.query(sql1,[req.body.params.name],(err,data)=>{
        if(err){
            return res.send({
                status:202,
                message:'操作失败'
            })
        }
        if(data.length==0){
            db.query(sql2,[req.body.params.name,req.body.params.password],(err,data)=>{
                if(err){
                    return res.send({
                        status:400,
                        message:'注册失败'
                    })
                }
                res.send({
                    status:200,
                    message:'注册成功'
                });
            })
        }
        else
            return res.send({
                status:202,
                message:'用户名已存在'
            })
    })
}

exports.login=(req,res)=>{
    var sql='select * from user where name=?';
    db.query(sql,[req.body.params.name],(err,data)=>{
        if(err){
            return res.send({
                status:202,
                message:'登录失败'
            })
        }
        if(data.length>0){
            if(data[0].password==req.body.params.password){
                req.session.name=req.body.params.name;
                req.session.isRoot=data[0].isRoot;
                res.send({
                    status:200,
                    message:'登录成功',
                    id:req.session.id,
                    isRoot:data[0].isRoot
                })
            }else{
                res.send({
                    status:202,
                    message:'密码错误',
                })
            }
        }
        else
            return res.send({
                status:202,
                message:'用户不存在'
            })
    })
}

exports.out=(req,res)=>{
    req.session.cookie.maxAge=0;
    return res.send({
        status:200,
        message:'退出成功'
    })
}