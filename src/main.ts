import { NestFactory } from "@nestjs/core";
import { ValidationPipe } from "@nestjs/common";
import { AppModule } from "./app/app.module";
import * as bodyParser from "body-parser"
import * as fileUpload from "express-fileupload"
import { RabbitMQConnection } from "./books/queue.connection";
import { RedisConnection } from "./books/redis.connection";

async function bootstrap(){
    const redisConnection = RedisConnection.getInstance();
    await redisConnection.connect();
    const rabbitMQConnection = RabbitMQConnection.getInstance()
    await rabbitMQConnection.connect();
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

bootstrap()
// .catch(err => {
//     console.log(err);
//     process.exit(1);
// })