import express from 'express';
import { PrismaClient } from '@prisma/client';
const userRouter = express.Router();

const pc = new PrismaClient();

userRouter.get("/:username", async function (req, res) {
    const { username } = req.params;
    console.log(username)
    const user = await pc.user.findFirst({
        where: {
            username
        }
    });
    if (!user) {
        return res.status(400).json({
            message: "there is not a user with this username"
        });

    }
    return res.status(200).json(user);
});

userRouter.put("/:username", async function (req, res) {
    const { username } = req.params;
    const { email, firstName, lastName, phoneNumber, imgPath, password } = req.body;
    console.log(imgPath);
    const user = await pc.user.update({
        data: {
            email, firstName, lastName, password, phoneNumber, imgSrc: imgPath
        },
        where: {
            username
        }
    });
    if (!user) {
        return res.status(400).json({
            message: `there isn't a user with username ${username}`
        })
    }
    return res.status(200).json(user);
});


export default userRouter;