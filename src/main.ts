import { NestFactory } from "@nestjs/core";
import { BooksModule } from "./books/books.module";
import { ValidationPipe } from "@nestjs/common";

async function bootstrap(){
    const port = process.env.PORT || 3000;
    const app = await NestFactory.create(BooksModule);
    app.useGlobalPipes(
        new ValidationPipe()
    )
    await app.listen(port);
}
bootstrap();