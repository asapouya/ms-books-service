import { Module } from "@nestjs/common";
import { BooksModule } from "../books.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Book } from "../books.entity";

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
    }), BooksModule]
})
export class AppModule {}