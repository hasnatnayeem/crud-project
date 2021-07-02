import express from "express";

export const transformIdProperty = (req: express.Request, res: express.Response, next: any) => {
    let id = req?.body?.id
    if (id) {
        req.body._id = id
        req.body.id = undefined
    }
    next();
}