import express from "express";

export const transformIdProperty = (req: express.Request, res: express.Response, _next: express.NextFunction) : void => {
    const id = req?.body?.id
    if (id) {
        req.body._id = id
        req.body.id = undefined
    }
    _next();
}