import { NestMiddleware } from "@nestjs/common";
import { NextFunction, Request, Response } from "express";

// Cliente (navegador) -> (servidor) ->  Middleware (Request, Response) -> NestJs(Guards, Interceptors, Pipes, Filters)
export class SimpleMiddleware implements NestMiddleware {
    use(req: Request, res: Response, next: NextFunction) {
        console.log('Olá de dentro do semple Middleware');
        const authorization = req.headers.authorization;

        if (authorization){
            req['user'] = {
                nome: "Gabriel",
                sobrenome: "Batemarque",
                role: "admin"
            };
        }

        res.setHeader('cabecalho', 'do middleware');
        //Terminando a cadeia de chamadas
        // return res.status(404).send({
        //     message: "Não encontrado"
        // });
        next(); //Proximo middleware

        console.log("tchau");

        res.on('finish', () => {
            console.log('conexão terminou');
        })
    }
}