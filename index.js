import express from "express";
import cors from "cors";
import ExcerciseRouter from "./excercise.route.js";
const authroutes=require('./Routes/Authenticationroutes.js');
const app = express();

app.use(cors());
app.use(express.json());
const PORT = process.env.PORT || 4000;
app.get("/", function (request, response) {
  response.send("🙋‍♂️, 🌏 🎊✨🤩");
});

app.use("/excercise", ExcerciseRouter);
app.use('/auth',authroutes);

app.listen(PORT, () => console.log(`The server started in: ${PORT} ✨✨`));
