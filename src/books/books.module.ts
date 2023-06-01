import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { BooksController } from "./books.controller";
import { BooksService } from "./books.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Book } from "./books.entity";
import { RabbitmqRepo } from "./queue.repository";
import { RabbitmqService } from "./queue.service";
import { TestMiddleware } from "./middlewares/test.middleware";
import { FileManagementRepo } from "./fileManagement.repository";
import { RedisRepo } from "./redis.repository";

@Module({
    imports: [
        TypeOrmModule.forFeature([Book]),

    ],
    controllers: [BooksController],
    providers: [BooksService, RabbitmqRepo, RabbitmqService, FileManagementRepo, RedisRepo]   
})
export class BooksModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(TestMiddleware).forRoutes("*");
    }
}