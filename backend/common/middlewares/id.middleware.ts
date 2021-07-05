import express from "express";

// id is converted to _id in incoming requests
// The frontend client remain independent of mongodb database dependency

export const transformIdProperty = (req: express.Request, res: express.Response, next: express.NextFunction): void => {
    const id = req?.body?.id
    if (id) {
        req.body._id = id
        req.body.id = undefined
    }
    next();
}