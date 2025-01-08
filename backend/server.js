import express from "express";
import "dotenv/config";
import cors from "cors"

// ------------------- app config ------------------ //

//CREATING INSTANCE OF EXPPRESS PACKAGE 
const app = express();
const port = process.env.PORT || 4000;


// ---------------------- middlewares --------------------//
app.use(express.json());
app.use(cors());

//----------------  api endpoints --------------------// 

app.get("/", (req,res) => {
    res.json("welcome to server");
})


app.listen(port, () => {
    console.log(`Server running on ${`http://localhost:${port}`}`)
})