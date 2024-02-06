const router=require("express").Router();
const { model } = require("mongoose");
const storyRouter=require('../controller/StoryController');
const userRequire=require('../middlewares/UserRequres');

router.post('/',userRequire,storyRouter.createStoryController);
router.delete('/',userRequire,storyRouter.deleteStoryController);
router.get('/',userRequire,storyRouter.getMystoryController);

module.exports=router;
