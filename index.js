const express =require("express")
const app =express()
const dotenv=require("dotenv")
const mongoose=require("mongoose")
const authRoute=require("./routes/auth")
const userRoute = require("./routes/users");
const postRoute = require("./routes/posts");
const categoryRoute = require("./routes/categories");
const multer =require("multer")
const path=require("path")
const port =process.env.port||5000
const cors=require('cors')

const corsOrigin ={
  origin:'http://localhost:3001', //or whatever port your frontend is using
  credentials:true,            
  optionSuccessStatus:200
}
app.use(cors(corsOrigin));


dotenv.config()
app.use(express.json())
// app.use(cors())

// app.use(
//   cors({
//     origin: [process.env.FRONTEND_URL],
//     methods: ["GET", "POST", "PUT", "DELETE"],
//     credentials: false,
//   })
// );
app.use("/images", express.static(path.join(__dirname, "/images")))





app.get("*",function(req,res){
  res.sendFile(path.join(__dirname,"./frontend/build/index.html"))
})








mongoose.connect(process.env.mongourl,{
    //  urlNewParser:true,
    //  useUnifiedTopology:true,
    //  useCreateIndex:true,
    // useFindAndModify:true
  
  }).then(()=>{
    console.log("succesfull")
  }).catch((err)=>console.log(err))
  

// mongoose.connect(process.env.mongourl,{
// //    urlNewParser:true,
// //    useUnifiedTopology:true,
// //    useCreateIndex:true
//   // useFindAndModify:true

// }).then(console.log("connected to mongo")).catch((err)=>{
//     console.log((err))
// })



//we have to create storage through multer

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "images");
    },
    filename: (req, file, cb) => {
      cb(null, req.body.name);
    },
  });
  
  const upload = multer({ storage: storage });
  app.post("/backend/upload", upload.single("file"), (req, res) => {
    res.status(200).json("File has been uploaded");
  });
  


app.use("./pulkit",(req,res)=>{
console.log("this is main url")

})
//using authroutes file
app.use("/backend/auth",authRoute)
//using userroute file
app.use("/backend/users",userRoute)


app.use("/backend/posts", postRoute);
 app.use("/backend/categories", categoryRoute);


app.listen(port,()=>{

     console.log("backend is running")
})