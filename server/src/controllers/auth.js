import express from 'express';
import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';
import { body, validationResult } from "express-validator";
const authRouter = express.Router();

const pc = new PrismaClient();
authRouter.post(
    "/admin-login",
    async function (req, res) {
        const { username, password } = req.body;
        const token = jwt.sign({ username }, "secret", { algorithm: "HS256" })
        if (username === "admin" && password == "admin") {
            return res.status(200).json({
                token
            })
        }
        return res.status(400).json({
            message: "username or password is wrong"
        })
    }
);
authRouter.post(
    "/login",
    body("username").isString().isLength({ min: 4 }).withMessage("username is very short.atleast 4 character"),
    body("password").isString().isLength({ min: 4 }).withMessage("password is very short.atleast 4 character"),
    async function (req, res) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            const error = errors.array()[0];
            return res.status(400).json({
                message: error.msg
            })
        }
        const { username, password } = req.body;
        const user = await pc.user.findFirst({
            where: {
                username
            }
        });
        if (!user || user.password !== password) {
            return res.status(400).json({
                message: "username or password is wrong"
            })
        }
        const token = jwt.sign({ username }, "secret", { algorithm: "HS256" })
        return res.status(200).json({
            user: {
                username: user.username,
                firstName: user.firstName,
                lastName: user.lastName,
                imgPath : user.imgSrc,
                token: token,
                role:user.role
            }
        });

    });

authRouter.post(
    "/signup",
    body("email").isEmail().withMessage("email is invalid"),
    body("username").isString().isLength({ min: 4 }).withMessage("username is very short.atleast 4 character"),
    body("password").isString().isLength({ min: 4 }).withMessage("password is very short.atleast 4 character"),
    body("phoneNumber").isString().isLength({ min: 11, max: 11 }).withMessage("phoneNumber has 12 charcters"),
    async function (req, res) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            const error = errors.array()[0];
            return res.status(400).json({
                message: error.msg
            })
        }
        const {
            email,
            password,
            username,
            firstName,
            lastName,
            phoneNumber
        } = req.body;
        try {
            const user = await pc.user.create({
                data: {
                    email, password, firstName, lastName, username, phoneNumber,
                    imgSrc: "",
                }
            });
            const token = jwt.sign({ username }, "secret", { algorithm: "HS256" })
            return res.status(200).json({
                user: {
                    username: user.username,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    token: token
                }
            });

        } catch (err) {
            return res.status(400).json({
                message: "email or phoneNumber or email already exists in db"
            });
        }
    });

export default authRouter;