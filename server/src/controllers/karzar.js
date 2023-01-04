import express from 'express';
import { PrismaClient } from '@prisma/client';
const karzarRouter = express.Router();

const pc = new PrismaClient();
karzarRouter.post("/", async function (req, res) {
    const { title, text, imgPath } = req.body;
    console.log(title)
    console.log(text)
    console.log(req.auth)
    const karzar = await pc.karzar.create({
        data: {
            name: title,
            text,
            imgSrc: imgPath,
            isAccepted: false,
            isActive: false,
            creator: {
                connect: {
                    username: req.auth.username
                }
            }
        }
    });
    console.log(karzar)
    return res.status(200).json(karzar);

});
karzarRouter.post("/active/:id", async function (req, res) {
    const { id } = req.params;
    const karzar = await pc.karzar.findFirst({
        where: {
            id
        }
    })
    if (!karzar) {
        return res.status(400).json({
            message: "there isn't a karzar with this id"
        })
    }
    await pc.karzar.update({
        where: {
            id
        }, data: {
            isActive: true
        }
    });
    return res.status(200).json();
})
karzarRouter.post("/inactive/:id", async function (req, res) {
    const { id } = req.params;
    const karzar = await pc.karzar.findFirst({
        where: {
            id
        }
    })
    if (!karzar) {
        return res.status(400).json({
            message: "there isn't a karzar with this id"
        })
    }
    await pc.karzar.update({
        where: {
            id
        }, data: {
            isActive: false
        }
    });
    return res.status(200).json();
});
karzarRouter.post("/accept/:id", async function (req, res) {
    const { id } = req.params;
    const karzar = await pc.karzar.findFirst({
        where: {
            id
        }
    })
    if (!karzar) {
        return res.status(400).json({
            message: "there isn't a karzar with this id"
        })
    }
    await pc.karzar.update({
        where: {
            id
        }, data: {
            isAccepted: true
        }
    });
    return res.status(200).json();
});
// this return all karzars of user
karzarRouter.get("/", async function (req, res) {
    const { username } = req.auth;
    // const user = await pc.user.findFirst({
    //     where: {
    //         username
    //     }
    // });
    // const isAdmin = false;
    // if(user.role === "ADMIN"){
    //     const karzars = await pc.karzar.findMany({
    //         where: {
    //             creator: {
    //                 username: username
    //             }
    //         }, select: {
    //             id: true,
    //             name: true,
    //             imgSrc: true, isAccepted: true, isActive: true,
    //             sign: {
    //                 select: {
    //                     id: true
    //                 }
    //             }
    //         }
    //     });
    //     const result = [];
    //     karzars.map(karzar => {
    //         result.push({
    //             id: karzar.id,
    //             name: karzar.name,
    //             imgSrc: karzar.imgSrc,
    //             isAccepted: karzar.isAccepted,
    //             isActive: karzar.isActive,
    //             count: karzar.sign.length
    //         });
    //     });
    //     return res.status(200).json({
    //         karzars: result
    //     });
    // }
    const karzars = await pc.karzar.findMany({
        where: {
            creator: {
                username: username
            }
        }, select: {
            id: true,
            name: true,
            imgSrc: true, isAccepted: true, isActive: true,
            sign: {
                select: {
                    id: true
                }
            }
        }
    });
    const result = [];
    karzars.map(karzar => {
        result.push({
            id: karzar.id,
            name: karzar.name,
            imgSrc: karzar.imgSrc,
            isAccepted: karzar.isAccepted,
            isActive: karzar.isActive,
            count: karzar.sign.length
        });
    });
    return res.status(200).json({
        karzars: result
    });

});
karzarRouter.post("/sign/:id", async function (req, res) {
    const { id } = req.params;
    const { username } = req.auth;
    const karzar = await pc.karzar.findFirst({
        where: { id },
        select: { isActive: true, isAccepted: true, sign: { select: { user: { select: { username: true } } } } }
    });
    const signers = karzar.sign;
    let isSigned = false;
    for (let i = 0; i < signers.length; i++) {
        if (signers[i].user.username === username) {
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
                },
                user: {
                    connect: {
                        username
                    }
                }
            }
        });
        return res.status(200).json({ message: "you signed this karzar !!" })
    } catch (err) {
        return res.status(400).json({ message: "there is an error please try again!!" })

    }
});

export default karzarRouter;