var express = require("express");
var router = express.Router();
var passport = require("passport");
var GitHubStrategy = require("passport-github").Strategy
var axios = require("axios")
const client_id = "eef4d05af5ca963d4252";
const clientSecret = "6e1f0c62e5b4bd6581c66dd5581ab4d113a360f8"
var qs = require('qs');

/* GET auth. */
passport.serializeUser(function(user, done) {
  // console.log("serializeUser", user);

  done(null, user);
});
passport.deserializeUser(function(obj, done) {
  // console.log("deserializeUser", obj);
  done(null, obj);
});

router.get('/github',function(req, res) {
  let url = `https://github.com/login/oauth/authorize?client_id=${client_id}`
  res.json(url);
})

router.get("/github/callback", async function(req, res) {
   let code = req.query.code;
   let result = await axios.post("https://github.com/login/oauth/access_token", {
      client_id:client_id,
      client_secret: clientSecret,
      code: code
   })
    let access_token = qs.parse(result.data).access_token;
    // console.log("access_token",access_token)
    //token 存储到 响应头
    res.cookie('access_token', access_token, { expires: new Date(Date.now() + 90000), httpOnly: false })
    res.redirect(`http://localhost:8080`);
})
module.exports = router;
