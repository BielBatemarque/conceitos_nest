import { BadRequestException, CallHandler, ExecutionContext, NestInterceptor } from "@nestjs/common";
import {  map } from "rxjs";

export class ChangeDataInterceptor implements NestInterceptor{

    async intercept(context: ExecutionContext, next: CallHandler<any>) {
        console.log("ChangeData executado antes");
        

        return next.handle().pipe(
            map(data => {
               if(Array.isArray(data)){
                return {
                    data,
                    count: data?.length,
                }
               }
            }),
        );
    }
}