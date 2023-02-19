import { MiddlewareConsumer, Module, NestModule, RequestMethod } from "@nestjs/common";
import { BooksController } from "./books.controller";
import { BooksService } from "./books.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Book } from "./books.entity";
import { FileUpload } from "./file-upload/file-upload";

@Module({
    imports: [TypeOrmModule.forFeature([Book])],
    controllers: [BooksController],
    providers: [BooksService, FileUpload]
})
export class BooksModule {}