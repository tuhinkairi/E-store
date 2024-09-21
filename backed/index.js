import express from "express"
import dotenv from "dotenv"
import db from "./db/db.js"
import routerControl from "./router/router.js"
import { json } from "express";

dotenv.config()


const app = express()
const port = process.env.PORT || 3000

// db connection
db(process.env.URI_DB)

// middleware
app.use(json());

// routers
routerControl(app)
 
app.get("/",(req, res)=>{
    res.send('running')
})
app.listen(port,()=>{
    console.log("app running on port http://127.0.0.1:"+port)
})