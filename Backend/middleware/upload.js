const path = require('path');
const multer = require('multer');

let storage = multer.diskStorage({
    destination : function(req, file, cb){
        cb(null, 'uploads/')  // location where file will be saved
    },
    filename : function(req, file, cb){
        let ext = path.extname(file.originalname);  // rename file with current timestamp & extention => always unique
        cb(null, Date.now() + ext);
    }
})

var upload = multer({
    storage : storage,
    fileFilter : function(req, file, cb){ 
        if(file.mimetype == 'image/jpg' || file.mimetype == 'image/png'){
            cb(null, true);
        }
        else{
            console.log('Only jpg & png file supported');
            cb(null, false)
        }
    },
    limits : {
        fileSize : 1024 * 1024 * 2  // max 2mb file 
    }
})

module.exports = upload;