import { Module, Options } from "@nestjs/common";
import { BooksController } from "./books.controller";
import { BooksService } from "./books.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Book } from "./books.entity";
import { RabbitmqRepo } from "./queue.repository";
import { RabbitmqService } from "./queue.service";

@Module({
    imports: [TypeOrmModule.forFeature([Book])],
    controllers: [BooksController],
    providers: [BooksService, RabbitmqRepo, RabbitmqService]   
})
export class BooksModule {}