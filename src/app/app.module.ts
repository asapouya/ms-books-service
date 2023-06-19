import { MiddlewareConsumer, Module, NestModule, OnApplicationBootstrap } from "@nestjs/common";
import { BooksModule } from "../books/books.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Book } from "../books/books.entity";
import { IpFilterMiddleware } from "./middlewares/ipFilter.middleware";
import { RabbitMQConnection } from "src/books/queue.connection";
import { NestFactory } from "@nestjs/core";

@Module({
    imports: [TypeOrmModule.forRoot({
        type: 'mysql',
        host: 'localhost',
        port: 3306,
        username: 'root',
        password: '1234567890',
        database: 'books',
        entities: [Book],
        synchronize: true
    }), BooksModule],
    providers: [IpFilterMiddleware]
})
export class AppModule /**implements OnApplicationBootstrap**/ {


//This runs before dependencies are resolved.

    // constructor() {}

    // static async forRoot() {
    //     const rabbitMQConnection = RabbitMQConnection.getInstance();
    //     rabbitMQConnection.connect();
        
    //     const module = await NestFactory.createApplicationContext(AppModule);
    //     module.select(AppModule)
        
    //     return module;
    // }

    // onApplicationBootstrap() {}
}