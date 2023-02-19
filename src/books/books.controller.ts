import { Controller, Post, Body, Get, Put, Delete, Req, UseInterceptors, UploadedFile, Res } from "@nestjs/common";
import { BooksService } from "./books.service";
import PostBooksDTO from "./dtos/post_books.dto";

@Controller("books")
export class BooksController {

    constructor(private booksService: BooksService) {}

    @Post() //admin
    post_book(@Body() body: PostBooksDTO){
        
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

