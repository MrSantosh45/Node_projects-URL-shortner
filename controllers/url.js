const URL=require("../models/url");
const shortid=require("shortid");

async function handleGenearateNewURL(req,res){
    const body=req.body;
    console.log(body);
    if(!body || !body.url){
        return res.status(400).json({error:"no url provided"});
    }

    const shortID=shortid();
    
    await URL.create({
        shortId:shortID,
        redirectURL:body.url,
        visitHistory:[]
    });

    return res.json({id:shortID});
}


async function handleRedirectURL(req,res){
    const shortId=req.params.shortId;
    const entry=await URL.findOneAndUpdate({
        shortId
    },{
        $push:{
            visitHistory:{
                timestamp:Date.now()
            },
        },
    });
    res.redirect(entry.redirectURL);
}

async function handleAnalytics(req,res){
    const shortId=req.params.shortId;
    const result=await URL.findOne({
        shortId
    });

    if (!result) {
        return res.status(404).json({ error: "Short URL not found" });
    }
    

    return res.json({
        totalClicks:result.visitHistory.length,
        analytics:result.visitHistory
    });
}

module.exports={
    handleGenearateNewURL,
    handleRedirectURL,
    handleAnalytics
}