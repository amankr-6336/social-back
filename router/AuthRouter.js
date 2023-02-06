const router=require("express").Router();
const authControllerLogin=require('../controller/AuthController');
const authControllerSignup=require('../controller/AuthController');


router.post("/signup",authControllerSignup.SignUpController);

router.post("/login",authControllerLogin.LoginController);

router.get("/refresh",authControllerLogin.refreshAccessTokenController);

router.post("/logout",authControllerLogin.logoutController);

module.exports= router;