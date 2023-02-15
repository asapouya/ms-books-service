import { Controller, Post, Body } from "@nestjs/common";
import { BooksService } from "./books.service";
import PostBooksDTO from "./dtos/post_books.dto";

@Controller("books")
export class BooksController {

    constructor(public booksService: BooksService) {}

    @Post()
    post_books(@Body() body: PostBooksDTO){
        return this.booksService.create(body);
    }
}

