import { Controller, Post, Body, Get, Put, Delete } from "@nestjs/common";
import { BooksService } from "./books.service";
import PostBooksDTO from "./dtos/post_books.dto";

@Controller("books")
export class BooksController {

    constructor(public booksService: BooksService) {}

    @Post() //admin
    post_book(@Body() body: PostBooksDTO){
        return this.booksService.create(body);
    }

    @Get()
    get_books() {
        
    }

    @Get('/:bookId')
    get_book() {
        //
    }

    @Put('/:bookId') //admin
    update_book(@Body() body: any) {

    }

    @Delete('/:bookId') //admin
    delete_book() {

    }

    @Get('/search')
    search_books() {

    }

    @Get('/file/:bookId') //if user has book in cache
    get_book_pdf() {

    }
}

