import express from 'express';
import { PrismaClient } from '@prisma/client';
import { body, validationResult } from "express-validator";

const publicKarzarRouter = express.Router();

const pc = new PrismaClient();

publicKarzarRouter.post("/search", async function (req, res) {
    const { name, type } = req.body;
    const now = new Date();
    console.log(type);
    const oneDayToMs = 60 * 60 * 24 * 1000;
    if (type === "Successful") {
        let karzars;
        if (name === "") {
            karzars = await pc.karzar.findMany({
                where: {
                    name
                },
                select: {
                    name: true,
                    id: true,
                    imgSrc: true,
                    sign: true
                }
            });

        } else {
            karzars = await pc.karzar.findMany({
                select: {
                    name: true,
                    id: true,
                    imgSrc: true,
                    sign: true
                }
            });

        }
        const result = [];
        karzars.map(karzar => {
            if (karzar.sign.length > 20)
                result.push({
                    name: karzar.name,
                    id: karzar.id,
                    imgSrc: karzar.imgSrc,
                })
        });
        return res.status(200).json({ karzars: result });
    }
    if (type === "Lab") {
        //now - createTime > 6 * oneDayToMs AND now - createTime < 7 * oneDayToMs
        const and = [
            {
                createTime: {
                    gt: new Date(now.getTime() - 7 * oneDayToMs).toISOString()
                }
            }, {
                createTime: {
                    lt: new Date(now.getTime() - 6 * oneDayToMs).toISOString()
                }
            },
        ]
        let karzars;
        if (name === "") {
            karzars = await pc.karzar.findMany({
                where: {
                    AND: and
                }
            })

        }
        else {
            karzars = await pc.karzar.findMany({
                where: {
                    AND: and, name,
                }
            })
        }
        return res.status(200).json({ karzars: karzars });
    }
    let createTime = {};
    switch (type) {
        case 'Open':
            //now - createTime < 7 * oneDayToMs
            createTime = {
                gt: new Date(now.getTime() - 7 * oneDayToMs).toISOString()
            }
            break;
        case 'Close':
            //now - createTime > 7 * oneDayToMs
            createTime = {
                lt: new Date(now.getTime() - 7 * oneDayToMs).toISOString()
            }
            break;
        case 'Day':
            //now - createTime < 1 * oneDayToMs
            createTime = {
                gt: new Date(now.getTime() - 1 * oneDayToMs).toISOString()
            }
            break;
    }
    if (name === "") {
        const karzars = await pc.karzar.findMany({
            where: {
                createTime
            }
        })
        return res.status(200).json({ karzars: karzars });

    } else {
        const karzars = await pc.karzar.findMany({
            where: {
                createTime, name
            }
        })
        return res.status(200).json({ karzars: karzars });
    }
});

publicKarzarRouter.post(
    "/sign/:id",
    // body("phoneNumber").isString().isLength({ min: 11, max: 11 }).withMessage("phoneNumber has 12 charcters"),
    async function (req, res) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            const error = errors.array()[0];
            return res.status(400).json({
                message: error.msg
            })
        }
        const { firstName, lastName, phoneNumber } = req.body;
        const { id } = req.params;
        const karzar = await pc.karzar.findFirst({
            where: { id },
            select: { isActive: true, isAccepted: true, sign: { select: { unknownUser: { select: { phoneNumber: true } } } } }
        });
        const signers = karzar.sign;
        let isSigned = false;
        for (let i = 0; i < signers.length; i++) {
            if (signers[i].unknownUser.phoneNumber === phoneNumber) {
                isSigned = true;
            }
        }
        if (isSigned) {
            return res.status(200).json({ message: "you signed this karzar before !!" });
        }
        if (!karzar.isAccepted) {
            return res.status(200).json({ message: "you can't sign this karzar.admin should accept it first !!" });
        }
        if (!karzar.isActive) {
            return res.status(200).json({ message: "you can't sign this karzar.it isn't active !!" });
        }
        try {
            await pc.karzarSign.create({
                data: {
                    karzar: {
                        connect: {
                            id
                        }
                    }, unknownUser: {
                        connectOrCreate: {
                            where: {
                                phoneNumber
                            },
                            create: {
                                phoneNumber, firstName, lastName
                            }
                        }
                    }
                }
            });
            return res.status(200).json({ message: "you signed this karzar!!" });
        } catch (err) {
            console.log(err)
            return res.status(400).json({ message: "there is an error please try again!!" })

        }

    }
)


//get a karzar with id
publicKarzarRouter.get("/:id", async function (req, res) {
    const { id } = req.params;
    const karzar = await pc.karzar.findFirst({
        where: {
            id
        }, select: {
            name: true,
            text: true,
            sign: {
                select: {
                    userId: true,
                    unknownUser: {
                        select: {
                            firstName: true, lastName: true
                        }
                    }, user: {
                        select: {
                            firstName: true, lastName: true
                        }
                    },
                    unknownUserId: true
                }
            }
        }
    });

    if (!karzar) {
        return res.status(400).json({ message: "there is not a karzar with this id" });
    }
    const signers = [];
    karzar.sign.map(signer=>{
        if(signer.unknownUserId !== null){
            signers.push({
                id:signer.unknownUserId,
                firstName:signer.unknownUser.firstName,
                lastName : signer.unknownUser.lastName
            })
        }else{
            signers.push({
                id:signer.userId,
                firstName:signer.user.firstName,
                lastName : signer.user.lastName
            })

        }
    })
    const resKarzar = {
        name:karzar.name,
        text:karzar.text,
        signers:signers
    }
    return res.status(200).json({ karzar:resKarzar });

});


export default publicKarzarRouter;