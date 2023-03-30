import { Request, Response, NextFunction } from 'express';

export const schemaValidation = (schema: any) => async (req: Request, res: Response, next: NextFunction) => {
    const body = req.body;

    try {
        await schema.validate(body);
        next();
    } catch (e: any) {
        return res.status(400).json({ e });
    }
};