const express=require("express");
const { handleGenearateNewURL,handleRedirectURL,handleAnalytics}=require("../controllers/url");
const router=express.Router();

router.post("/", handleGenearateNewURL);
router.get("/:shortId",handleRedirectURL);
router.get("/analytics/:shortId", handleAnalytics);



module.exports=router;