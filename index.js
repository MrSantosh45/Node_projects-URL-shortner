const express=require("express");
const urlRoute=require("./routes/url");
const {connectMongoDb}=require("./connect");
const URL=require("./models/url");

const app=express();


connectMongoDb("mongodb://127.0.0.1:27017/short-url")
 .then(()=>console.log("connected successfully"));

app.use(express.json());

app.use("/url",urlRoute);

const PORT=8001;

app.listen(PORT,()=>console.log(`Server is running on post ${PORT}`));
