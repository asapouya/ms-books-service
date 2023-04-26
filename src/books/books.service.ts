import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Book } from "./books.entity";
import { Connection, Repository } from "typeorm";
import { validateBook } from "./dtos/post_books.dto";
import { FileManagementRepo } from "./fileManagement.repository";
import { Request, RequestHandler } from "express";

@Injectable()
export class BooksService {
    constructor(
        @InjectRepository(Book) private repo: Repository<Book>, 
        private filesRepo: FileManagementRepo,
    ) {}

    create(bookObj: any) {
        return this.repo.create(bookObj);
    }
    save(bookObj: any) {
        return this.repo.save(bookObj);
    }
    findOne(id: any) {
        return this.repo.findOneBy({_id: id})
    }
    findAll() {
        return this.repo.find();
    }
    updateOne(_id: string, attrs: Partial<Book>) {
        return this.repo.update({_id: _id}, attrs);
    }
    async searchBook(queryParams: any): Promise<Book[]> {
        const queryBuilder = this.repo.createQueryBuilder("book");
        for (const key in queryParams) {
            if (queryParams.hasOwnProperty(key)) {
                queryBuilder.andWhere(`book.${key} LIKE :${key}`, { [key]: `%${queryParams[key]}%`});
            }
        }
        const books = await queryBuilder.getMany();
        return books;
    }

    async post_books(body: Book, req: any): Promise<any>{
        try {
            await validateBook(body);            
            if(!req.files.file) {
                throw new BadRequestException("File is required.");
            }
            const fileDir = "/home/asapouya/Desktop/microservice/books-service/books-service/pdfs/";
            const queryRunner = this.repo.queryRunner;
            await queryRunner.startTransaction();
            try {
                const pdf_dir = await this.filesRepo.saveFileToDisk(req.files.file, fileDir);
                body.book_pdf_dir = pdf_dir;
                let book = this.create(body);
                book = await this.save(book);
                return book;

            } catch (error) {
                await queryRunner.rollbackTransaction()

            }finally {
                await queryRunner.release();
            }
        } catch (err) {
            throw new BadRequestException(err.message);
        }
    }
}