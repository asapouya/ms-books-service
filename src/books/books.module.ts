import { MiddlewareConsumer, Module, NestModule, Options } from "@nestjs/common";
import { BooksController } from "./books.controller";
import { BooksService } from "./books.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Book } from "./books.entity";
import { RabbitmqRepo } from "./queue.repository";
import { RabbitmqService } from "./queue.service";
import { MulterModule } from "@nestjs/platform-express";
import { TestMiddleware } from "./middlewares/test.middleware";

@Module({
    imports: [TypeOrmModule.forFeature([Book]),
        MulterModule.register({
            dest: "./pdfs"
        })
    ],
    controllers: [BooksController],
    providers: [BooksService, RabbitmqRepo, RabbitmqService]   
})
export class BooksModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(TestMiddleware).forRoutes("*");
    }
}