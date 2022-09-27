 const router = require('express').Router();
const authControllers = require('../controllers/auth.controllers');
const uploadController = require('../controllers/upload.controller');
const userControllers = require('../controllers/user.controllers');
const { v4: uuidv4 } = require('uuid');
const multer =require('multer');
//storage initialization
const filestorage = multer.diskStorage({
    destination:function(req,file,cb){

        cb(null,'./client/public/uploads/profil');
    },
    filename:function(req,file,cb){
        console.log(file);
        cb(null,Date.now() + uuidv4() + file.originalname );

    }
});
//let you filter file(image)
const fileFilter =(req,file,cb)=>{
     
    if(file.mimetype != 'image/jpg' && file.mimetype != 'image/jpeg' && file.mimetype != 'image/png'){
         
        cb(null,false);
    }else{
         
        cb(null,true);
    }
}
//here you specify how to store you file
const upload = multer({
    storage: filestorage,
    limits:{
        fileSize:1024*1024*5
    },
    fileFilter:fileFilter

});
 

 router.post('/register',authControllers.signUp);
 router.post('/login',authControllers.signIn);
 router.get('/logout',authControllers.logOut);
 router.get('/',userControllers.getAllUser);
 router.get('/:id',userControllers.userInfo);

 router.put('/:id',userControllers.updateUser);
 router.delete('/:id',userControllers.delete);
 router.patch('/follow/:id',userControllers.follow);
 router.patch('/unfollow/:id',userControllers.unFollow);

 //upload
 router.post('/upload',upload.single('file'),uploadController.uploadProfil)

module.exports = router;