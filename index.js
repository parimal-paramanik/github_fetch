const express= require("express")
const app = express()
app.use(express.json())

const {Connection} = require("./config/data")
const {UserRouter}= require("./Routes/userRoutes")


app.get("/",(req,res)=>{
    res.send("everything is fine")
})

app.use("/github",UserRouter)
// require("dotenv").config()
const PORT = process.env.PORT

app.listen(PORT,async(req,res)=>{
   try {
    await Connection
    console.log("data base connected")
   } catch (error) {
    console.log(error)
   }
   console.log(`server is awake at ${PORT}`)
})





