import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { Observable } from "rxjs";
import { RecadosService } from "src/recados/recados.service";

@Injectable()
export class AddHeaderInterceptor implements NestInterceptor{
    constructor (private readonly reacadosSerive: RecadosService) {}
    async intercept(context: ExecutionContext, next: CallHandler<any>) {
        const response = context.switchToHttp().getResponse();

        response.setHeader('x-custom-header', 'O VALOR DO MEU CABEÇALHO');
        return next.handle();
    }
}