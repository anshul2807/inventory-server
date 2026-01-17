require("dotenv").config();
const express = require("express")
const app = express()
const cors = require("cors");
const mongoose = require("mongoose");
const user = require("./Router/user");
const product = require("./Router/product");

const PORT = process.env.PORT||8080;
setTimeout(() => {
  if (!process.env.DB_ENDPOINT) {
    console.warn("DB_ENDPOINT not set. Skipping MongoDB connection.");
    return;
  }

  mongoose.connect(process.env.DB_ENDPOINT, {
    serverSelectionTimeoutMS: 5000, // ⛔ prevents startup hang
    socketTimeoutMS: 45000,
  })
    .then(() => console.log("MongoDB Connected"))
    .catch(err => console.error("MongoDB Error:", err.message));
}, 0);

// middleware
app.use(cors())
app.use(express.json())

app.use("/user",user);
app.use("/product",product);

app.get("/",(req,res)=>{
    res.status(200).json("Success");
})

app.listen(PORT,()=>console.log("App is Listning at PORT ",PORT))