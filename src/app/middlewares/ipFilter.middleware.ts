import { Injectable, NestMiddleware } from "@nestjs/common";
import { NextFunction, Request, Response } from "express";

@Injectable()
export class IpFilterMiddleware implements NestMiddleware {

    private allowedIps: string[]

    constructor() {
        this.allowedIps = ["127.0.0.1:9000"];
    }

    use(req: Request, res: Response, next: NextFunction) {
        const requestIp = req.ip;
        console.log(requestIp);
        if (this.allowedIps.includes(requestIp)) next();
        res.status(403).send("Access Denied.");
    }
}