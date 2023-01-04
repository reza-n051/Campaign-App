import express from "express";
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import { expressjwt } from 'express-jwt';
import { authRouter, fileRouter, karzarRouter, publicKarzarRouter, userRouter } from './controllers/index.js';
//middlewares
const rateLimiter = rateLimit({
    max: async (req, _) => {
        if (req.path === "/users/login") return 5
        return 2222
    },
    windowMs: 30 * 60 * 1000,
    message: "many request!!!. please try 30 minutes later",
    standardHeaders: true
});
const app = express();
app.use(cors());
app.use(rateLimiter);
app.use(express.json());

//routes
app.use("/auth", authRouter);
app.use("/users", expressjwt({
    secret: "secret",
    algorithms: ["HS256"]
}), userRouter);
app.use("/karzar", expressjwt({
    secret: "secret",
    algorithms: ["HS256"]
}), karzarRouter);
app.use("/karzar-api", publicKarzarRouter);
app.use("/file", fileRouter);
const port = 3001;

app.listen(port, () => {
    console.log(`app running on port ${port}`);
})