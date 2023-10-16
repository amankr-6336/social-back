const userRequire=require("../middlewares/UserRequres");
const UserController=require('../controller/UserController');
const router=require('express').Router();

router.post('/follow',userRequire,UserController.followUserOrUnfollowUserController);
router.get('/getFeedData',userRequire,UserController.getPostsOfFollowing);
router.get('/getMyPosts',userRequire,UserController.getMyPosts);
router.get('/getUserPosts',userRequire,UserController.getUserPosts);
router.delete('/',userRequire,UserController.deletedMyProfile);
router.get('/getMyInfo',userRequire,UserController.getMyInfo);


router.put('/',userRequire,UserController.updateUserProfile);

router.post('/getUserProfile',userRequire,UserController.getUserProfile);

module.exports=router;