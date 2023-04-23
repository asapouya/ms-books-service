import { 
    Controller, 
    Post, 
    Body, 
    Get, 
    Delete, 
    Param,
    Patch,
    Query,
    UseInterceptors,
    UploadedFile,
    BadRequestException,  
    //UseInterceptors, 
    // ClassSerializerInterceptor   
} from "@nestjs/common";
import { Serialize } from "./interceptors/serialize.interceptor";
import { BooksService } from "./books.service";
import { validateBook } from "./dtos/post_books.dto";
import { BookDTO } from "./dtos/books.dto";
import { UpdateBookDto } from "./dtos/update_books.dto";
import { RabbitmqService } from "./queue.service";
import { FileInterceptor } from "@nestjs/platform-express";


@Controller("books")
export class BooksController {

    constructor(
        private booksService: BooksService,
        private queueService: RabbitmqService
        ) {}

    async onModuleInit() {
        try {
            await this.queueService.consumeMessages(async (msg: any) => {
                console.log(msg);
                await this.queueService.ack(msg);
            });
            console.log("listening to messages...");
        } catch (err) {
            console.log(err);
        }
    } 

    @Serialize(BookDTO)
    @UseInterceptors( FileInterceptor("file"))
    @Post("admin")
    async post_book(@Body() body: any, @UploadedFile() file: Express.Multer.File){
        try {
            await validateBook(body);
            if(!file) {
                throw new BadRequestException("File is required.");
            }
            let book = this.booksService.create(body);
            book = await this.booksService.save(book);
            return book;
        } catch (err) {
            throw new BadRequestException(err.message)
        }
    }

    @Serialize(BookDTO)
    @Get()
    async get_books() {
        try {
            return await this.booksService.findAll();
        } catch (err) {
            throw new BadRequestException(err.message);
        }
    }

    @Serialize(BookDTO)
    @Get('getBook/:bookId')
    async get_book(@Param("bookId") id: string) {
        try {
            return await this.booksService.findOne(id);
        } catch (err) {
            throw new BadRequestException(err.message);
        }
    }

    @Patch('admin/:bookId') //admin
    async update_book(@Body() body: UpdateBookDto, @Param("bookId") id: string) {
        try {
            return await this.booksService.updateOne(id, body);
        } catch (err) {
            throw new BadRequestException(err.message);
        }
    }

    @Delete('admin/:bookId') //admin
    delete_book() {

    }

    @Serialize(BookDTO)
    @Get('search')
    async search_books(@Query() queryParams: any) {
        try {
            const books = await this.booksService.searchBook(queryParams);
            return books;
        } catch (err) {
            throw new BadRequestException(err.message);
        }
    }

    @Get('/file/:bookId') //if user has book in cache
    get_book_pdf() {
        //check redis to see what books the user has
        //if he has purchased this book return the pdf
        //if not return 403 (payment required) 
        //check if user has book in the cache
    }
}