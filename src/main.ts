import { NestFactory } from "@nestjs/core";
import { ValidationPipe } from "@nestjs/common";
import { AppModule } from "./app/app.module";
import * as bodyParser from "body-parser"
import * as fileUpload from "express-fileupload"

async function bootstrap(){
    const port = process.env.PORT || 3000;
    const app = await NestFactory.create(AppModule);
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: true}))
    app.use(fileUpload({
        createParentPath: true
    }));
    app.useGlobalPipes(
        new ValidationPipe({
            whitelist: true
        })
    )
    await app.listen(port);
}
bootstrap();