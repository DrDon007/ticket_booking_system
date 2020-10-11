import express from "express";
import path from "path";
import cookieParser from "cookie-parser";
import passport from "passport";
import logger from "morgan";
import indexRouter from "./routes/index";
import usersRouter from "./routes/users";
import authenticationRoute from "./routes/authentication";
import trainList from "./routes/trainLists";
import passenger from "./routes/passengers";
import profile from "./routes/profile"
import booking from './routes/booking';
import configPassport from "./config/passport";
import cors from "cors";

var app = express();

import "./config/passport";

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());
app.use(express.static(path.join(__dirname, "../public")));

app.use(passport.initialize());

app.use("/test", (req,res) => {
    console.log('I am here');
    res.status(200).send({message : "success"})
});

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/authentication", authenticationRoute);
app.use("/train", trainList);
app.use("/pass", passenger);
app.use('/profile', profile);
app.use('/booking',booking);
export default app;
