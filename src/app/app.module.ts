import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { BooksModule } from "../books/books.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Book } from "../books/books.entity";
import { IpFilterMiddleware } from "./middlewares/ipFilter.middleware";

@Module({
    imports: [TypeOrmModule.forRoot({
        type: 'mysql',
        host: 'localhost',
        port: 3306,
        username: 'root',
        password: '130813812380',
        database: 'books',
        entities: [Book],
        synchronize: true
    }), BooksModule],
    providers: [IpFilterMiddleware]
})
export class AppModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        //consumer.apply(IpFilterMiddleware).forRoutes("*");
    }
}