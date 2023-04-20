const express =require("express")
const app =express()
const dotenv=require("dotenv")
const mongoose=require("mongoose")

const cors=require('cors')
const authRoute=require("./routes/auth")
const userRoute = require("./routes/users");
const postRoute = require("./routes/posts");
const categoryRoute = require("./routes/categories");
const multer =require("multer")
const path=require("path")
const port =process.env.port||5000


dotenv.config()
app.use(express.json())
app.use(
  cors({
    origin:[process.env.fronturl],
    methods:["GET","POST","PUT","DELETE"],
    credentials:true,
  })
)
// app.use("/images", express.static(path.join(__dirname, "/images")))
// //for accessing build folder
// app.use( express.static(path.join(__dirname, "./frontend/build")))




// app.get("*",function(req,res){
//   res.sendFile(path.join(__dirname,"./frontend/build/index.html"))
// })








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