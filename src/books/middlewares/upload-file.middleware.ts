import { Injectable, NestMiddleware } from "@nestjs/common";
import { NextFunction, Request, Response } from "express";

@Injectable()
export class UploadFile implements NestMiddleware {

    use(req: Request, res: Response, next: NextFunction) {
        console.log("This is a middleware.");
        next()
    }
}