var fs=require('fs')
let db=require('../db/index')

exports.postImg=(req,res)=>{

        let files=req.files;
        let file=files[0];
        let fileInfo={};
        let path=`static/profile/${req.body.userName}.jpg`;
        fs.renameSync("./static/profile/"+file.filename,path);

        fileInfo.path=path; 
        res.send({fileInfo});
}
