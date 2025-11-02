import { CallHandler, ExecutionContext, NestInterceptor } from "@nestjs/common";
import { Observable, tap } from "rxjs";

export class TimeConnectionInterceptor implements NestInterceptor{
    async intercept(context: ExecutionContext, next: CallHandler<any>) {
        console.log("chegou aqui (antes)");
        const startTime = Date.now();

        // await new Promise(resolve => setTimeout(resolve, 3000));

        return next.handle().pipe(
            tap((data) => {
                const finalTime = Date.now();
                const elapsedTime = finalTime - startTime;
                console.log("TimeConnectionIntercepter executado (depois): " + elapsedTime);
                console.log(data);
            })
        )
    }
}