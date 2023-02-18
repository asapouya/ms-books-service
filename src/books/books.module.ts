import { Module } from "@nestjs/common";
import { BooksController } from "./books.controller";
import { BooksRepository } from "./books.repository";
import { BooksService } from "./books.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Book } from "./books.entity";

@Module({
    imports: [TypeOrmModule.forFeature([Book])],
    controllers: [BooksController],
    providers: [BooksRepository, BooksService]
})
export class BooksModule {}