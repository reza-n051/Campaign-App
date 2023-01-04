import express from 'express';
const fileRouter = express.Router();

fileRouter.get("/upload",async function (req, res) {
    const {} = req.body;
});


export default fileRouter;