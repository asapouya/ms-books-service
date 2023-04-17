import { 
    Controller, 
    Post, 
    Body, 
    Get, 
    Delete, 
    Param,
    Patch,
    Query,  
    //UseInterceptors, 
    // ClassSerializerInterceptor   
} from "@nestjs/common";
import { Serialize } from "./interceptors/serialize.interceptor";
import { BooksService } from "./books.service";
import CreateBookDTO from "./dtos/post_books.dto";
import { BookDTO } from "./dtos/books.dto";
import { UpdateBookDto } from "./dtos/update_books.dto";
import { RabbitmqService } from "./queue.service";


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
    @Post("admin") //admin
    async post_book(@Body() body: CreateBookDTO){
        const book = this.booksService.create(body);
        return await this.booksService.save(book);
    }

    @Serialize(BookDTO)
    @Get()
    async get_books() {
        return await this.booksService.findAll();
    }

    @Serialize(BookDTO)
    @Get('getBook/:bookId')
    async get_book(@Param("bookId") id: string) {
        return await this.booksService.findOne(id);
    }

    @Patch('admin/:bookId') //admin
    async update_book(@Body() body: UpdateBookDto, @Param("bookId") id: string) {
        return await this.booksService.updateOne(id, body);
    }

    @Delete('admin/:bookId') //admin
    delete_book() {

    }

    @Serialize(BookDTO)
    @Get('search')
    async search_books(@Query() queryParams: any) {
        const books = await this.booksService.searchBook(queryParams);
        return books;
    }

    @Get('/file/:bookId') //if user has book in cache
    get_book_pdf() {
        //check redis to see what books the user has
        //if he has purchased this book return the pdf
        //if not return 403 (payment required) 
        //check if user has book in the cache
    }
}