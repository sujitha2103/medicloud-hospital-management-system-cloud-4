const express=require("express");
const cors=require("cors");
const fs=require("fs");
const path=require("path");
const app=express();
const PORT=process.env.PORT||3000;
app.use(cors());app.use(express.json());
app.use(express.static(path.join(__dirname,"../frontend")));
const dbFile=path.join(__dirname,"data.json");
const initial={patients:[
{id:1,name:"Arun Kumar",age:45,gender:"Male",phone:"9876543210",email:"arun@gmail.com",disease:"Diabetes"},
{id:2,name:"Priya Sharma",age:32,gender:"Female",phone:"9876501234",email:"priya@gmail.com",disease:"Migraine"}],
doctors:[
{id:1,name:"Dr. Anitha",specialization:"Cardiologist",phone:"9000011111",experience:12,fee:800},
{id:2,name:"Dr. Raj",specialization:"General Physician",phone:"9000022222",experience:8,fee:500}],
appointments:[],records:[],bills:[]};
if(!fs.existsSync(dbFile))fs.writeFileSync(dbFile,JSON.stringify(initial,null,2));
function read(){return JSON.parse(fs.readFileSync(dbFile));}
function write(d){fs.writeFileSync(dbFile,JSON.stringify(d,null,2));}
function nextId(arr){return arr.length?Math.max(...arr.map(x=>x.id))+1:1;}
app.post("/api/login",(req,res)=>{const {email,password}=req.body;if(email==="admin@medicloud.com"&&password==="admin123")res.json({success:true});else res.status(401).json({success:false,message:"Invalid email or password"});});
const resources=["patients","doctors","appointments","records","bills"];
resources.forEach(r=>{
 app.get("/api/"+r,(req,res)=>res.json(read()[r]));
 app.post("/api/"+r,(req,res)=>{const d=read();const item={id:nextId(d[r]),...req.body};d[r].push(item);write(d);res.status(201).json(item);});
 app.delete("/api/"+r+"/:id",(req,res)=>{const d=read();const id=Number(req.params.id);const old=d[r].length;d[r]=d[r].filter(x=>x.id!==id);write(d);res.json({success:d[r].length<old});});
});
app.get("*",(req,res)=>res.sendFile(path.join(__dirname,"../frontend/login.html")));
app.listen(PORT,()=>console.log(`MediCloud running at http://localhost:${PORT}`));