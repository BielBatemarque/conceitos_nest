import { NestMiddleware } from "@nestjs/common";
import { NextFunction, Request, Response } from "express";

// Cliente (navegador) -> (servidor) ->  Middleware (Request, Response) -> NestJs(Guards, Interceptors, Pipes, Filters)
export class AnotherMiddleware implements NestMiddleware {
    use(req: Request, res: Response, next: NextFunction) {
        console.log('Olá dentro do another middleware');

        next();
    }
}