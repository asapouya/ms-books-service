import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from "@nestjs/common";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

@Injectable()
export class FormDataToJsonInterceptor implements NestInterceptor{
    intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
        const request = context.switchToHttp().getRequest();

        if(request.method === "POST" && request.headers["contect-type"]?.includes("multipart/form-data")) {
            request.body = JSON.stringify(request.body);
            request.headers["content-type"] = "application/json";
        }

        return next.handle().pipe(
            map(data => {
                console.log(data);
                if(typeof data === "object") {
                    return JSON.parse(JSON.stringify(data));
                }
                return data;
            }),
        )
    }
}