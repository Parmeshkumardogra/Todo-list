const express=require("express");
const bodyparser=require("body-parser");
const app=express();

app.use(bodyparser.urlencoded({extended:true}));
app.set("view engine","ejs");
app.use(express.static("public"))

app.get("/",(req,res)=>{
    let date=new Date();
    const option={
        weekday:"long",
        day:"numeric",
        month:"long"
    }
    let today=date.toLocaleDateString("en-us",option);
    Entry.find({},(err,founditem)=>{
        if(err){
            console.log(err);
        }
        else{
            res.render("index",{today_:today,list:founditem});
        }
    }); 
});

const mongoose=require("mongoose");
mongoose.connect("mongodb://localhost:27017/tryDB");

const entryscehma=new mongoose.Schema({
    name:String
});

let dltitem;
const Entry=mongoose.model("Entry",entryscehma);
app.post("/",(req,res)=>{
    if(req.body.bttn1==="add"){
        const entry1=new Entry({
            name:req.body.item1
        });
        entry1.save();
        res.redirect("/")
    }
})
app.post("/delete",(req,res)=>{
    const checkedboxItemId = req.body.checkbox;
    Entry.findOneAndRemove({_id:checkedboxItemId},(err)=>{
        console.log("successfully deleted");
    })
    res.redirect("/");
})
app.get("/help",(req,res)=>{
    res.render("help");
})

app.listen(5000,()=>{
    console.log("server is listening on port 5000");
})
