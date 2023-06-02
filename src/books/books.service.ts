import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Book } from "./books.entity";
import { Repository } from "typeorm";
import { validateBook } from "./dtos/post_books.dto";
import { FileManagementRepo } from "./fileManagement.repository";
import { unlink } from "fs";
import { RedisRepo } from "./redis.repository";
import { RabbitmqRepo } from "./queue.repository";

@Injectable()
export class BooksService {
    constructor(
        @InjectRepository(Book) private repo: Repository<Book>,
        private filesRepo: FileManagementRepo,
        private brokerRepo: RabbitmqRepo,
        private redisRepo: RedisRepo
    ) {}

    async handle_user_deletion() {
        try {
            await this.brokerRepo.createChannel();
            this.brokerRepo.errorEvent((err: any) => {
                console.log(err);
            })
            await this.brokerRepo.listenToMessage("books.user.delete.queue", async (msg: any) => {
                const content = JSON.parse(msg.content.toString());
                const userIdToBeDeleted = content.data.userId;
                try {

                    //delete user cache from redis
                    
                    this.brokerRepo.ack(msg);
                } catch (err) {
                    console.log(err);
                    this.brokerRepo.noAck(msg);
                }
            });            
        } catch (err) {
            console.log(err);
        }
    }

    async handle_order_submition() {
        try {
            await this.brokerRepo.createChannel();
            this.brokerRepo.errorEvent((err: any) => {
                console.log(err);
            })
            await this.brokerRepo.listenToMessage("books.finalize.order.queue", async (msg: any) => {
                const content = JSON.parse(msg.content.toString());
                const userIdToBeAddedToCache = content.data.userId;
                const booksToBeCached = content.data.books;
                try {

                    //add user and purchased books to cache
                    
                    this.brokerRepo.ack(msg);
                } catch (err) {
                    console.log(err);
                    this.brokerRepo.noAck(msg);
                }
            });            
        } catch (err) {
            console.log(err);
        }
    }

    async get_book(id: any) {
        try {
            return await this.repo.findOneBy({_id: id})
        } catch (err) {
            throw new BadRequestException(err.message);
        } 
    }

    async get_books() {
        try {
            return await this.repo.find();
        } catch (err) {
            throw new BadRequestException(err.message);
        }
    }

    async update_book(_id: string, attrs: Partial<Book>) {
        try {
            return await this.repo.update({_id: _id}, attrs)
        } catch (err) {
            throw new BadRequestException(err.message);
        }
    }
    
    async search_books(queryParams: any): Promise<Book[]> {
        try {
            const queryBuilder = this.repo.createQueryBuilder("book");
            for (const key in queryParams) {
                if (queryParams.hasOwnProperty(key)) {
                    queryBuilder.andWhere(`book.${key} LIKE :${key}`, { [key]: `%${queryParams[key]}%`});
                }
            }
            const books = await queryBuilder.getMany();
            return books;
        } catch (err) {
            throw new BadRequestException(err.message);
        }   
    }
    async post_books(body: Book, req: any): Promise<any>{
        let pdf_dir = null;
        try {
            await validateBook(body);            
            if(!req.files.file) {
                throw new BadRequestException("File is required.");
            }
            const fileDir = "/home/asapouya/Desktop/microservice/books-service/books-service/pdfs/";
            pdf_dir = await this.filesRepo.saveFileToDisk(req.files.file, fileDir);
            body.book_pdf_dir = pdf_dir;
            let book = this.repo.create(body);
            book = await this.repo.save(book);
            return book;
        } catch (err) {
            if(err.sql) unlink(pdf_dir, err => {
                if(err) console.log(err)
            });
            throw new BadRequestException(err.message);
        }
    }
}